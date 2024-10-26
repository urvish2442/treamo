/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const { nextui } = require("@nextui-org/theme");

module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        // single component styles
        // "./node_modules/@nextui-org/theme/dist/components/button.js",
        // or you can use a glob pattern (multiple component styles)
        // "./node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input|calendar).js",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                ...colors,
                lightgray: "#F5F5F5",
                fontColor: "#525252",
                titleColor: "#F6F6F6",
                transparent: "transparent",
                gray33: "#333333",
                themeColor: "#FAB300",
                theme: "#FFC93C",
                green00: "#FAB300",
                blue19: "#1976D2",
                redEB: "#EB4335",
                black33: "#333333",
                grayAC: "#ACACAC",
                purpleF3: "#F3E8FF",
                pitchFF: "#FFE2E5",
                yellowFF: "#FFF4DE",
                greenDC: "#DCFCE7",
                subTextColor: "#9d9d9d",
                subTextColor: "#9d9d9d",
                serviceTextColor: "#98A2B3",
                grayE1: "#E1DFDF",
                borderbackground: "#D0D5DD",
            },
        },
        fontFamily: {
            inter: ["var(--font-inter)"],
            poppins: ["var(--font-poppins)"],
        },
        screens: {
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
            "3xl": "1992px",
        },
    },
    plugins: [],
    // plugins: [nextui()],
};
