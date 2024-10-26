"use client";
import RoleBasedGuard from "@/components/guards/RoleBasedGuard";
import CommonHeader from "@/components/layout/commonHeader/CommonHeader";
import { USER_ROLES } from "@/constants/keywords";
import { getCategoryListAction, GetHubListAction } from "@/redux/Auth/action";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const HubManagerLayout = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategoryListAction());
        dispatch(GetHubListAction());
    }, []);
    return (
        <>
            <RoleBasedGuard requiredRole={USER_ROLES.HUB_MANAGER}>
                <CommonHeader />
                {children}
            </RoleBasedGuard>
        </>
    );
};

export default HubManagerLayout;
