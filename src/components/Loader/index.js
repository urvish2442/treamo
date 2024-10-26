import React from "react";
import { ThreeCircles, ThreeDots } from "react-loader-spinner";

export default function Loader() {
    return (
        <div className={`h-full z-10 bg-black bg-opacity-30`}>
            {/* <div
      className={`h-full z-10 bg-black bg-opacity-30 ${
        isAuth ? "fixed top-0 left-0 right-0 bottom-0" : ""
      }`}> */}

            <div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{ marginTop: "20%" }}
            >
                <div className="bg-transparent p-4 rounded-lg">
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#FAB300"
                        radius="18"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </div>
        </div>
    );
}
