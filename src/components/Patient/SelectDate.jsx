import React from "react";
import { DayList } from "./DayList";

export default function SelectDate({ patient_id }) {
  return (
    <div className="bg-purple-100 p-5 rounded-2xl shadow-lg">
      <p>Select the day:</p>
      <button>History</button>
      <DayList patient_id={patient_id} />
    </div>
  );
}
