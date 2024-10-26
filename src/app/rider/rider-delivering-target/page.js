/** @format */

"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import { DayPicker } from "react-day-picker";
import { es, de } from "react-day-picker/locale";
const ShiftCommisioning = () => {
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
                        <div className="order-btn">
                            <p>
                                Order: <span>ab12-cd34</span>
                            </p>
                        </div>
                    </div>
                    <div className="header-block-right">
                        <button className="save-btn-block">
                            + Tüte hinzufügen
                        </button>
                    </div>
                </div>
            </Header>
            <div className="common-block-ryder">
                <div className="commising-main">
                    <div className="commising-block">
                        <div className="commising-product-block">
                            <div className="commising-product-block-inner">
                                <div className="top-img-block">
                                    <div className="img-block">
                                        <div className="img-block-inner">
                                            <img src="/cheeseball.png" />
                                        </div>
                                    </div>
                                    <div className="top-img-block-text">
                                        <h3>Käsebrötchen</h3>
                                        <div className="top-img-block-text-inner">
                                            <p>12 pieces ( 500g )</p>
                                            <div className="top-img-block-text-pm">
                                                <span>0/</span>
                                                <span>1</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="plus-minus-button">
                                    <div className="plus-minus-button-inner">
                                        <button className="minus-btn">
                                            <img src="/minus-icon-rider.svg" />
                                        </button>
                                    </div>
                                    <div className="plus-minus-button-inner">
                                        <button className="plus-btn">
                                            <img src="/plus-icon-rider.svg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="commising-product-block">
                            <div className="commising-product-block-inner">
                                <div className="top-img-block">
                                    <div className="img-block">
                                        <div className="img-block-inner">
                                            <img src="/cheeseball.png" />
                                        </div>
                                    </div>
                                    <div className="top-img-block-text">
                                        <h3>Käsebrötchen</h3>
                                        <div className="top-img-block-text-inner">
                                            <p>12 pieces ( 500g )</p>
                                            <div className="top-img-block-text-pm">
                                                <span>0/</span>
                                                <span>1</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="plus-minus-button">
                                    <div className="plus-minus-button-inner">
                                        <button className="minus-btn">
                                            <img src="/minus-icon-rider.svg" />
                                        </button>
                                    </div>
                                    <div className="plus-minus-button-inner">
                                        <button className="plus-btn">
                                            <img src="/plus-icon-rider.svg" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="commising-bottombar">
                        <button>Bestellung fertig</button>
                    </div>
                </div>
            </div>
        </CommonBlock>
    );
};

export default ShiftCommisioning;
