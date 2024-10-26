"use client";

import React from "react";

import RoleBasedGuard from "@/components/guards/RoleBasedGuard";
import { USER_ROLES } from "@/constants/keywords";
import MapLoaderProvider from "@/context/map-loader-context";

const RiderLayout = ({ children }) => {
    return (
        <>
            <RoleBasedGuard requiredRole={USER_ROLES.RIDER}>
                <MapLoaderProvider>
                    {/* <Header /> */}
                    {children}
                </MapLoaderProvider>
            </RoleBasedGuard>
        </>
    );
};

export default RiderLayout;
