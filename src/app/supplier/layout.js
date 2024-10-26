"use client";
import RoleBasedGuard from "@/components/guards/RoleBasedGuard";
import CommonHeader from "@/components/layout/commonHeader/CommonHeader";
import { USER_ROLES } from "@/constants/keywords";
import { getCategoryListAction, GetHubListAction } from "@/redux/Auth/action";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const SupplierLayout = ({ children }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategoryListAction());
        dispatch(GetHubListAction());
    }, []);
    return (
        <>
            <RoleBasedGuard requiredRole={USER_ROLES.SUPPLIER}>
                <CommonHeader />
                {children}
            </RoleBasedGuard>
        </>
    );
};

export default SupplierLayout;
