import React from "react";
import { PatientProgressBar } from "./PatientProgressBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PatientProgressTab({
  patient_id,
  chosenDate,
  completionPercentage,
}) {
  const navigate = useNavigate();
  const [isoDate, setIsoDate] = useState("");
  const [day, setDay] = useState("");

  useEffect(() => {
    if (!chosenDate) {
      const date = new Date();
      date.setUTCDate(date.getUTCDate());
      setIsoDate(date.toISOString());
      setDay("today");
    } else {
      const date = new Date(chosenDate);
      setIsoDate(date.toISOString());
      setDay(date.toDateString());
    }
  }, [patient_id]);

  function handleClick() {
    navigate(`/patient/${patient_id}/${isoDate}`);
  }

  return (
    <div
      className="bg-green-200 p-5 rounded-lg max-w-96 text-black"
      onClick={handleClick}
    >
      <h1>Progress for {day}</h1>
      <PatientProgressBar completionPercentage={completionPercentage} />
    </div>
  );
}
