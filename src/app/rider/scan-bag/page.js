"use client";
import QRScanner from "@/components/common/QRScanner";
import { authState, updateOrderBagId } from "@/redux/Auth/AuthSlice";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ScanBag = () => {
    const dispatch = useDispatch();
    const { bag_id } = useSelector(authState);
    const { t } = useTranslation("common");
    const { orders } = useSelector(authState);
    const { push } = useRouter();
    const [code, setCode] = useState("");

    // ** Hooks
    const qrHandlerRef = useRef(null);

    // ** Effects
    useEffect(() => {
        if (!orders?.length) push(PATH_DASHBOARD.rider.shiftCommissioning);
    }, [orders, push]);

    const onExtractData = (qrData) => {
        try {
            const { status, data: scannedBagId, error } = qrData;

            if (status) {
                const isValidBagId = /^bag_/.test(scannedBagId);

                if (!isValidBagId) {
                    if (qrHandlerRef.current) {
                        qrHandlerRef.current.startScan();
                    }
                    return toast.error(t("BagIdIsInvalid"));
                }
                if (bag_id?.includes(scannedBagId)) {
                    if (qrHandlerRef.current) {
                        qrHandlerRef.current.startScan();
                    }
                    return toast.error(t("BagAlreadyScanned"));
                }
                dispatch(updateOrderBagId({ bag_id: scannedBagId }));
                setCode(scannedBagId);
                toast.success(t("BagScannedSuccessfully"));
            }

            if (error) {
                console.error("error, onExtractData", error);
            }
        } catch (error) {
            console.error("QR Scan Page Error:", error);
        }
    };

    const handleNext = () => {
        if (!code) {
            return toast.error(t("PleaseScanBagId"));
        }
        const query = new URLSearchParams({ type: encodeData("noFetch") });
        push(`${PATH_DASHBOARD.rider.shiftCommissioning}?${query}`);
    };

    return (
        <QRScanner
            onExtractData={onExtractData}
            handleNext={handleNext}
            ref={qrHandlerRef}
        />
    );
};

export default ScanBag;
