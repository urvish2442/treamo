"use client";
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/styles/header.style";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { authState, setUserData } from "@/redux/Auth/AuthSlice";
import { getData } from "@/utils/storage";
import { getUserAction, logoutAction } from "@/redux/Auth/action";
import { USER_ROLES } from "@/constants/keywords";
import { PATH_DASHBOARD } from "@/routes/paths";
import Link from "next/link";

export default function CommonHeader() {
    const { userData } = useSelector(authState);
    const router = useRouter();
    const path = usePathname();
    const dispatch = useDispatch();
    const { t } = useTranslation("common");
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const dropdownRef = useRef(null);
    const [logout, setLogout] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e) => {
            const clickBox = document.getElementById("clickbox");
            if (clickBox && clickBox.contains(e.target)) {
                setProfileDropdownOpen(true);
            } else {
                setProfileDropdownOpen(false);
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    useEffect(() => {
        if (userData?.id) {
            setUser(userData);
            // redirectUser(userData?.roles);
        } else {
            fetchAuthData();
        }
    }, [userData]);

    const fetchAuthData = async () => {
        if (logout) return;
        const tokenData = getData("token");

        if (tokenData?.access_token) {
            const {
                payload: { data },
            } = await dispatch(getUserAction());

            if (data?.id) {
                setUser(data);
                dispatch(setUserData(data));
                // redirectUser(data.roles);
            } else {
                router.push("/");
            }
        } else {
            router.push("/");
        }
    };

    // const redirectUser = (role) => {
    //     const { SUPPLIER, HUB_MANAGER } = USER_ROLES;
    //     const { supplier, hubManager } = PATH_DASHBOARD;
    //     const routes = {
    //         [SUPPLIER]: supplier.dashboard,
    //         [HUB_MANAGER]: hubManager.dashboard,
    //     };
    //     const route = routes[role] || "/";
    //     if (path.includes(role)) return;
    //     router.push(route);
    // };

    const handleLogout = async () => {
        setLogout(true);
        await dispatch(logoutAction());
        // router.push("/");
    };

    const handleProfileClick = () => {
        const route =
            user?.roles === USER_ROLES.HUB_MANAGER
                ? PATH_DASHBOARD.hubManager.editProfile
                : "";

        if (route) {
            router.push(route);
        }
        return;
    };

    return (
        <div className="">
            <Header>
                <div className="header-left">
                    <div className="logo-header">
                        <Link href={`/${user?.roles}/dashboard`}>
                            <img alt="logo" src="/image-1@2x.png" />
                        </Link>
                    </div>
                </div>
                <div className="header-right">
                    <div className="header-right-dropdwon" id="clickbox">
                        <p>
                            {user?.firstname} {user?.lastname}
                        </p>
                        <img
                            className="arrow-icon"
                            alt=""
                            src="/chevrondown-2.svg"
                        />
                    </div>
                </div>
            </Header>
            {isProfileDropdownOpen && (
                <div
                    ref={dropdownRef}
                    className="absolute z-40 right-8 top-[85px] w-[240px] bg-white border-[1px] br-[8px] rounded-lg px-4 shadow-[0px_1px_3px_rgba(16,_24,_40,_0.1),_0px_1px_2px_rgba(16,_24,_40,_0.06)]"
                >
                    <ul className="py-4">
                        <li
                            onClick={handleProfileClick}
                            className="full-block-link flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent cursor-pointer"
                        >
                            <button>
                                <img
                                    className="h-6 w-6"
                                    src="/images/ic_profile.svg"
                                />
                                <span className="font-inter text-black text-[16px]">
                                    {t("Profile")}
                                </span>
                            </button>
                        </li>

                        <li
                            onClick={handleLogout}
                            className="full-block-link flex items-center space-x-2 px-2 py-2 hover:bg-gray-100 mb-2 hover:border hover:border-borderbackground rounded-md border border-transparent cursor-pointer"
                        >
                            <button>
                                <img
                                    className="h-6 w-6"
                                    src="/logout-icon.svg"
                                />
                                <span className="font-inter text-black text-[16px]">
                                    {t("Logout")}
                                </span>
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
