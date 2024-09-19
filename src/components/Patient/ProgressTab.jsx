import React from "react";
import { ProgressBar } from "../General/ProgressBar";

export default function ProgressTab() {
  return (
    <div className="bg-green-200 p-5">
      <h1>Todays Progress</h1>
      <ProgressBar />
    </div>
  );
}
