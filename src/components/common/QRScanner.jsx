"use client";

import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

const QRScanner = ({
    onExtractData = () => {},
    handleNext = () => {},
    reScan = false,
    setReScan = () => {},
}) => {
    // ** States
    const [qrOn, setQrOn] = useState(true);

    // ** Hooks
    const scanner = useRef();
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const successExtractedData = useRef("");
    const errorExtractedData = useRef("");

    // ** Effects
    useEffect(() => {
        if (videoEl?.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
                overlay: qrBoxEl?.current || undefined,
            });

            scanner?.current
                ?.start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }

        return () => {
            if (!videoEl?.current) scanner?.current?.stop();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ** Handlers
    const onScanSuccess = (result) => {
        if (result?.data && successExtractedData.current === "") {
            successExtractedData.current = result?.data;
            onExtractData({
                status: true,
                data: successExtractedData.current,
                error: null,
            });
        }
    };

    const onScanFail = (err) => {
        if (errorExtractedData.current === "") {
            errorExtractedData.current = null;
            onExtractData({
                status: false,
                data: errorExtractedData.current,
                error: err,
            });
        }
    };

    const handleReScan = () => {
        setReScan(false);
        successExtractedData.current = "";
        errorExtractedData.current = "";
        scanner.current.start();
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
                    {!reScan ? (
                        <button onClick={handleNext}>Next</button>
                    ) : (
                        <button onClick={handleReScan}>Re-Scan</button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QRScanner;
