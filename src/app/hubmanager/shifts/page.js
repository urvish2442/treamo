"use client";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/hubmanager.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
import Select from "react-select";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { authState } from "@/redux/Auth/AuthSlice";
import { useSelector } from "react-redux";
import { useDateButtonData, useShifts } from "@/hooks/useFetchHooks";
import Loader from "@/components/Loader";
import { PATH_DASHBOARD } from "@/routes/paths";
import { SHIFT_STATUS } from "@/constants/keywords";
import { toast } from "react-toastify";

const ShiftsPage = () => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const { hubData } = useSelector(authState);
    const { shifts, isLoading } = useShifts();
    const { formattedDate, parsedTime, DATE: date } = useDateButtonData();

    const handleShiftRoute = (shiftId, status) => {
        if (!shiftId || !status) return;

        if (status === SHIFT_STATUS.NOSHOW) {
            return toast.info(t("NoShowShift"));
        }
        router.push(PATH_DASHBOARD.hubManager.update(shiftId));
    };

    const handleShiftAddRoute = (type = "") => {
        const query = type ? `?${new URLSearchParams({ type })}` : "";
        router.push(`${PATH_DASHBOARD.hubManager.addShift}${query}`);
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
                                        PATH_DASHBOARD.hubManager.schedule,
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
                    <div className="rider-block">
                        <div className="rider-block-three">
                            <div className="rider-block-three-block">
                                <div className="rider-block-three-block-inner">
                                    <div className="rider-block-top">
                                        <h2>{t("rider")}</h2>
                                        <div className="label-group">
                                            <span className="recommened">
                                                {t("recommended", { count: 3 })}{" "}
                                                {/* Recommended count */}
                                            </span>
                                            <span className="max-block">
                                                {t("max", { count: 10 })}{" "}
                                                {/* Max count */}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="shift-block">
                                        <p>
                                            {t("shift_start")}: {parsedTime}{" "}
                                            {t("Hours")}
                                        </p>
                                    </div>
                                    <div className="rider-block-data">
                                        <div className="rider-block-data-inner">
                                            {shifts?.rider?.length > 0 &&
                                                shifts?.rider?.map(
                                                    (
                                                        item,
                                                        index, // Example for rider items
                                                    ) => (
                                                        <div
                                                            key={index}
                                                            className="rider-block-data-inner-block"
                                                            onClick={() =>
                                                                handleShiftRoute(
                                                                    item?.id,
                                                                    item?.status,
                                                                )
                                                            }
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <img
                                                                alt="img"
                                                                src={
                                                                    item?.rider
                                                                        ?.user
                                                                        ?.picture_id ||
                                                                    "/profile-img.png"
                                                                }
                                                            />
                                                            <h4>
                                                                {item?.rider
                                                                    ?.user
                                                                    ?.firstname ||
                                                                    ""}{" "}
                                                                {item?.rider
                                                                    ?.user
                                                                    ?.lastname ||
                                                                    ""}
                                                                {/* {" : "}
                                                                {item?.status} */}
                                                            </h4>
                                                        </div>
                                                    ),
                                                )}
                                        </div>
                                    </div>
                                    <div className="add-btn">
                                        <button
                                            className="btn-add"
                                            onClick={() =>
                                                handleShiftAddRoute()
                                            }
                                        >
                                            <img
                                                alt="img"
                                                src="/plus-icon.svg"
                                            />
                                            <span>{t("add")}</span>{" "}
                                            {/* Add button text */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="rider-block-three-block">
                                <div className="rider-block-three-block-inner">
                                    <div className="rider-block-top no-title">
                                        {/* <h2>{t("springer")}</h2> */}
                                        <div className="label-group">
                                            <span className="recommened">
                                                {t("recommended", { count: 3 })}{" "}
                                                {/* Recommended count */}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="shift-block">
                                        <p>
                                            {t("shift_start")}:{" "}
                                            {parsedTime > 0
                                                ? parsedTime - 1
                                                : 0}{" "}
                                            {t("Hours")}
                                        </p>
                                    </div>
                                    <div className="rider-block-data">
                                        <div className="rider-block-data-inner">
                                            {shifts?.springer?.length > 0 &&
                                                shifts?.springer?.map(
                                                    (
                                                        item,
                                                        index, // Example for rider items
                                                    ) => (
                                                        <div
                                                            key={index}
                                                            className="rider-block-data-inner-block"
                                                            onClick={() =>
                                                                handleShiftRoute(
                                                                    item?.id,
                                                                    item?.status,
                                                                )
                                                            }
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            <img
                                                                alt="img"
                                                                src={
                                                                    item?.rider
                                                                        ?.user
                                                                        ?.picture_id ||
                                                                    "/profile-img.png"
                                                                }
                                                            />
                                                            <h4>
                                                                {item?.rider
                                                                    ?.user
                                                                    ?.firstname ||
                                                                    ""}{" "}
                                                                {item?.rider
                                                                    ?.user
                                                                    ?.lastname ||
                                                                    ""}
                                                            </h4>
                                                        </div>
                                                    ),
                                                )}
                                            {/* <div className="rider-block-data-inner-block">
                                                <img
                                                    alt="img"
                                                    src="/profile-img.png"
                                                />
                                                <h4>{t("springer")} 1</h4>{" "}
                                            </div> */}
                                        </div>
                                    </div>
                                    <div className="add-btn">
                                        <button
                                            className="btn-add"
                                            onClick={() =>
                                                handleShiftAddRoute("springer")
                                            }
                                        >
                                            <img
                                                alt="img"
                                                src="/plus-icon.svg"
                                            />
                                            <span>{t("add")}</span>{" "}
                                            {/* Add button text */}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </CommonPageBLockHub>
    );
};

export default ShiftsPage;
