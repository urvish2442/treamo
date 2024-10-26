"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";

import CommonBlock from "@/components/styles/ryder.style";
import SelectLocationMap from "../select-location-map";
import useMetaData from "@/hooks/useMetaData";
import { API_ROUTER } from "@/services/apiRouter";
import { TOAST_TYPES } from "@/constants/keywords";
import { PATH_DASHBOARD } from "@/routes/paths";
import Loader from "@/components/Loader";
import { axiosPatch } from "@/services/axiosHelper";
import { authState, setUserData } from "@/redux/Auth/AuthSlice";
import useToaster from "@/hooks/useToaster";
import { useTranslation } from "react-i18next";
import { decodeData } from "@/utils/jwt";

const SelectLocationsView = () => {
    // ** States
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [isChangesSaving, setIsChangesSaving] = useState(false);
    const [redirectPath, setRedirectPath] = useState("");

    // ** Hooks
    const [regionOptions, isOptionsLoading] = useMetaData(
        API_ROUTER.GET_MUNICIPALITY_LIST,
        {
            offset: 0,
            limit: 100,
            sort_direction: "desc",
        },
    );
    const { push, replace } = useRouter();
    const { userData } = useSelector(authState);
    const { toaster } = useToaster();
    const dispatch = useDispatch();
    const { t } = useTranslation("common");
    const searchParams = useSearchParams();

    // ** Effects
    useEffect(() => {
        if (
            userData?.riderDetail?.municipalities?.length > 0 &&
            !selectedRegions.length
        )
            setSelectedRegions(
                userData?.riderDetail?.municipalities?.map(({ id }) => id),
            );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userData]);

    useEffect(() => {
        if (searchParams.get("redirectTo")) {
            let redirectTo = searchParams.get("redirectTo");
            if (redirectTo) {
                redirectTo = decodeData(redirectTo);
                setRedirectPath(redirectTo);
            }
            replace(PATH_DASHBOARD.rider.selectLocations);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    // ** Constants
    const isAnyRegionSelected = useMemo(
        () => selectedRegions.length > 0,
        [selectedRegions],
    );

    // ** Handlers
    const onSelectRegion = useCallback(
        (regionId, isSelected) =>
            setSelectedRegions((prev) =>
                isSelected
                    ? prev.filter((prevId) => prevId !== regionId)
                    : [...prev, regionId],
            ),
        [],
    );

    const onCompleteRegionSelection = useCallback(async () => {
        try {
            setIsChangesSaving(true);
            const regionRes = await axiosPatch(API_ROUTER.UPDATE_RIDER, {
                municipality_ids: selectedRegions,
            });
            setIsChangesSaving(false);
            if (regionRes?.status) {
                toaster(t("regionsUpdateText"), TOAST_TYPES.SUCCESS);
                dispatch(
                    setUserData({
                        ...userData,
                        riderDetail: {
                            ...userData.riderDetail,
                            municipalities: regionRes?.data?.municipalities,
                        },
                    }),
                );
                push(redirectPath || PATH_DASHBOARD.rider.completeProfile);
            } else {
                toaster(
                    regionRes?.message || t("generalErrorText"),
                    TOAST_TYPES.ERROR,
                );
            }
        } catch (error) {
            toaster(t("generalErrorText"), TOAST_TYPES.ERROR);
        }
    }, [selectedRegions, push, dispatch, userData, toaster, t, redirectPath]);

    // ** Return
    if (isOptionsLoading) return <Loader />;

    return (
        <CommonBlock>
            <div className="location-selector">
                <SelectLocationMap
                    onSelectRegion={onSelectRegion}
                    regionOptions={regionOptions || []}
                    selectedRegions={selectedRegions}
                />
                <div className="location-selector-bottom">
                    <div className="location-selector-bottom-inner">
                        <button
                            disabled={!isAnyRegionSelected}
                            onClick={onCompleteRegionSelection}
                        >
                            {isChangesSaving
                                ? t("saving")
                                : isAnyRegionSelected
                                  ? t("finishSelection")
                                  : t("notSelected")}
                        </button>
                    </div>
                </div>
            </div>
        </CommonBlock>
    );
};

export default SelectLocationsView;
