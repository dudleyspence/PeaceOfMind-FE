import React from "react";
import { PatientProgressBar } from "./PatientProgressBar";

export default function ProgressTab() {
  return (
    <div className="bg-green-200 p-5 rounded-lg max-w-96 text-black">
      <h1>Todays Progress</h1>
      <PatientProgressBar />
    </div>
  );
}
