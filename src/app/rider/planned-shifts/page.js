import React from "react";
import PlannedShiftView from "@/sections/rider/planned-shifts/view/planned-shifts-view";

export const metadata = {
    title: "Planned Shifts | Traemo",
};

const PlannedShitsPage = ({ searchParams }) => {
    // ** Constants
    const { date } = searchParams;

    return <PlannedShiftView date={date} />;
};

export default PlannedShitsPage;
