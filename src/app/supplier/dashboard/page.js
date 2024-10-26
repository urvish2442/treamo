/** @format */

"use client";
import { useCallback, useRef, useEffect } from "react";
import React, { useMemo, useState } from "react";
import CommonPageBLockHub from "@/components/styles/supplier.style";
import { useRouter, usePathname, useServerInsertedHTML } from "next/navigation";
import { useTranslation } from "react-i18next";
import HubSelectBox from "@/components/common/hubSelectBox";
import { useHubManagerDashBoard } from "@/hooks/useFetchHooks";
import Loader from "@/components/Loader";
import Link from "next/link";
import { PATH_DASHBOARD } from "@/routes/paths";

const SupplierDashboard = () => {
    const router = useRouter();
    const { t } = useTranslation("common");
    const { loading, data } = useHubManagerDashBoard();

    return (
        <CommonPageBLockHub>
            <div className="common-block-hub">
                <div className="common-block-hub-menu">
                    <ul>
                        <li>
                            <Link
                                href={PATH_DASHBOARD.supplier.dashboard}
                                className="active-link"
                            >
                                {t("Dashboard")}
                            </Link>
                        </li>
                        <li>
                            <Link href={PATH_DASHBOARD.supplier.products.root}>
                                {t("Product")}
                            </Link>
                        </li>
                        <li>
                            <HubSelectBox />
                        </li>
                    </ul>
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <div className="dashboard-block-main">
                        <div className="dashboard-block-main-inner">
                            <div
                                className="dashboard-block-main-inner-block"
                                style={{ width: "100%" }}
                            >
                                <div
                                    className="block-border text-center"
                                    // style={{ padding: "150px 0" }}
                                >
                                    {data?.url ? (
                                        <iframe
                                            width="100%"
                                            height="570px"
                                            src={data?.url}
                                            frameborder="0"
                                            allowfullscreen
                                        ></iframe>
                                    ) : (
                                        t("noDataFound")
                                    )}
                                </div>
                            </div>
                            {/* <div className="dashboard-block-main-inner-block">
                                <div
                                    className="block-border text-center"
                                    style={{ padding: "150px 0" }}
                                >
                                    <h2>{t("UnderDevelopment")}</h2>
                                </div>
                            </div> */}
                        </div>
                    </div>
                )}
            </div>
        </CommonPageBLockHub>
    );
};

export default SupplierDashboard;
