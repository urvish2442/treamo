import Loader from "@/components/Loader";
import ConfirmationDialog from "@/components/common/ConfirmationDialog";
import {
    SHIFT_STATUS,
    SHIFT_STATUS_ARRAY,
    SHIFT_TYPE,
    TOAST_TYPES,
} from "@/constants/keywords";
import useMetaData from "@/hooks/useMetaData";
import useToaster from "@/hooks/useToaster";
import useToggle from "@/hooks/useToggle";
import { PATH_DASHBOARD } from "@/routes/paths";
import { API_ROUTER } from "@/services/apiRouter";
import { axiosDelete, axiosPost } from "@/services/axiosHelper";
import { encodeData } from "@/utils/jwt";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useRef, useState } from "react";

import { DayPicker } from "react-day-picker";
import { de } from "react-day-picker/locale";
import { useTranslation } from "react-i18next";

const CalendarShift = () => {
    // ** States
    const [selected, setSelected] = useState(new Date());
    const [isAddingAvailability, setIsAddingAvailability] = useState(false);
    const [isRemovingAvailability, setIsRemovingAvailability] = useState(false);

    // ** Hooks
    const availabilityHandler = useToggle();
    const confirmationHandler = useToggle();
    const { t, i18n } = useTranslation("common");
    const { toaster } = useToaster();
    const [shifts, isShiftsLoading] = useMetaData(API_ROUTER.GET_SHIFTS, {
        filters: `ts_start_planned$gt${moment().toISOString()} and ts_start_planned$lt${moment().add(2, "month").endOf("month").toISOString()}`,
        limit: 100,
    });
    const { push } = useRouter();
    const [
        riderAvailabilities,
        isRiderAvailabilitiesLoading,
        fetchRiderAvailabilities,
    ] = useMetaData(API_ROUTER.GET_AVAILABILITIES, {
        filters: `date$gt${moment().toISOString()} and date$lt${moment().add(2, "month").endOf("month").toISOString()}`,
        limit: 100,
    });

    const availabilityToDelete = useRef(null);

    const currentMonths = useMemo(() => {
        return [
            moment().month(),
            moment().add(1, "month").month(),
            moment().add(2, "month").month(),
        ];
    }, []);

    const shiftsData = useMemo(() => {
        const shiftsDataUpdated = {
            available: [],
            accepted: [],
            declined: [],
            requested: [],
        };
        const filteredShifts = shifts?.filter(
            ({ ts_start_planned }) =>
                moment(ts_start_planned).year() === moment().year() &&
                currentMonths.includes(moment(ts_start_planned).month()),
        );
        if (filteredShifts && filteredShifts.length > 0) {
            shiftsDataUpdated.accepted = filteredShifts
                ?.filter(({ status }) => status === SHIFT_STATUS.ACCEPTED)
                ?.map(({ ts_start_planned }) => new Date(ts_start_planned));
            shiftsDataUpdated.requested = filteredShifts
                ?.filter(({ status }) => status === SHIFT_STATUS.REQUESTED)
                ?.map(({ ts_start_planned }) => new Date(ts_start_planned));
            shiftsDataUpdated.declined = filteredShifts
                ?.filter(({ status }) => status === SHIFT_STATUS.DECLINED)
                ?.map(({ ts_start_planned }) => new Date(ts_start_planned));
        }
        if (riderAvailabilities && riderAvailabilities.length > 0) {
            shiftsDataUpdated.available = riderAvailabilities
                .filter(
                    ({ date }) =>
                        moment(date).year() === moment().year() &&
                        currentMonths.includes(moment(date).month()),
                )
                ?.map(({ date }) => new Date(date));
        }

        return shiftsDataUpdated;
    }, [riderAvailabilities, shifts, currentMonths]);

    const isAllowToAddAvailability = useMemo(() => {
        if (selected) {
            const today = moment().startOf("day");
            const formattedDate = moment(selected).startOf("day");
            return formattedDate.isAfter(today);
        } else return false;
    }, [selected]);

    // ** Calendar Status Styles

    const modifiersClassNames = {
        available: "available",
        accepted: "accepted",
        declined: "declined",
        requested: "requested",
    };

    // ** Handlers
    const onAddAvailability = async (selectedDate) => {
        try {
            const payload = {
                date: moment(selectedDate).format("YYYY-MM-DD"),
                prefered_type: SHIFT_TYPE.FULL,
            };
            setIsAddingAvailability(true);
            const addRes = await axiosPost(
                API_ROUTER.CREATE_AVAILABILITIES,
                payload,
            );
            setIsAddingAvailability(false);
            if (!addRes.status) {
                return toaster(
                    addRes?.message || t("generalErrorText"),
                    TOAST_TYPES.ERROR,
                );
            }
            if (addRes.status) {
                toaster(
                    "Availability created successfully!",
                    TOAST_TYPES.SUCCESS,
                );
                availabilityHandler.onFalse();
                fetchRiderAvailabilities({
                    offset: 0,
                    limit: 100,
                    sort_direction: "desc",
                });
            }
        } catch (error) {
            toaster(t("generalErrorText"), TOAST_TYPES.ERROR);
        }
    };

    const onDeleteAvailability = useCallback(
        async (availabilityId) => {
            try {
                if (!availabilityId) return;
                setIsRemovingAvailability(true);
                const res = await axiosDelete(
                    API_ROUTER.DELETE_AVAILABILITY(availabilityId),
                );
                setIsRemovingAvailability(false);

                if (!res.status) {
                    return toaster(
                        res?.message || t("generalErrorText"),
                        TOAST_TYPES.ERROR,
                    );
                }
                if (res.status) {
                    confirmationHandler.onFalse();
                    toaster(
                        "Availability delete successfully!",
                        TOAST_TYPES.SUCCESS,
                    );
                    fetchRiderAvailabilities({
                        offset: 0,
                        limit: 100,
                        sort_direction: "desc",
                    });
                }
            } catch (error) {
                toaster(t("generalErrorText"), TOAST_TYPES.ERROR);
            }
        },
        [fetchRiderAvailabilities, t, toaster, confirmationHandler],
    );

    const onSelectDate = useCallback(
        async (selectedDate) => {
            const isExist = Object.values(shiftsData).some((array) =>
                array.some((date) => {
                    return (
                        moment(date).year() === moment(selectedDate).year() &&
                        moment(date).month() === moment(selectedDate).month() &&
                        moment(date).date() === moment(selectedDate).date()
                    );
                }),
            );

            if (isExist) {
                if (availabilityHandler.value) availabilityHandler.onFalse();

                const isAvailabilityExistOnThisDate = shiftsData.available.some(
                    (date) =>
                        moment(date).year() === moment(selectedDate).year() &&
                        moment(date).month() === moment(selectedDate).month() &&
                        moment(date).date() === moment(selectedDate).date(),
                );

                if (isAvailabilityExistOnThisDate) {
                    const availabilityDetails = riderAvailabilities?.find(
                        ({ date }) =>
                            moment(date).year() ===
                                moment(selectedDate).year() &&
                            moment(date).month() ===
                                moment(selectedDate).month() &&
                            moment(date).date() === moment(selectedDate).date(),
                    );

                    if (availabilityDetails?.id) {
                        availabilityToDelete.current = availabilityDetails?.id;
                        confirmationHandler.onTrue();
                    }
                }
                const isCurrentShiftAccepted = shiftsData.accepted.some(
                    (date) =>
                        moment(date)
                            .startOf("day")
                            .isAfter(moment().startOf("day")),
                );

                if (isCurrentShiftAccepted) {
                    const acceptedShiftDetails = shifts.find(
                        ({ ts_start_planned, status }) =>
                            status === SHIFT_STATUS.ACCEPTED &&
                            moment(ts_start_planned).year() ===
                                moment(selectedDate).year() &&
                            moment(ts_start_planned).month() ===
                                moment(selectedDate).month() &&
                            moment(ts_start_planned).date() ===
                                moment(selectedDate).date(),
                    );

                    if (acceptedShiftDetails) {
                        push(
                            `${PATH_DASHBOARD.rider.plannedShifts}?date=${encodeData(acceptedShiftDetails?.ts_start_planned)}`,
                        );
                    }
                }
            } else {
                availabilityHandler.onTrue();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
            setSelected(selectedDate);
        },
        [
            shiftsData,
            shifts,
            availabilityHandler,
            onDeleteAvailability,
            riderAvailabilities,
            push,
        ],
    );
    const onCloseConfirmation = useCallback(() => {
        confirmationHandler.onFalse();
        availabilityToDelete.current = null;
    }, [confirmationHandler]);

    // ** Renders
    const renderStatus = useMemo(
        () => (
            <div className="label-block-close">
                <div className="label-block-close-block">
                    {SHIFT_STATUS_ARRAY.map((item) => (
                        <div
                            className="label-block-close-block-flex"
                            key={item.value}
                        >
                            <div
                                className={`label-block-close-inner ${item.className}`}
                            >
                                <span></span>
                                <h3>{t(item.label)}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        ),
        [t],
    );

    const renderConfirmation = useMemo(
        () => (
            <ConfirmationDialog
                isOpen={confirmationHandler.value}
                onClose={onCloseConfirmation}
                confirmationText={t("confirmDltAvailability")}
                onConfirm={() =>
                    onDeleteAvailability(availabilityToDelete.current)
                }
                isLoading={isRemovingAvailability}
            />
        ),
        [
            confirmationHandler,
            onCloseConfirmation,
            t,
            onDeleteAvailability,
            isRemovingAvailability,
        ],
    );

    if (isShiftsLoading || isRiderAvailabilitiesLoading) return <Loader />;

    return (
        <div className="common-block-ryder">
            <div className="shift-common-calender">
                {availabilityHandler.value && isAllowToAddAvailability ? (
                    <div className="btn-calender">
                        <button
                            className="btn-block-calender"
                            disabled={isAddingAvailability}
                            onClick={() => onAddAvailability(selected)}
                        >
                            {!isAddingAvailability && (
                                <img src="/plus-icon-calender.png" />
                            )}
                            <span>
                                {t(
                                    isAddingAvailability
                                        ? "adding"
                                        : "addAvailability",
                                )}
                            </span>
                        </button>
                    </div>
                ) : null}
                <div className="calender-block">
                    <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={onSelectDate}
                        numberOfMonths={3}
                        modifiers={shiftsData}
                        modifiersClassNames={modifiersClassNames}
                        locale={i18n.de || de}
                        disabled={{
                            before: new Date(),
                            after: moment().add(2, "month").endOf("month"),
                        }}
                    />
                </div>
                {renderStatus}
                {renderConfirmation}
            </div>
        </div>
    );
};

export default CalendarShift;
