"use client";

import moment from "moment";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { i18n } = useTranslation();

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        moment.locale(lang);
        router.push(pathname, pathname, { locale: lang });
    };

    return (
        <div>
            <button
                onClick={() => changeLanguage("en")}
                disabled={i18n.language === "en"}
            >
                EN
            </button>
            <button
                onClick={() => changeLanguage("de")}
                disabled={i18n.language === "de"}
                className="ml-2"
            >
                DE
            </button>
        </div>
    );
};

export default LanguageSwitcher;
