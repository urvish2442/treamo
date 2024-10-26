"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import ProfilePopover from "@/components/common/ProfilePopover";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import { CloseIcon } from "@/assets/svgs";
import useToggle from "@/hooks/useToggle";
import { decodeData } from "@/utils/jwt";

const RiderShiftsErrorsView = ({ returnTo }) => {
    // ** Hooks
    const { t } = useTranslation("common");
    const infoHandler = useToggle();

    const decodedReturnTo = useMemo(() => {
        try {
            return decodeData(returnTo);
        } catch (error) {
            return "";
        }
    }, [returnTo]);

    // ** Constants
    const ERRORS = useMemo(
        () => [
            {
                icon: "/error-img.png",
                label: t("shiftErrors.sicknote"),
                id: "sicknote",
            },
            {
                icon: "/error-img.png",
                label: t("shiftErrors.pay"),
                id: "pay",
            },
            {
                icon: "/error-img.png",
                label: t("shiftErrors.accident"),
                id: "accident",
            },
            {
                icon: "/error-img.png",
                label: t("shiftErrors.tardiness"),
                id: "tardiness",
            },
            {
                icon: "/error-img.png",
                label: t("shiftErrors.checkIn"),
                id: "checkIn",
            },
        ],
        [t],
    );

    // ** Renders
    const renderInfoModal = useMemo(
        () => (
            <Modal
                isOpen={infoHandler.value}
                className="common-modal-block"
                onRequestClose={() => infoHandler.onFalse()}
                contentLabel="Example Modal"
            >
                <div className="common-close-error-btn">
                    <div className="btn-close-block">
                        <button onClick={() => infoHandler.onFalse()}>
                            <CloseIcon />
                        </button>
                    </div>
                    <h3>
                        Bitte kontaktiere deinen Hubmanager per Email / Handy
                    </h3>
                    <h3>
                        Du kanns Ridercare unter der folgenden Email-Adresse
                        erreichen:{" "}
                        <Link href={`mailto:ridercare@traemo.com`}>
                            ridercare@traemo.com{" "}
                        </Link>
                    </h3>
                </div>
            </Modal>
        ),
        [infoHandler],
    );

    return (
        <CommonBlock>
            <Header>
                <div className="header-block">
                    <div className="header-block-left">
                        <Link
                            href={
                                decodedReturnTo ||
                                PATH_DASHBOARD.rider.dashboard
                            }
                        >
                            <img
                                alt="back-arrow"
                                src="/back-arrrow-header.svg"
                            />
                        </Link>
                    </div>
                    <div className="header-block-right">
                        <ProfilePopover />
                    </div>
                </div>
            </Header>
            <div className="common-block-ryder">
                <div className="shift-common-error">
                    {ERRORS.map((item) => (
                        <div
                            className="shift-common-error-inner"
                            key={item.id}
                            onClick={() => infoHandler.onTrue()}
                        >
                            <img src={item.icon} alt="error-logo" />
                            <p>{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
            {renderInfoModal}
        </CommonBlock>
    );
};

export default RiderShiftsErrorsView;
