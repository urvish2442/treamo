"use client";
import React, { useMemo, useState } from "react";

// import { Calendar } from "@nextui-org/calendar";
// import { Calendar } from "@nextui-org/react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
// import "./style.css";

// Closed and weekend dates for each month
const closedDays = [
  new Date(2024, 10, 25), // July 17
  new Date(2024, 9, 15), // July 27
];

const weekendDays = [
  new Date(2024, 10, 25),
  new Date(2024, 9, 11), // July 17
  new Date(2024, 9, 16), // July 27
];

const SupplierDashboard = () => {
  const modifiers = {
    closed: closedDays,
    weekend: weekendDays,
  };
  const modifiersStyles = {
    closed: { color: "white", backgroundColor: "#f00" },
    weekend: { color: "#7734EB", backgroundColor: "#F0F0FF" },
  };
  const [selected, setSelected] = useState(new Date());

  return (
    <div className="container p-[30px] ">
      {/* <a>Calendar</a>
      <div className="flex gap-x-4">
        <Calendar aria-label="Date (No Selection)" visibleMonths={3} />
      </div> */}
      <div style={{ display: "flex", gap: "2rem" }}>
        <div>
          {/* <h3>July</h3> */}
          <DayPicker
            mode="single"
            // selected={selected}
            // onSelect={setSelected}
            // month={new Date(2024, 9)}
            numberOfMonths={3}
            // pagedNavigation
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
          />
        </div>

        {/* <div>
          <h3>August</h3>
          <DayPicker
            month={new Date(2024, 10)}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
          />
        </div>

        <div>
          <h3>September</h3>
          <DayPicker
            month={new Date(2024, 11)}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
          />
        </div> */}
      </div>
    </div>
  );
};

export default SupplierDashboard;
