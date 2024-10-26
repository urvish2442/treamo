import React from "react";
import { ThreeDots } from "react-loader-spinner";

const ComponentLoader = ({ size = 80, isFullPage = false }) => {
    return (
        <div
            className={`h-full z-10 ${isFullPage ? "bg-black bg-opacity-30" : ""}`}
        >
            <div>
                <div className="bg-transparent p-4 rounded-lg">
                    <ThreeDots
                        visible={true}
                        height={size}
                        width={size}
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
};

export default ComponentLoader;
