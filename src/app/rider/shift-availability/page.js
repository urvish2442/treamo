/** @format */

"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import { DayPicker } from "react-day-picker";
import { es, de } from "react-day-picker/locale";
const ShiftAvailablity = () => {
    const dropdownRef = useRef(null);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    useEffect(() => {
        window.addEventListener("click", function (e) {
            if (document.getElementById("clickbox")) {
                if (document.getElementById("clickbox").contains(e.target)) {
                    setProfileDropdownOpen(true);
                } else {
                    setProfileDropdownOpen(false);
                }
            } else {
                setProfileDropdownOpen(false);
            }
        });
    }, []);
    const [selected, setSelected] = useState(new Date());
    const modifiers = {
        // closed: closedDays,
        // weekend: weekendDays,
        // open: openDays,
    };
    const modifiersClassNames = {
        closed: "my-closed-day",
        weekend: "my-weekend-day",
        open: "my-open-day",
    };

    const modifiersStyles = {
        closed: { color: "white", backgroundColor: "#f00" },
        weekend: { color: "#7734EB", backgroundColor: "#F0F0FF" },
    };
    // const closedDays = [new Date(2024, 9, 11), new Date(2024, 9, 12)];

    // const weekendDays = [new Date(2024, 9, 18), new Date(2024, 9, 19)];

    // const openDays = [new Date(2024, 9, 25), new Date(2024, 9, 26)];
    return (
        <CommonBlock>
            <Header>
                <div className="header-block">
                    <div className="header-block-left">
                        <div className="error-block">
                            <img src="/error-img.png" />
                            <span>Fehler</span>
                        </div>
                    </div>
                    <div className="header-block-right">
                        <button className="profile-btn" id="clickbox">
                            <span>Anwar Raza</span>
                            <img alt="" src="/icon-arrow-block.png" />
                        </button>
                    </div>
                </div>
            </Header>
            {isProfileDropdownOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute z-40 right-8 top-[85px] w-[240px] bg-white border-[1px] br-[8px] rounded-lg px-4 shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)]"
                >
                    <ul className="py-4">
                        <li className="full-block-link flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent">
                            <button
                                // onClick={() => router.push("/hubmanager/editprofile")}
                                style={{ cursor: "pointer" }}
                            >
                                <img
                                    className="h-6 w-6"
                                    src="/images/ic_profile.svg"
                                />
                                <span className="font-inter text-black text-[16px]">
                                    Profile
                                </span>
                            </button>
                        </li>

                        <li className="full-block-link flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent">
                            <button style={{ cursor: "pointer" }}>
                                <img
                                    className="h-6 w-6"
                                    src="/logout-icon.svg"
                                />
                                <span className="font-inter text-black text-[16px]">
                                    Logout
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
            <div className="common-block-ryder">
                <div className="shift-common-calender">
                    <div className="btn-calender">
                        <button className="btn-block-calender">
                            <img
                                src="/plus-icon-calender.png"
                            />
                            <span>Verfügbarkeit hinzufügen</span>
                        </button>
                    </div>
                    <div className="calender-block">
                        <DayPicker
                            mode="single"
                            selected={selected}
                            // onSelect={setSelected}
                            // month={new Date(2024, 9)}
                            numberOfMonths={3}
                            // pagedNavigation
                            modifiers={modifiers}
                            // modifiersStyles={modifiersStyles}
                            modifiersClassNames={modifiersClassNames}
                            locale={de}
                        />
                    </div>
                </div>
                <div className="label-block-close">
                    <div className="label-block-close-block">
                        <div className="label-block-close-block-flex">
                            <div className="label-block-close-inner avilable-layer">
                                <span></span>
                                <h3>Verfügbar</h3>
                            </div>
                        </div>
                        <div className="label-block-close-block-flex">
                            <div className="label-block-close-inner proven-block">
                                <span></span>
                                <h3>Belegt</h3>
                            </div>
                        </div>
                        <div className="label-block-close-block-flex">
                            <div className="label-block-close-inner requested-block">
                                <span></span>
                                <h3>Angefragt</h3>
                            </div>
                        </div>
                        <div className="label-block-close-block-flex">
                            <div className="label-block-close-inner layer-block">
                                <span></span>
                                <h3>Schicht</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </CommonBlock>
    );
};

export default ShiftAvailablity;
