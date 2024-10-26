import { ORDER_STATUS } from "@/constants/keywords";
import {
    setNextCurrentOrderIndex,
    updateOrderStatus,
} from "@/redux/Auth/AuthSlice";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { axiosPost } from "@/services/axiosHelper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import CompleteOrderButton from "./CompleteOrderButton";

const ButtonRenderer = ({ order, setLoading = () => {} }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { push } = useRouter();
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (!order || !order?.orderDetails?.items) return;
        const items = order?.orderDetails?.items || [];
        let isAllItemsChecked = true;
        let isAllItemsAccepted = true;
        for (const item of items) {
            const {
                acceptedCount = 0,
                quantity = 0,
                quantity_refunded = 0,
                isDamaged = false,
                isMissing = false,
            } = item;

            if (acceptedCount < quantity - quantity_refunded) {
                isAllItemsAccepted = false;

                if (isDamaged || isMissing) {
                    continue;
                } else {
                    isAllItemsChecked = false;
                    break;
                }
            }
        }
        let status = isAllItemsAccepted
            ? "accepted"
            : isAllItemsChecked
              ? "checked"
              : "";
        if (status) {
            setStatus(status);
        }
    }, [order]);

    const handleNextScreen = () => {
        dispatch(updateOrderStatus({ statusKey: "isChecked", value: true }));
        push(`${PATH_DASHBOARD.rider.shiftCommissioningProblem}?`);
    };

    return (
        status && (
            <div className="commising-bottombar">
                {status === "accepted" && (
                    <CompleteOrderButton order_id={order?.order_id} />
                )}
                {status === "checked" && (
                    <button onClick={handleNextScreen}>{t("Next")}</button>
                )}
            </div>
        )
    );
};

export default ButtonRenderer;
