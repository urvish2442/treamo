"use client";
import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import CommonPageBLockHub from "@/components/styles/hubmanager.style";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { enUS, de } from "react-day-picker/locale";
import HubSelectBox from "@/components/common/hubSelectBox";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useDaysForHubManager } from "@/hooks/useFetchHooks";
import Loader from "@/components/Loader";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setDate } from "@/redux/Auth/AuthSlice";
const Layers = () => {
    const router = useRouter();
    const { sortedDays, isLoading } = useDaysForHubManager();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation("common");
    const localeMapping = {
        en: enUS,
        de: de,
    };
    const today = new Date();

    const modifiersClassNames = {
        closed: "my-closed-day",
        weekend: "my-weekend-day",
        open: "my-open-day",
    };
    const handleDaySelect = (event, { modifiers }) => {
        const selected = event || today;
        const selectedDate = selected.toISOString().split("T")[0];
        if (selected < today.setHours(0, 0, 0, 0)) {
            return toast.info(t("SelectedDateIsInThePast"));
        }
        const isOpen = sortedDays?.open?.some(
            (openDate) => openDate.toISOString().split("T")[0] === selectedDate,
        );
        if (!isOpen) {
            return toast.info(t("ThisDayIsClosed"));
        }
        const DATE = new Date(selected);
        const formattedDate = `${DATE.getFullYear()}-${DATE.getMonth() + 1}-${DATE.getDate()}`;
        dispatch(setDate(formattedDate));
        router.push(PATH_DASHBOARD.hubManager.shifts);
    };

    return (
        <div className="">
            <CommonPageBLockHub>
                <div className="common-block-hub">
                    <div className="common-block-hub-menu">
                        <ul>
                            <li>
                                <Link
                                    href={PATH_DASHBOARD.hubManager.dashboard}
                                >
                                    {t("Dashboard")}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href={PATH_DASHBOARD.hubManager.schedule}
                                    className="active-link"
                                >
                                    {t("Layers")}
                                </Link>
                            </li>
                            <li>
                                <div className="select-form-block">
                                    <HubSelectBox />
                                </div>
                            </li>
                        </ul>
                    </div>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            <div className="common-calender-page">
                                <div className="calender-block">
                                    <DayPicker
                                        mode="single"
                                        selected={today}
                                        // month={new Date(2024, 9)}
                                        numberOfMonths={3}
                                        // pagedNavigation
                                        modifiers={sortedDays}
                                        modifiersClassNames={
                                            modifiersClassNames
                                        }
                                        onSelect={handleDaySelect}
                                        locale={
                                            localeMapping[i18n.language] || de
                                        }
                                    />
                                </div>
                            </div>
                            <div className="label-block-close">
                                <div className="label-block-close-block">
                                    <div className="label-block-close-inner">
                                        <span></span>
                                        <h3>{t("Closed")}</h3>
                                    </div>
                                    <div className="label-block-close-inner weekend-block">
                                        <span></span>
                                        <h3>{t("Weekend")}</h3>
                                    </div>
                                    <div className="label-block-close-inner open-block">
                                        <span></span>
                                        <h3>{t("Open")}</h3>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </CommonPageBLockHub>
        </div>
    );
};

export default Layers;
