"use client";

import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { PATH_DASHBOARD } from "@/routes/paths";

const NotFoundPage = () => {
    // ** Hooks
    const { t } = useTranslation("common");
    return (
        <div className="h-screen flex items-center justify-center">
            <div class="text-center">
                <h1 class="text-9xl font-bold text-gray-800">404</h1>
                <p class="text-2xl md:text-3xl font-light text-gray-600 mt-4">
                    {t("notFoundHead")}
                </p>
                <p class="text-gray-500 mt-2">{t("notFoundSubHead")}</p>
                <Link
                    href={PATH_DASHBOARD.root}
                    class="mt-6 inline-block text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300"
                    style={{ backgroundColor: "#f9c93c" }}
                >
                    {t("goToHome")}
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
