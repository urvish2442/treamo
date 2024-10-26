"use client";

import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import QrScanner from "qr-scanner";
import { useTranslation } from "react-i18next";

const QRScanner = forwardRef(function ChildQRScanner(
    { onExtractData = () => {}, handleNext = () => {} },
    ref,
) {
    // ** States
    const [qrOn, setQrOn] = useState(true);

    // ** Hooks
    const scanner = useRef();
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const { t } = useTranslation("common");

    // ** Effects
    useEffect(() => {
        if (videoEl?.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxEl.current || undefined,
            });

            scanner.current
                .start()
                .then(() => setQrOn(true))
                .catch(() => setQrOn(false));
        }

        return () => {
            if (scanner.current) scanner.current.stop();
        };
    }, []);

    useImperativeHandle(ref, () => ({
        startScan() {
            if (scanner.current) {
                scanner.current.start();
            }
        },
        stopScan() {
            if (scanner.current) {
                scanner.current.stop();
            }
        },
    }));

    // ** Handlers
    const onScanSuccess = (result) => {
        if (result?.data) {
            onExtractData({
                status: true,
                data: result.data,
                error: null,
            });
        }
    };

    const onScanFail = (err) => {
        onExtractData({
            status: false,
            data: null,
            error: err,
        });
    };

    if (!qrOn) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-center text-lg text-gray-700 p-4">
                    {t("CameraAccessBlocked")}
                </p>
            </div>
        );
    }

    return (
        <div className="qr-reader full-position-re">
            <video ref={videoEl}></video>
            <div ref={qrBoxEl} className="qr-box">
                <img
                    src={"/qr-frame.svg"}
                    alt="QR Reader"
                    width={256}
                    height={256}
                    className="qr-frame"
                />
            </div>
            <div className="qr-next-bottom">
                <div className="qr-next-bottom-inner">
                    <button onClick={handleNext}>Next</button>
                </div>
            </div>
        </div>
    );
});

export default QRScanner;