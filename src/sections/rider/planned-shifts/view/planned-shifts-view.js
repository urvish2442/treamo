"use client";

import Loader from "@/components/Loader";
import useMetaData from "@/hooks/useMetaData";
import { API_ROUTER } from "@/services/apiRouter";
import { axiosGet } from "@/services/axiosHelper";
import { decodeData } from "@/utils/jwt";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import Link from "next/link";
import { PATH_DASHBOARD } from "@/routes/paths";
import { getAddressFromObj } from "@/utils/globalFunctions";
import { useTranslation } from "react-i18next";

const PlannedShiftView = ({ date }) => {
    // ** States **
    const [updatedShifts, setUpdatedShifts] = useState([]);
    const [isDataLoading, setIsDataLoading] = useState(false);

    // ** Hooks **
    const [shifts, isLoading, fetchShifts] = useMetaData(
        API_ROUTER.GET_SHIFTS,
        {},
        true,
    );
    const { t } = useTranslation();

    const selectedDate = useMemo(() => decodeData(date), [date]);

    // ** Effects
    useEffect(() => {
        if (selectedDate && !updatedShifts?.length)
            fetchShifts({
                filters: `ts_start_planned$gt${moment(selectedDate).startOf("day").toISOString()} and ts_start_planned$lt${moment(selectedDate).endOf("day").toISOString()}`,
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    useEffect(() => {
        if (shifts && shifts?.length > 0 && !updatedShifts?.length) {
            fetchHubData(shifts);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shifts]);

    // ** Handlers
    const fetchHubData = async (shifts) => {
        try {
            setIsDataLoading(true);
            const updatedShiftData = await Promise.all(
                shifts.map(async (item) => {
                    const hubRes = await axiosGet(
                        API_ROUTER.GET_HUB_BY_ID(item?.hub_id),
                    );
                    if (hubRes.status) {
                        return { ...item, address: hubRes.data?.address || "" };
                    }
                    return item;
                }),
            );
            if (updatedShiftData && updatedShiftData.length > 0) {
                setUpdatedShifts(updatedShiftData);
            } else {
                setUpdatedShifts([]);
            }
            setIsDataLoading(false);
        } catch (error) {
            setUpdatedShifts([]);
            setIsDataLoading(false);
        }
    };

    return (
        <CommonBlock>
            <Header>
                <div className="header-block">
                    <div className="header-block-left">
                        <Link href={PATH_DASHBOARD.rider.dashboard}>
                            <img
                                alt="back-arrow"
                                src="/back-arrrow-header.svg"
                            />
                        </Link>
                        <div className="header-menu-block">
                            <span>
                                {moment(selectedDate).format("dddd DD.MM.YYYY")}
                            </span>
                        </div>
                    </div>
                </div>
            </Header>

            <div className="common-block-ryder">
                {isLoading || isDataLoading ? (
                    <Loader />
                ) : updatedShifts?.length > 0 ? (
                    updatedShifts?.map((shift) => (
                        <div className="shift-common-block" key={shift.id}>
                            <h2>{t("overview")}</h2>
                            <div className="shift-common-block-time">
                                <p>{t("startOfShift")}</p>
                                <span>
                                    {moment(shift?.ts_start_planned).format(
                                        "H:mm A",
                                    )}
                                </span>
                            </div>
                            <div className="shift-location">
                                <p>{getAddressFromObj(shift?.address)}</p>
                                <div className="shift-location-link">
                                    <img src="/map-pin.svg" />
                                    <img src="/arrow-drop.svg" />
                                </div>
                            </div>
                            <div className="info-block-last">
                                <img src="/notifiaction-block.svg" />
                                <p>{t("planShiftNote")}</p>
                            </div>
                        </div>
                    ))
                ) : null}
            </div>
        </CommonBlock>
    );
};

export default PlannedShiftView;
