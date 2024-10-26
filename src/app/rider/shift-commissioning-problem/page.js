/** @format */

"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import { DayPicker } from "react-day-picker";
import { es, de } from "react-day-picker/locale";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
    authState,
    shiftCurrentOrderToLast,
    updateOrderProductField,
    updateOrderStatus,
} from "@/redux/Auth/AuthSlice";
import { useRouter } from "next/navigation";
import { PATH_DASHBOARD } from "@/routes/paths";
import Loader from "@/components/Loader";
import { API_ROUTER } from "@/services/apiRouter";
import { toast } from "react-toastify";
import { axiosPost, axiosPut } from "@/services/axiosHelper";
import { current } from "tailwindcss/colors";
import { ORDER_STATUS, REFUND_REASONS } from "@/constants/keywords";
import { encodeData } from "@/utils/jwt";
import CompleteOrderButton from "@/components/rider/shiftCommissioning/CompleteOrderButton";
const ShiftCommisioning = () => {
    const { t } = useTranslation();
    const { orders, currentOrderIndex, indexChangeCount } =
        useSelector(authState);
    const { push } = useRouter();
    const dispatch = useDispatch();
    const [isAllItemsAccepted, setIsAllItemsAccepted] = useState(false);
    const [damagedItems, setDamagedItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log("🚀 ~ ShiftCommisioning ~ orders:", {
            orders,
            currentOrderIndex,
            indexChangeCount,
        });
        if (
            !orders.length > 0 ||
            orders[currentOrderIndex]?.isPicked ||
            orders[currentOrderIndex]?.isDelivered ||
            !orders[currentOrderIndex]?.isChecked
        ) {
            redirect();
        }
        checkAccepted();
    }, [orders, currentOrderIndex]);

    useEffect(() => {
        if (orders.length === 0) return;
        const damagedAndMissingProductIds = orders[
            currentOrderIndex
        ]?.orderDetails?.items
            ?.filter((item) => item?.isMissing || item?.isDamaged)
            .map((item) => item?.product_id);

        setDamagedItems(damagedAndMissingProductIds);
    }, [currentOrderIndex, indexChangeCount]);

    const checkAccepted = () => {
        if (!orders || !orders[currentOrderIndex]?.orderDetails?.items) return;
        const items = orders[currentOrderIndex]?.orderDetails?.items;
        const isAccepted = items.every((item) => {
            const {
                acceptedCount = 0,
                quantity = 0,
                quantity_refunded = 0,
            } = item;
            return acceptedCount >= quantity - quantity_refunded;
        });
        if (isAccepted && !orders[currentOrderIndex]?.isSolveLater) {
            // redirect();
        }
        setIsAllItemsAccepted(isAccepted);
        return;
    };

    const redirect = () => {
        const query = new URLSearchParams({ type: encodeData("noFetch") });
        push(`${PATH_DASHBOARD.rider.shiftCommissioning}?${query}`);
    };

    const handleSolveProblemLater = () => {
        if (!orders || orders.length === 0 || !orders[currentOrderIndex])
            return;
        dispatch(shiftCurrentOrderToLast());
    };

    const handleCancelOrder = async () => {
        const currentOrder = orders[currentOrderIndex];
        if (!currentOrder) return;
        const { items: orderItems } = currentOrder?.orderDetails || {};
        if (!orderItems) return;
        const damagedItems = orderItems.filter(
            (item) => item?.isMissing || item?.isDamaged,
        );
        if (damagedItems.length === 0) return;
        const items = damagedItems.map(
            ({
                product_id,
                acceptedCount = 0,
                quantity = 0,
                quantity_refunded = 0,
                isDamaged,
                isMissing,
            }) => {
                const reason = isDamaged
                    ? REFUND_REASONS.isDamaged
                    : isMissing
                      ? REFUND_REASONS.isMissing
                      : REFUND_REASONS.other;

                return {
                    product_id,
                    refunded_quantity:
                        quantity - acceptedCount - quantity_refunded,
                    reason,
                };
            },
        );

        setLoading(true);
        try {
            const payload = {
                order_id: currentOrder?.order_id,
                items,
            };
            const { data, status } = await axiosPost(
                API_ROUTER.REFUNDS,
                payload,
            );
            console.log("🚀 ~ handleCancelOrder ~ { data, status }:", {
                data,
                status,
            });

            if (status && data?.ok) {
                toast.success(t("RefundInitiatedSuccessfully"));
                items.forEach(({ product_id, refunded_quantity }) => {
                    dispatch(
                        updateOrderProductField({
                            product_id,
                            fieldKey: "refunded_quantity",
                            value: refunded_quantity,
                        }),
                    );
                });
                updateOrder();
                dispatch(
                    updateOrderStatus({
                        statusKey: "isPicked",
                        value: true,
                    }),
                );
            }
        } catch (error) {
            console.error("handleCancelOrder ~ error:", error);
            toast.error(t("SomethingWentWrong"));
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 500);
        }
    };

    const updateOrder = async () => {
        const currentOrder = orders[currentOrderIndex];
        if (!currentOrder) return;
        try {
            let payload = { ts_picked: new Date().toISOString() };
            const { data: orderData, status: orderStatus } = await axiosPut(
                API_ROUTER.UPDATE_ORDER_DETAILS(currentOrder?.order_id),
                payload,
            );
            console.log(
                "🚀 ~ handleCancelOrder ~ { data: orderData, status: orderStatus }:",
                { orderData, orderStatus },
            );
            if (
                orderStatus &&
                (orderData?.status == ORDER_STATUS.PICKED ||
                    orderData?.ts_picked !== null)
            ) {
                toast.success(t("OrderPickedSuccessfully"));
            }
        } catch (error) {
            console.error("updateOrder ~ error:", error);
            toast.error(t("SomethingWentWrong"));
        }
    };

    const handleUpdateAcceptedCount = (product_id, operation = "add") => {
        const item = orders[currentOrderIndex]?.orderDetails?.items?.find(
            (item) => item.product_id === product_id,
        );
        if (!item) return;
        const { acceptedCount = 0, quantity, quantity_refunded = 0 } = item;
        if (
            operation === "add" &&
            acceptedCount >= quantity - quantity_refunded
        )
            return;
        const newValue =
            operation === "add" ? acceptedCount + 1 : acceptedCount - 1;
        if (newValue < 0) return;
        dispatch(
            updateOrderProductField({
                product_id,
                fieldKey: "acceptedCount",
                value: newValue,
                isDefault: false,
            }),
        );
    };
    return (
        <>
            {orders &&
            orders.length > 0 &&
            orders[currentOrderIndex]?.isChecked &&
            !loading ? (
                <CommonBlock>
                    <Header>
                        <div className="header-block">
                            <div className="header-block-left">
                                <div className="problem-text">
                                    <h4>{t("problem_edit")}</h4>
                                </div>
                            </div>
                        </div>
                    </Header>
                    <div className="common-block-ryder">
                        <div className="commising-main">
                            <div className="commising-block">
                                {orders[currentOrderIndex]?.orderDetails?.items
                                    ?.filter((item) =>
                                        damagedItems.includes(item?.product_id),
                                    )
                                    .map((item, index) => (
                                        <div
                                            className="commising-product-block"
                                            key={index}
                                        >
                                            <div className="commising-product-block-inner">
                                                <div className="top-img-block">
                                                    <div className="img-block">
                                                        <div className="img-block-inner">
                                                            <img
                                                                src={
                                                                    item
                                                                        ?.productDetails
                                                                        ?.images[0] ||
                                                                    "/cheeseball.png"
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="top-img-block-text">
                                                        <h3>
                                                            {item
                                                                ?.productDetails
                                                                ?.title || ""}
                                                        </h3>
                                                        <div className="top-img-block-text-inner">
                                                            <p>
                                                                {item
                                                                    ?.productDetails
                                                                    ?.quantity ||
                                                                    0}{" "}
                                                                {item
                                                                    ?.productDetails
                                                                    ?.unit ||
                                                                    ""}
                                                            </p>
                                                            {item?.isDamaged ||
                                                            item?.isMissing ? (
                                                                <p className="damaged-qty">
                                                                    {t(
                                                                        "DamagedQty",
                                                                    )}
                                                                    :{" "}
                                                                    {(item?.quantity ||
                                                                        0) -
                                                                        (item?.quantity_refunded ||
                                                                            0) -
                                                                        (item?.acceptedCount ||
                                                                            0)}
                                                                </p>
                                                            ) : (
                                                                ""
                                                            )}
                                                            <div
                                                                className={`top-img-block-text-pm ${
                                                                    (item?.quantity ||
                                                                        0) -
                                                                        (item?.quantity_refunded ||
                                                                            0) ==
                                                                    (item?.acceptedCount ||
                                                                        0)
                                                                        ? "all-accepted"
                                                                        : ""
                                                                }`}
                                                            >
                                                                <span>
                                                                    {item?.acceptedCount ||
                                                                        0}
                                                                    /
                                                                </span>
                                                                <span>
                                                                    {(item?.quantity ||
                                                                        0) -
                                                                        (item?.quantity_refunded ||
                                                                            0)}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="plus-minus-button">
                                                    <div className="plus-minus-button-inner">
                                                        <button
                                                            className="minus-btn"
                                                            onClick={() =>
                                                                handleUpdateAcceptedCount(
                                                                    item?.product_id,
                                                                    "subtract",
                                                                )
                                                            }
                                                        >
                                                            <img src="/minus-icon-rider.svg" />
                                                        </button>
                                                    </div>
                                                    <div className="plus-minus-button-inner">
                                                        <button
                                                            className="plus-btn"
                                                            onClick={() =>
                                                                handleUpdateAcceptedCount(
                                                                    item?.product_id,
                                                                    "add",
                                                                )
                                                            }
                                                        >
                                                            <img src="/plus-icon-rider.svg" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                {/* Repeat the same block for the second product */}
                                {!isAllItemsAccepted ? (
                                    <div className="button-group">
                                        <button onClick={handleCancelOrder}>
                                            <img src="/error-icon-product.svg" />
                                            <span>
                                                {t("problem_cannot_be_solved")}
                                            </span>
                                        </button>
                                        <button
                                            className="second-btn"
                                            onClick={handleSolveProblemLater}
                                        >
                                            <img src="/error-icon-product-2.svg" />
                                            <span>
                                                {t(
                                                    "problem_can_be_solved_later",
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                ) : (
                                    <div className="commising-bottombar">
                                        <CompleteOrderButton
                                            order_id={
                                                orders[currentOrderIndex]
                                                    ?.order_id
                                            }
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CommonBlock>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default ShiftCommisioning;
