"use client";

import React, { useCallback, useMemo } from "react";
import Link from "next/link";

import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import { PATH_DASHBOARD, RIDER_AFTER_LOGIN } from "@/routes/paths";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { authState } from "@/redux/Auth/AuthSlice";
import { logoutAction } from "@/redux/Auth/action";
import { encodeData } from "@/utils/jwt";

const RiderProfileView = () => {
    // ** Hooks
    const { t } = useTranslation("common");
    const { userData } = useSelector(authState);
    const dispatch = useDispatch();

    // ** Constants
    const MENUS = useMemo(
        () => [
            {
                id: "profile",
                label: t("Profile"),
                icon: "/user-profile.svg",
                path: `${PATH_DASHBOARD.rider.selectLocations}?redirectTo=${encodeData(PATH_DASHBOARD.rider.editProfile)}`,
            },
            {
                id: "faq",
                label: t("faq"),
                icon: "/user-profile-2.svg",
                path: PATH_DASHBOARD.rider.faq,
            },
            {
                id: "help",
                label: t("help"),
                icon: "/user-profile-1.svg",
                path: PATH_DASHBOARD.rider.help,
            },
            {
                id: "logout",
                label: t("Logout"),
                icon: "/user-profile.svg",
                path: "#",
            },
        ],
        [t],
    );

    // ** Helpers
    const handleLogout = useCallback(async () => {
        dispatch(logoutAction());
    }, [dispatch]);

    return (
        <CommonBlock>
            <Header>
                <div className="header-block">
                    <div className="header-block-left">
                        <Link href={RIDER_AFTER_LOGIN}>
                            <img
                                alt="back-arrow"
                                src="/back-arrrow-header.svg"
                            />
                        </Link>
                    </div>
                    <div className="header-block-right">
                        {/* <button className="btn btn-header">
                            {t("save_changes")}
                        </button> */}
                    </div>
                </div>
            </Header>
            <div className="common-block-ryder">
                <div className="profile-block-inner">
                    <div className="profile-details">
                        <h2>{`${userData?.firstname + " " + userData?.lastname}’s ${t("Profile")}`}</h2>
                        <p>{userData?.email}</p>
                    </div>
                    <div className="profile-link">
                        {MENUS.map((item) => (
                            <div
                                className="profile-link-inner"
                                key={item.id}
                                onClick={() =>
                                    item.id === "logout" && handleLogout()
                                }
                            >
                                <Link href={item.path || "#"}>
                                    <div className="profile-icon-text">
                                        <img
                                            src={item.icon}
                                            alt={`${item.id}-logo`}
                                        />
                                        <span>{item.label}</span>
                                    </div>
                                    <img src="/Icon-profile.svg" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CommonBlock>
    );
};

export default RiderProfileView;
