"use client";
import React, { useEffect, useState } from "react";
import PerShift from "../per-shift/page";
import CalendarShiftView from "@/sections/rider/dashboard/view/calendar-shift-view";

import { GetShiftsList } from "@/services/riderService";
import moment from "moment";
import { useRouter } from "next/navigation";
import { PATH_DASHBOARD } from "@/routes/paths";
import PerShiftIdle from "../per-shift-idle/page";
import { useDispatch } from "react-redux";
import {
    resetToInitialState,
    setActiveOrDeliver,
    setShiftHubId,
    setShiftTime,
} from "@/redux/ShiftData/ShiftReducer";
// export const metadata = {
//     title: "Dashboard | Traemo",
// };
const DashboardPage = () => {
    const storeDispatch = useDispatch();
    const [shiftList, setShiftList] = useState([]);
    const { push } = useRouter();

    const [moveToScreen, setMoveToScreen] = useState("");

    useEffect(() => {
        GetShiftList();
    }, []);

    const isTimeDifferenceLessThanFourHours = (plannedTime) => {
        const currentDateUTC = new Date();
        const currentUTCHours = currentDateUTC.getUTCHours();
        const currentUTCMinutes = currentDateUTC.getUTCMinutes();
        const currentTimeInMinutes = currentUTCHours * 60 + currentUTCMinutes;

        const [plannedHours, plannedMinutes] = plannedTime
            .split(":")
            .map(Number);
        const plannedTimeInMinutes = plannedHours * 60 + plannedMinutes;

        const timeDifference = plannedTimeInMinutes - currentTimeInMinutes;
        return timeDifference < 240 && timeDifference > 0;
    };

    useEffect(() => {
        const currentDate = moment.utc().format("YYYY-MM-DD");
        storeDispatch(resetToInitialState());
        for (const shift of shiftList) {
            console.log("shift====", shift);

            const plannedStartDate = moment
                .utc(shift?.ts_start_planned)
                .format("YYYY-MM-DD");
            const plannedTime = moment
                .utc(shift?.ts_start_planned)
                .format("HH:mm");

            if (
                plannedStartDate === currentDate &&
                shift?.status === "ACTIVE_IDLE"
            ) {
                console.log("Setting IdealShiftScreen as route");
                storeDispatch(setActiveOrDeliver(false));
                storeDispatch(setShiftTime(shift?.ts_start_planned));
                setMoveToScreen("preShiftsIdle");
                break;
            } else if (
                plannedStartDate === currentDate &&
                shift?.status === "ACTIVE_PICKING"
            ) {
                console.log("Setting Picking as route");
                // setMoveToScreen("Set Scanner Screen Route Here and manage")
                // setPickingStart(true);
                break;
            } else if (
                plannedStartDate === currentDate &&
                shift?.status === "ACTIVE_DELIVERING"
            ) {
                console.log("Setting IdealShiftScreen as route");
                storeDispatch(setActiveOrDeliver(true));
                storeDispatch(setShiftTime(shift?.ts_start_planned));
                setMoveToScreen("preShiftsIdle");
                break;
            } else if (
                plannedStartDate === currentDate &&
                isTimeDifferenceLessThanFourHours(plannedTime)
            ) {
                console.log("Setting PreShiftScreen as route");
                storeDispatch(setShiftHubId(shift?.hub_id));
                storeDispatch(setShiftTime(shift?.ts_start_planned));
                setMoveToScreen("preShifts");
                break;
            } else {
                console.log("Setting Dashboard as route");
                setMoveToScreen("dashboard");
                break;
            }
        }
    }, [shiftList]);

    const GetShiftList = async () => {
        const yesterday = moment.utc().subtract(1, "days").format("YYYY-MM-DD");
        const tomorrow = moment.utc().add(1, "days").format("YYYY-MM-DD");

        const objParam = {
            offset: 0,
            limit: 30,
            sort_direction: "desc",
            filters: `ts_start_planned$gte${yesterday} and ts_start_planned$lte${tomorrow}`,
        };
        try {
            const { data } = await GetShiftsList(objParam);
            console.log("data-->", data);
            if (data) {
                setShiftList(data);
            }
        } catch (error) {
            console.error("Error fetching shifts:", error);
        } finally {
            // setIsLoading(false);
        }
    };

    return (
        <>
            {moveToScreen === "preShiftsIdle" ? (
                <PerShiftIdle />
            ) : moveToScreen === "preShifts" ? (
                <PerShift />
            ) : moveToScreen === "dashboard" ? (
                <CalendarShiftView />
            ) : (
                <CalendarShiftView />
            )}
        </>
    );
    // return <CalendarShiftView />;
};

export default DashboardPage;
