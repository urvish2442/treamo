/** @type {import('next').NextConfig} */
const { i18n } = require("./src/next-i18next.config");

module.exports = {
    i18n,
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
    compiler: {
        styledComponents: true,
    },
    debug: process.env.NODE_ENV === "development",
    env: {
        NEXT_APP_HOST_API: process.env.NEXT_APP_HOST_API,
        NEXT_APP_MAP_API_KEY: process.env.NEXT_APP_MAP_API_KEY,
        // SECRET_KEY: process.env.SECRET_KEY,
        // GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        // GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        // NEXT_APP_GOOGLE_LOCATION: process.env.NEXT_APP_GOOGLE_LOCATION,
    },
    // serverRuntimeConfig: {
    //   NEXT_PUBLIC_PROJECT_ENV: process.env.NEXT_PUBLIC_PROJECT_ENV,
    //   SECRET_KEY: process.env.SECRET_KEY,
    //   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    //   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    //   NEXT_APP_GOOGLE_LOCATION: process.env.NEXT_APP_GOOGLE_LOCATION,
    // },
    // publicRuntimeConfig: {
    //   NEXT_PUBLIC_PROJECT_ENV: process.env.NEXT_PUBLIC_PROJECT_ENV,
    //   SECRET_KEY: process.env.SECRET_KEY,
    //   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    //   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    //   NEXT_APP_GOOGLE_LOCATION: process.env.NEXT_APP_GOOGLE_LOCATION,
    // },
    // images: {
    //   domains: ["fetishfinder-media.dryrun.click"],
    // },
    reactStrictMode: false,
    // images: {
    //   remotePatterns: [
    //     {
    //       protocol: "https",
    //       hostname: "",
    //       pathname: "**",
    //     },
    //   ],
    // },
};

// export default nextConfig;
