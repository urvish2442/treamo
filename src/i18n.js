import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import common_en from "./locales/en/common.json";
import common_de from "./locales/de/common.json";
import moment from "moment";

i18n.use(initReactI18next).init({
    interpolation: { escapeValue: false },
    // lng: "de",
    lng: "en",
    fallbackLng: "en",
    resources: {
        en: { common: common_en },
        de: { common: common_de },
    },
    ns: ["common"],
    defaultNS: "common",
});
moment.locale("de");

export default i18n;
