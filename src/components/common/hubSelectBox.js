"use client";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useHubData } from "@/hooks/useFetchHooks";

const HubSelectBox = () => {
    const { hubOptions, selectedOption, handleSelectChange } = useHubData();

    return (
        <div className="select-form-block">
            <Select
                onChange={handleSelectChange}
                options={hubOptions}
                value={selectedOption}
                classNamePrefix="react-select"
                className="select-block-fetishes"
            />
        </div>
    );
};

export default HubSelectBox;
