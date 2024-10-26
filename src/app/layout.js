"use client";

import { Inter, Rubik, Open_Sans } from "next/font/google";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, usePathname, useServerInsertedHTML } from "next/navigation";
import "./globals.css";
import MainDiv from "@/components/styles/main.style";
import ToastWrapper from "@/components/ToastContainer";
import StyledJsxRegistry from "./registry";
import { persistor, store } from "@/redux/store";
import { Provider } from "react-redux";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { SessionProvider } from "next-auth/react";
import ProtectedPageService from "@/services/protectedPage";
import { PersistGate } from "redux-persist/integration/react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/i18n";
import "moment/locale/de";

const inter = Inter({
    variable: "--font-inter",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});
const open_sans = Open_Sans({ subsets: ["latin"] });
const rubik = Rubik({
    variable: "--font-rubik",
    subsets: ["latin"],
});

export default function RootLayout({ children }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

    useServerInsertedHTML(() => {
        const styles = styledComponentsStyleSheet.getStyleElement();
        styledComponentsStyleSheet.instance.clearTag();
        return <>{styles}</>;
    });

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/images/logo.png" />
                <title>Traemo</title>
            </head>
            <I18nextProvider i18n={i18n}>
                <body>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <MainDiv>
                                <StyledJsxRegistry>
                                    <ProtectedPageService />
                                    <ToastWrapper />
                                    {children}
                                </StyledJsxRegistry>
                            </MainDiv>
                        </PersistGate>
                    </Provider>
                </body>
            </I18nextProvider>
        </html>
    );
}
