import React from "react";

import RiderShiftsErrorsView from "@/sections/rider/errors/view/shift-errors-view";

export const metadata = {
    title: "Shifts Errors | Traemo",
};

const RiderShiftsErrors = ({ searchParams }) => {
    const { returnTo } = searchParams;
    return <RiderShiftsErrorsView returnTo={returnTo} />;
};

export default RiderShiftsErrors;
