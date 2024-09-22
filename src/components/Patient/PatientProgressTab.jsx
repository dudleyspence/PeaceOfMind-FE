import React from "react";
import { PatientProgressBar } from "./PatientProgressBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProgressTab({ patient_id }) {
  const navigate = useNavigate();
  const [today, setToday] = useState("");

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate());
    setToday(date.toISOString());
  }, [patient_id]);

  function handleClick() {
    navigate(`/patient/${patient_id}/${today}`);
  }

  return (
    <div
      className="bg-green-200 p-5 rounded-lg max-w-96 text-black"
      onClick={handleClick}
    >
      <h1>Todays Progress</h1>
      <PatientProgressBar />
    </div>
  );
}
