"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import Select from "react-select";
import { API_ROUTER } from "@/services/apiRouter";
import { axiosGet } from "@/services/axiosHelper";
import { GetHubByIdService } from "@/services/riderService";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRouter } from "next/navigation";
import ProfilePopover from "@/components/common/ProfilePopover";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { CloseIcon } from "@/assets/svgs";

const PerShift = () => {
    const dropdownRef = useRef(null);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [hubData, setHubData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [address, setAddress] = useState("");
    const { t } = useTranslation("common");
    // const shiftHubId = useSelector((state) => state.shiftData.shiftHubId);
    const shiftObj = useSelector((state) => state.shiftData.shiftObjData);
    // const shiftTime = useSelector((state) => state.shiftData.shiftTime);
    const shiftTime = shiftObj?.ts_start_planned; // "2024-10-24T13:54:00Z";
    console.log("shiftObj", shiftObj);
    const [isButtonEnabled, setIsButtonEnabled] = useState(false);
    const { push } = useRouter();
    const getHubById = async (shiftId) => {
        try {
            setIsLoading(true);
            const { data } = await GetHubByIdService(shiftId);
            console.log("data-->", data);

            if (data) {
                setHubData(data);
                let address = data.address;
                setAddress(
                    `${address?.house}, ${address?.street}, ${address?.city}, ${address?.country}`,
                );
            }
        } catch (error) {
            console.error("Error fetching shifts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getHubById(shiftObj?.hub_id);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const isAllow = isAllowedToPunchIn(shiftTime);
            console.log("isAllow", isAllow);

            setIsButtonEnabled(isAllow);
        }, 6000);
        console.log("interval", interval);
        return () => clearInterval(interval);
    }, []);

    const isAllowedToPunchIn = (startTime) => {
        console.log("startTime----", startTime);

        const currentTime = new Date().toISOString();
        console.log("currentTime----", currentTime);
        const targetPunchTime = new Date(startTime);
        console.log("targetPunchTime----", targetPunchTime);
        const allowedTime = new Date(
            targetPunchTime.getTime() - 10 * 60 * 1000,
        ).toISOString();
        console.log("allowedTime", allowedTime);

        console.log("currentTime >= allowedTime", currentTime >= allowedTime);
        return currentTime >= allowedTime;
    };

    return (
        <CommonBlock>
            <Header>
                <div className="header-block">
                    <div className="header-block-left">
                        <div
                            className="error-block"
                            onClick={() => push(PATH_DASHBOARD.rider.errors)}
                        >
                            <img src="/error-img.png" />
                            <span>{t("errors")}</span>
                        </div>
                    </div>
                    <div className="header-block-right">
                        <ProfilePopover />
                    </div>
                </div>
            </Header>
            <div className="common-block-ryder">
                <div className="shift-common-block">
                    <div className="shift-common-time">
                        <h2>Schichtbeginn</h2>
                        <span>4:00 Uhr</span>
                    </div>
                    <div className="shift-location">
                        <p>{address}</p>
                        <div className="shift-location-link">
                            <img src="/map-pin.svg" />
                            <img src="/arrow-drop.svg" />
                        </div>
                    </div>
                    <div
                        className={`btn-block-shift ${isButtonEnabled ? "checked" : ""}`}
                    >
                        <button
                            disabled={!isButtonEnabled}
                            onClick={() =>
                                push(PATH_DASHBOARD.rider.preShiftsIdle)
                            }
                        >
                            <img src="/timer-button.svg" />
                            <span>Schicht beginnen</span>
                        </button>
                    </div>
                </div>
            </div>
        </CommonBlock>
    );
};

export default PerShift;
