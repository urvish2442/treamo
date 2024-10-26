import { ORDER_STATUS } from "@/constants/keywords";
import { updateOrderStatus } from "@/redux/Auth/AuthSlice";
import { API_ROUTER } from "@/services/apiRouter";
import { axiosPut } from "@/services/axiosHelper";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CompleteOrderButton = ({ order_id }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleOrderComplete = async () => {
        if (!order_id) return;
        try {
            setIsUpdating(true);
            let payload = { ts_picked: new Date().toISOString() };
            const { data, status } = await axiosPut(
                API_ROUTER.UPDATE_ORDER_DETAILS(order_id),
                payload,
            );
            if (
                status &&
                (data?.status == ORDER_STATUS.PICKED ||
                    data?.ts_picked !== null)
            ) {
                dispatch(
                    updateOrderStatus({ statusKey: "isPicked", value: true }),
                );
            }
        } catch (error) {
            console.error("handleOrderComplete ~ error:", error);
            toast.error(t("SomethingWentWrong"));
        } finally {
            setIsUpdating(false);
        }
    };
    return (
        <>
            <button onClick={handleOrderComplete} disabled={isUpdating}>
                {t("OrderComplete")}
            </button>
        </>
    );
};

export default CompleteOrderButton;
