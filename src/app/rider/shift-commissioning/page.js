"use client";
import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import { DayPicker } from "react-day-picker";
import { es, de } from "react-day-picker/locale";
import useMetaData from "@/hooks/useMetaData";
import { API_ROUTER } from "@/services/apiRouter";
import { useDispatch, useSelector } from "react-redux";
// import { useRiderIdleScreenData } from "@/hooks/useFetchHooks";
import {
    authState,
    resetNextCurrentOrderIndex,
    setNextCurrentOrderIndex,
    setOrderDetailsInOrders,
    shiftCurrentOrderToLast,
    shiftCurrentProductToLast,
    updateOrderProductField,
} from "@/redux/Auth/AuthSlice";
import { axiosGet } from "@/services/axiosHelper";
import { toast } from "react-toastify";
import Loader from "@/components/Loader";
import { truncateString } from "@/utils/globalFunctions";
import ButtonRenderer from "@/components/rider/shiftCommissioning/ButtonRenderer";
import { useRouter, useSearchParams } from "next/navigation";
import { decodeData, encodeData } from "@/utils/jwt";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRiderIdleScreenData } from "@/hooks/useFetchHooks";

const ShiftCommisioning = () => {
    const { routes, routesLoading } = useRiderIdleScreenData();
    const dispatch = useDispatch();
    const { push } = useRouter();
    const { t } = useTranslation();
    const { orders, currentOrderIndex } = useSelector(authState);
    const [orderDetailsLoading, setOrderDetailsLoading] = useState(false);

    const getOrderDetails = async (order_id) => {
        try {
            setOrderDetailsLoading(true);
            const { data, status } = await axiosGet(
                API_ROUTER.GET_ORDER_DETAILS(order_id),
            );
            const mergedData = mergeItemsWithProductDetails(data);
            if (status) {
                dispatch(
                    setOrderDetailsInOrders({
                        orderDetails: mergedData,
                    }),
                );
            }
        } catch (error) {
            console.error("getOrderDetails ~ error:", error);
        } finally {
            // setTimeout(() => {
            setOrderDetailsLoading(false);
            // }, 100);
        }
    };

    useEffect(() => {
        console.log("🚀 ~ ShiftCommisioning ~ orders:", {
            orders,
            currentOrderIndex,
        });
        if (!orders[currentOrderIndex]?.order_id) return;
        if (!orders[currentOrderIndex]?.orderDetails) {
            getOrderDetails(orders[currentOrderIndex]?.order_id);
        }
        const currentOrder = orders[currentOrderIndex];
        if (currentOrder?.isDelivered || currentOrder?.isPicked) {
            if (currentOrderIndex === orders.length - 1) {
                push(PATH_DASHBOARD.rider.deliveryChecklist);
                return;
            } else {
                if (currentOrderIndex < orders.length - 1) {
                    dispatch(setNextCurrentOrderIndex());
                }
            }
            return;
        }
        if (!currentOrder?.bag_id?.length > 0) {
            setOrderDetailsLoading(true);
            push(PATH_DASHBOARD.rider.scanBag);
            return;
        }
        if (currentOrder?.isSolveLater) {
            push(PATH_DASHBOARD.rider.shiftCommissioningProblem);
        }
    }, [orders, currentOrderIndex]);

    const mergeItemsWithProductDetails = (data) => {
        const { items, products, ...rest } = data;

        return {
            ...rest,
            items: items.map((item) => {
                const productDetails = products.find(
                    (product) => product.id === item.product_id,
                );
                return {
                    ...item,
                    productDetails: productDetails
                        ? { ...productDetails }
                        : null,
                    acceptedCount: 0,
                    isDamaged: false,
                    isMissing: false,
                };
            }),
        };
    };

    // useEffect(() => {
    //     console.log("🚀 ~ ShiftCommisioning ~ routeDirection:", {
    //         orders,
    //         index: currentOrderIndex,
    //     });
    // }, [orders]);

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
            }),
        );
    };

    const handleDamagedAndMissingItem = (
        product_id,
        key = "isDamaged", // ("isMissing")
    ) => {
        const item = orders[currentOrderIndex]?.orderDetails?.items?.find(
            (item) => item.product_id === product_id,
        );
        if (!item || item[key]) return;

        const { acceptedCount = 0, quantity, quantity_refunded } = item;
        if (acceptedCount >= quantity - quantity_refunded)
            return toast.info(t("AllItemsAccepted"));
        dispatch(
            updateOrderProductField({
                product_id,
                fieldKey: key,
                value: true,
            }),
        );
        dispatch(shiftCurrentProductToLast({ product_id }));
    };

    const handleAddBag = () => {
        if (!orders[currentOrderIndex]?.order_id) return;
        push(PATH_DASHBOARD.rider.scanBag);
    };

    return (
        <>
            {routesLoading || orderDetailsLoading ? (
                <Loader />
            ) : orders[currentOrderIndex] &&
              !orders[currentOrderIndex]?.isPicked &&
              !orders[currentOrderIndex]?.isDelivered ? (
                <CommonBlock>
                    <Header>
                        <div className="header-block">
                            <div className="header-block-left">
                                <div className="order-btn">
                                    <p>
                                        {t("Order")}:{" "}
                                        {orders[currentOrderIndex]?.bag_id
                                            ?.length > 0 ? (
                                            <span>
                                                {truncateString(
                                                    orders[currentOrderIndex]
                                                        ?.bag_id[0],
                                                )}
                                            </span>
                                        ) : (
                                            ""
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="header-block-right">
                                <button
                                    className="save-btn-block"
                                    onClick={handleAddBag}
                                >
                                    {t("AddBag")}
                                </button>
                            </div>
                        </div>
                    </Header>
                    <div className="common-block-ryder">
                        <div className="commising-main">
                            <div className="commising-block">
                                {orders[
                                    currentOrderIndex
                                ]?.orderDetails?.items?.map((item, i) => (
                                    <div
                                        className="commising-product-block"
                                        key={i}
                                    >
                                        <div
                                            className="commising-product-block-inner"
                                            style={
                                                item?.isDamaged ||
                                                item?.isMissing
                                                    ? {
                                                          border: "1px solid #b32317",
                                                      }
                                                    : {}
                                            }
                                        >
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
                                                        {item?.productDetails
                                                            ?.title || ""}
                                                    </h3>
                                                    <div className="top-img-block-text-inner">
                                                        <p>
                                                            {item
                                                                ?.productDetails
                                                                ?.quantity ||
                                                                0}{" "}
                                                            {
                                                                item
                                                                    ?.productDetails
                                                                    ?.unit
                                                            }
                                                        </p>
                                                        {/* {item?.isDamaged ||
                                                        item?.isMissing ? (
                                                            <p>
                                                                damagedQty:{" "}
                                                                {item?.quantity -
                                                                    item?.acceptedCount}
                                                            </p>
                                                        ) : (
                                                            ""
                                                        )} */}

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
                                                <div className="plus-minus-button-inner">
                                                    <button
                                                        className="minus-btn"
                                                        onClick={() =>
                                                            handleDamagedAndMissingItem(
                                                                item?.product_id,
                                                                "isDamaged",
                                                            )
                                                        }
                                                    >
                                                        Damaged
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <ButtonRenderer
                                order={orders[currentOrderIndex]}
                                isLastOrderIndex={
                                    currentOrderIndex === orders.length - 1
                                }
                            />
                        </div>
                    </div>
                </CommonBlock>
            ) : (
                ""
            )}
        </>
    );
};

export default ShiftCommisioning;
