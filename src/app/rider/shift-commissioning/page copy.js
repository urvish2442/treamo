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
    setRouteDirection,
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

const ShiftCommisioning = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get("type");
    const dispatch = useDispatch();
    const router = useRouter();
    const [routes, setRoutes] = useState([]);
    const [routesLoading, setRoutesLoading] = useState(false);
    const { t } = useTranslation();
    const { orders, currentOrderIndex } = useSelector(authState);
    const [orderDetailsLoading, setOrderDetailsLoading] = useState(false);

    const fetchRoutes = async () => {
        try {
            const { data, status } = await axiosGet(API_ROUTER.GET_ROUTES);
            if (status) {
                setRoutes(data);
                const directions =
                    Array.isArray(data) && data.length > 0
                        ? data[4]?.directions
                        : routes?.directions || [];
                if (directions) {
                    const updatedDirections = directions?.map((direction) => ({
                        ...direction,
                        isPicked: false,
                        isDelivered: false,
                        orderDetails: null,
                        isChecked: false,
                        isSolveLater: false,
                    }));
                    dispatch(
                        setRouteDirection({ directions, updatedDirections }),
                    );
                }
            } else {
                toast.error(t("SomethingWentWrong"));
            }
        } catch (error) {
            console.error("Error fetching routes:", error);
        } finally {
            setTimeout(() => {
                setRoutesLoading(false);
            }, 300);
        }
    };

    useEffect(() => {
        router.replace(PATH_DASHBOARD.rider.shiftCommissioning);
        if (type && decodeData(type) == "fetch") return;
        dispatch(resetNextCurrentOrderIndex());
        setRoutesLoading(true);
        setTimeout(() => {
            fetchRoutes();
        }, 300);
    }, []);

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
            setTimeout(() => {
                setOrderDetailsLoading(false);
            }, 150);
        }
    };
    // const prevOrderIndexRef = useRef(currentOrderIndex);

    useEffect(() => {
        console.log(
            "🚀 ~ ShiftCommisioning ~ currentOrderIndex:",
            currentOrderIndex,
        );
        // if (prevOrderIndexRef.current !== currentOrderIndex) {
        // Only run updateData if currentOrderIndex has changed
        updateData();
        // }
        // prevOrderIndexRef.current = currentOrderIndex;
    }, [orders, currentOrderIndex]);

    const updateData = () => {
        if (!orders[currentOrderIndex]?.order_id) return;

        // Fetch order details only if they are not available
        if (!orders[currentOrderIndex]?.orderDetails) {
            getOrderDetails(orders[currentOrderIndex]?.order_id);
        }

        const currentOrder = orders[currentOrderIndex];

        if (currentOrder) {
            // Check if the order is delivered or picked
            if (currentOrder?.isDelivered || currentOrder?.isPicked) {
                // Check if it's the last order
                if (currentOrderIndex === orders.length - 1) {
                    // Only dispatch if currentOrderIndex has not been reset before
                    if (currentOrderIndex !== -1) {
                        // Assuming -1 is the reset value
                        dispatch(resetNextCurrentOrderIndex());
                        router.push(PATH_DASHBOARD.rider.deliveryChecklist);
                    }
                    return;
                } else {
                    // Move to the next order only if the current index is valid
                    if (currentOrderIndex < orders.length - 1) {
                        dispatch(setNextCurrentOrderIndex());
                    }
                }
                return;
            }

            // Check for bag_id length
            if (!currentOrder?.bag_id?.length) {
                // TODO: redirect to QR Code scanner
                return;
            }

            // Handle 'isSolveLater' case
            if (currentOrder?.isSolveLater) {
                router.push(PATH_DASHBOARD.rider.shiftCommissioningProblem);
            }
        }
    };

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

    useEffect(() => {
        console.log("🚀 ~ ShiftCommisioning ~ routeDirection:", {
            orders,
            index: currentOrderIndex,
        });
    }, [orders]);

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

    return (
        <>
            {routesLoading || orderDetailsLoading ? (
                <Loader />
            ) : orders[currentOrderIndex] ? (
                <CommonBlock>
                    <Header>
                        <div className="header-block">
                            <div className="header-block-left">
                                <div className="order-btn">
                                    <p>
                                        {t("Order")}:{" "}
                                        <span>
                                            {truncateString(
                                                orders[currentOrderIndex]
                                                    ?.order_id,
                                            )}
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div className="header-block-right">
                                <button
                                    className="save-btn-block"
                                    onClick={() => {}}
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
