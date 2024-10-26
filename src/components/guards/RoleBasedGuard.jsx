"use client";
import { USER_ROLES } from "@/constants/keywords";
import { authState } from "@/redux/Auth/AuthSlice";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRouter } from "next/navigation";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const RoleBasedGuard = ({ requiredRole, children }) => {
    const { userData } = useSelector(authState);
    const { t } = useTranslation();
    const router = useRouter();

    const handleHomeRoute = () => {
        router.push(PATH_DASHBOARD.root);
    };

    if (!userData || !userData.roles || userData?.roles !== requiredRole) {
        return (
            <div className="flex flex-col flex-wrap h-screen items-center justify-center">
                <h1 className="font-semibold">{t("unauthorizedAccess")}</h1>
                <p>{t("noPermissionMessage")}</p>
                <button
                    onClick={handleHomeRoute}
                    className="bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-white py-2 px-4 border border-yellow-400 hover:border-transparent rounded mt-5"
                >
                    {t("Home")}
                </button>
            </div>
        );
    }

    return <>{children}</>;
};

export default RoleBasedGuard;
