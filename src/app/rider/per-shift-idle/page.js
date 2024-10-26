/** @format */

"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import Select from "react-select";
import { useRouter } from "next/navigation";
import { GetToDoTaskService } from "@/services/riderService";
import Loader from "@/components/Loader";
import { PATH_DASHBOARD } from "@/routes/paths";
import ProfilePopover from "@/components/common/ProfilePopover";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const PerShiftIdle = () => {
    const dropdownRef = useRef(null);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isStart, setIsStart] = useState(true);
    const [todoTaskList, setTodoTaskList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { push } = useRouter();
    const { t } = useTranslation("common");
    const isActiveOrDeliver = useSelector(
        (state) => state?.shiftData?.activeOrDeliver,
    );

    useEffect(() => {
        getToDoTask();
    }, []);

    const getToDoTask = async () => {
        const task = isActiveOrDeliver ? "pre_delivering" : "pre_picking";
        try {
            setIsLoading(true);
            const { data } = await GetToDoTaskService(task);
            console.log("data-->", data);

            if (data) {
                const updatedData = data.map((item, index) => ({
                    ...item,
                    id: index + 1,
                    checked: false,
                }));
                setTodoTaskList(updatedData);
            }
        } catch (error) {
            console.error("Error fetching shifts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCheckboxChange = (index) => {
        const updatedList = todoTaskList.map((item, idx) =>
            idx === index ? { ...item, checked: !item.checked } : item,
        );
        setTodoTaskList(updatedList);
    };

    const areAllChecked = todoTaskList.every((item) => item.checked);

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
            {isLoading ? (
                <Loader />
            ) : (
                <div className="common-block-ryder">
                    <div className="shift-idle-block">
                        <div className="clock-img-block">
                            <img alt="" src="/clock-icon.svg" />
                            <span>02:16</span>
                        </div>
                        <div className="shift-idle-block-inner">
                            {/* todoTaskList */}
                            {todoTaskList.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="shift-idle-block-inner-block"
                                    >
                                        <div className="shift-idle-block-text">
                                            <img
                                                alt=""
                                                src="/calender-icon.svg"
                                            />
                                            <span>{item.title}</span>
                                        </div>
                                        <div className="checkbox-custom">
                                            <div className="form-group">
                                                <input
                                                    type="checkbox"
                                                    id={`rider-${index}`}
                                                    checked={item.checked}
                                                    onChange={() =>
                                                        handleCheckboxChange(
                                                            index,
                                                        )
                                                    }
                                                ></input>
                                                <label
                                                    htmlFor={`rider-${index}`}
                                                ></label>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <div
                            className={`btn-block-shift ${areAllChecked ? "checked" : ""}`}
                        >
                            <button
                                disabled={!areAllChecked}
                                onClick={() => {
                                    console.log("areAllChecked", areAllChecked);

                                    console.log("todoTaskList", todoTaskList);
                                }}
                            >
                                <img src="/start-icon.svg" />
                                <span>Start Kommissionierung</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </CommonBlock>
    );
};

export default PerShiftIdle;
