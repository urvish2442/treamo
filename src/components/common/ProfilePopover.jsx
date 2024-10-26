"use client";

import { USER_ROLES, roleRouteMap } from "@/constants/keywords";
import useElementOutsideClick from "@/hooks/useElementOutsideClick";
import { authState } from "@/redux/Auth/AuthSlice";
import { logoutAction } from "@/redux/Auth/action";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRouter } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const ProfilePopover = () => {
    // ** States
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    // ** Hooks
    const { t } = useTranslation("common");
    const { userData } = useSelector(authState);
    const { push } = useRouter();
    const ref = useRef();
    const dispatch = useDispatch();

    useElementOutsideClick(ref, () => setProfileDropdownOpen(false));

    // ** Constants
    const MENUS = useMemo(
        () => [
            {
                id: "profile",
                label: t("Profile"),
                path:
                    userData.roles === USER_ROLES.RIDER
                        ? PATH_DASHBOARD.rider.profile
                        : roleRouteMap[userData.roles],
                icon: "/images/ic_profile.svg",
            },
            {
                id: "logout",
                label: t("Logout"),
                path: "#",
                icon: "/logout-icon.svg",
            },
        ],
        [t, userData],
    );

    // ** Handlers
    const onMenuClick = (item) => {
        if (item.id === "logout") {
            dispatch(logoutAction());
        }
        setProfileDropdownOpen(false);
        push(item.path);
    };

    return (
        <>
            <button
                className="profile-btn"
                onClick={() => setProfileDropdownOpen(true)}
            >
                <span>{`${userData?.firstname} ${userData?.lastname}`}</span>
                <img alt="user-icon" src="/icon-arrow-block.png" />
            </button>
            {isProfileDropdownOpen && (
                <div
                    ref={ref}
                    className="absolute z-40 right-8 top-[85px] w-[240px] bg-white border-[1px] br-[8px] rounded-lg px-4 shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)]"
                >
                    <ul className="py-4">
                        {MENUS.map((item) => (
                            <li
                                className="full-block-link flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent"
                                key={item.id}
                                onClick={() => onMenuClick(item)}
                            >
                                <button style={{ cursor: "pointer" }}>
                                    <img className="h-6 w-6" src={item.icon} />
                                    <span className="font-inter text-black text-[16px]">
                                        {item.label}
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default ProfilePopover;
