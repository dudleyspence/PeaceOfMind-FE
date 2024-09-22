import React from "react";
import { DayList } from "./DayList";

export default function SelectCareDay({ patient_id }) {
  return (
    <div className="bg-purple-100 p-5 rounded-lg shadow-lg w-full max-w-sm">
      <DayList patient_id={patient_id} />
    </div>
  );
}
