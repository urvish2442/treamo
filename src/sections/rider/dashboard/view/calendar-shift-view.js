"use client";

import React, { useMemo } from "react";

import CommonBlock from "@/components/styles/ryder.style";
import Header from "@/components/styles/ryderHeader.style";
import ProfilePopover from "@/components/common/ProfilePopover";

import CalendarShift from "../calendar-shift";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { PATH_DASHBOARD } from "@/routes/paths";

const CalendarShiftView = () => {
    // ** Hooks
    const { t } = useTranslation("common");
    const { push } = useRouter();

    // ** Render
    const renderHeader = useMemo(
        () => (
            <Header>
                <div className="header-block">
                    <div className="header-block-left">
                        <div
                            className="error-block"
                            onClick={() => push(PATH_DASHBOARD.rider.errors)}
                        >
                            <img src="/error-img.png" />
                            <span>{t("errors")}</span>
                        </div>
                    </div>
                    <div className="header-block-right">
                        <ProfilePopover />
                    </div>
                </div>
            </Header>
        ),
        [t, push],
    );

    return (
        <CommonBlock>
            {renderHeader}
            <CalendarShift />
        </CommonBlock>
    );
};

export default CalendarShiftView;
