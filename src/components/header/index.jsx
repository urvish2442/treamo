"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Header = ({ isLogin }) => {
    const pathname = usePathname();
    const isHomePage =
        pathname === "/login" ||
        pathname === "/register" ||
        pathname == "/resetPassword" ||
        pathname == "/forgotPassword";
    return (
        <>
            <div className="page-div">
                <div className="header-div">
                    <Image
                        className="relative"
                        src="/images/traemo_logo.svg"
                        alt="header"
                        width={135}
                        height={40}
                    />
                </div>
            </div>
        </>
    );
};

export default Header;
