"use client";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/hubmanager.style";
import Header from "@/components/styles/header.style";
import Link from "next/link";
import Select from "react-select";
import {
    useRouter,
    usePathname,
    useServerInsertedHTML,
    useSearchParams,
} from "next/navigation";
import { useAvailabilities, useDateButtonData } from "@/hooks/useFetchHooks";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { authState } from "@/redux/Auth/AuthSlice";
import Loader from "@/components/Loader";
import { PATH_DASHBOARD } from "@/routes/paths";

const AddShiftPage = () => {
    const { t } = useTranslation("common");
    const router = useRouter();
    const searchParams = useSearchParams();
    const type = searchParams.get("type") || "rider";
    const { hubData } = useSelector(authState);
    const {
        availabilities,
        isLoading,
        selectedAvailability,
        setSelectedAvailability,
        createShift,
    } = useAvailabilities();
    const { formattedDate } = useDateButtonData();
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
                    {/* order list checkbox list */}
                    <div className="rider-block">
                        <div className="rider-block-three order-checklist-block">
                            <div className="rider-block-three-block">
                                <div className="rider-block-three-block-inner">
                                    <div className="rider-block-top">
                                        <h2>{t(`${type}`)}</h2>
                                    </div>
                                    <div className="rider-block-data">
                                        <div className="rider-block-data-inner">
                                            {availabilities?.length > 0 &&
                                                availabilities?.map(
                                                    (item, index) => (
                                                        <div
                                                            className="rider-block-data-inner-block"
                                                            key={index}
                                                        >
                                                            <div className="rider-block-checkbox">
                                                                <img
                                                                    alt="img"
                                                                    src="/profile-img.png"
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
                                                            <div className="checkbox-custom">
                                                                <div className="form-group">
                                                                    <input
                                                                        type="checkbox"
                                                                        id={`rider-${index}`}
                                                                        onChange={() =>
                                                                            setSelectedAvailability(
                                                                                item?.id,
                                                                            )
                                                                        }
                                                                        checked={
                                                                            item?.id ===
                                                                            selectedAvailability
                                                                        }
                                                                    ></input>
                                                                    <label
                                                                        htmlFor={`rider-${index}`}
                                                                    ></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ),
                                                )}
                                        </div>
                                    </div>
                                    <div className="add-btn">
                                        <button
                                            className="btn-add check-order"
                                            onClick={createShift}
                                            disabled={!selectedAvailability}
                                        >
                                            <img
                                                alt="img"
                                                src="/plus-icon-green.svg"
                                            />
                                            <span>{t("add")}</span>
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

export default AddShiftPage;
