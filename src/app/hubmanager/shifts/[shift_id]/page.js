"use client";
import { useCallback, useRef, useEffect } from "react";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/hubmanager.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
import Select from "react-select";
import { useRouter, usePathname, useServerInsertedHTML } from "next/navigation";
import { useDateButtonData, useShiftData } from "@/hooks/useFetchHooks";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { authState } from "@/redux/Auth/AuthSlice";
import Loader from "@/components/Loader";
import { SHIFT_END_REASONS, SHIFT_STATUS } from "@/constants/keywords";
import moment from "moment";
import { DeleteSvg } from "@/assets/svgs";
import { PATH_DASHBOARD } from "@/routes/paths";

const ScheduleScreen = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const {
        shiftData,
        isLoading,
        reason,
        setReason,
        handleEndShift,
        handelNoShow,
        handleCancelShift,
    } = useShiftData();
    const { hubData } = useSelector(authState);
    const { formattedDate, DATE: date } = useDateButtonData({
        shiftDate: shiftData?.ts_start_planned,
    });

    const REASONS = ["NoShow", "Illness", "Accident", "Correction"];

    const ts_start_planned = new Date(shiftData?.ts_start_planned);
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // if (ts_start_planned < oneMonthAgo) {
    //     console.log("The date is more than one month ago.");
    // } else {
    //     console.log("The date is within the last month.");
    // }

    const timeParser = (time) => {
        if (!time) return;
        return moment(time).format("h:mm A");
    };

    const NoShowButton = () => {
        return (
            <button className="mt-5" onClick={handelNoShow}>
                <DeleteSvg />
                <span>{t("ReportNoShow")}</span>
            </button>
        );
    };

    const CancelShiftButton = () => {
        return (
            <button onClick={handleCancelShift}>
                <DeleteSvg />
                <span>{t("DeleteShift")}</span>
            </button>
        );
    };

    const ActiveComponent = () => {
        return (
            <>
                <div className="schedule-block-common">
                    <div className="top-block">
                        <h2>{t("ManualEndShift")}</h2>
                    </div>
                    <div className="schedule-block-common-checkbox">
                        {SHIFT_END_REASONS.map((item, index) => (
                            <div className="checkbox-block-inner" key={index}>
                                <p>{t(item)}</p>
                                <div className="checkbox-custom">
                                    <div className="form-group">
                                        <input
                                            type="checkbox"
                                            id={item}
                                            onChange={() => setReason(item)}
                                            checked={item === reason}
                                        ></input>
                                        <label htmlFor={item}></label>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="add-block-inner">
                        <button
                            className="add-btn"
                            onClick={handleEndShift}
                            disabled={!reason}
                        >
                            {t("EndShift")}
                        </button>
                    </div>
                </div>
                <div className="add-btn-block">
                    <NoShowButton />
                </div>
            </>
        );
    };

    const RequestedComponent = () => {
        return (
            <>
                <div className="add-btn-block">
                    <CancelShiftButton />
                </div>
            </>
        );
    };

    const AcceptedComponent = () => {
        return (
            <>
                <div className="add-btn-block">
                    <CancelShiftButton />
                    <NoShowButton />
                </div>
            </>
        );
    };

    const CompletedComponent = () => {
        return (
            <>
                {/* <div className="schedule-block-common">
                    <div className="top-block">
                        <h2>{t("EditWorkingHours")}</h2>
                    </div>
                    <div className="input-block-inner">
                        <input
                            type="text"
                            placeholder={t("EndTimePlaceholder")}
                        ></input>
                        <div className="btn-conform">
                            <button>{t("Confirm")}</button>
                        </div>
                    </div>
                </div> */}
            </>
        );
    };

    const activeStatuses = [
        SHIFT_STATUS.ACTIVE_BACKUP,
        SHIFT_STATUS.ACTIVE_IDLE,
        SHIFT_STATUS.ACTIVE_PICKING,
        SHIFT_STATUS.ACTIVE_DELIVERING,
    ];

    const Renderer = () => {
        return (
            <>
                {shiftData?.status === SHIFT_STATUS.ACCEPTED ? (
                    <AcceptedComponent />
                ) : shiftData?.status === SHIFT_STATUS.REQUESTED ? (
                    <RequestedComponent />
                ) : activeStatuses.includes(shiftData?.status) ? (
                    <ActiveComponent />
                ) : shiftData?.status === SHIFT_STATUS.DONE &&
                  ts_start_planned > oneMonthAgo ? (
                    <CompletedComponent />
                ) : (
                    ""
                )}
            </>
        );
    };

    const StatusButton = () => {
        let statusLabel = "";
        let statusClass = "";

        if (shiftData?.status === SHIFT_STATUS.ACCEPTED) {
            statusLabel = t("Accepted");
            statusClass = "request-block";
        } else if (shiftData?.status === SHIFT_STATUS.REQUESTED) {
            statusLabel = t("Requested");
            statusClass = "request-block";
        } else if (activeStatuses.includes(shiftData?.status)) {
            statusLabel = t("Active");
            statusClass = "active-block";
        } else if (shiftData?.status === SHIFT_STATUS.DONE) {
            statusLabel = t("Completed");
            statusClass = "complate-block";
        }

        return statusLabel ? (
            <span className={statusClass}>{statusLabel}</span>
        ) : null;
    };

    return (
        <CommonPageBLockHub>
            <div className="">
                <Header>
                    <div className="header-left">
                        <div className="logo-header padding-diff-block">
                            <span
                                className="back-arrow"
                                onClick={() =>
                                    router.push(
                                        PATH_DASHBOARD.hubManager.shifts,
                                    )
                                }
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    alt="arrow"
                                    src="/back-arrrow-header.svg"
                                />
                            </span>
                        </div>
                        <div className="calender-block">
                            <span className="montag-block">
                                {formattedDate}
                            </span>
                            {hubData?.name ? (
                                <span className="hub-block">
                                    {t("hub")}, {hubData?.name || ""}
                                </span>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </Header>
            </div>

            {isLoading ? (
                <Loader />
            ) : (
                <div className="common-block-hub">
                    <div className="schedule-block">
                        <div className="schedule-block-four">
                            <div className="schedule-block-four-inner">
                                <div className="schedule-block-four-inner-block">
                                    <div className="schedule-block-common">
                                        <div className="top-block">
                                            <h2>{t("Overview")}</h2>
                                            <StatusButton />
                                        </div>
                                        <div className="shift-block-inner">
                                            <p>
                                                {t("ShiftStart")}{" "}
                                                {timeParser(
                                                    shiftData?.ts_start_planned,
                                                )}
                                            </p>
                                            <p className="block-tag">-</p>
                                            <p className="end-shift">
                                                {t("ShiftEnd")}{" "}
                                                {timeParser(
                                                    shiftData?.ts_end_planned,
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <Renderer />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </CommonPageBLockHub>
    );
};

export default ScheduleScreen;
