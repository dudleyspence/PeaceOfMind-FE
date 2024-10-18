import React from "react";
import { PatientProgressBar } from "./PatientProgressBar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatISO } from "date-fns";

export default function ProgressTab({ completionPercentage }) {
  const navigate = useNavigate();
  const [isoFormatDate, setIsoFormatDate] = useState("");
  const [displayDate, setDisplayDate] = useState("");
  const { patient_id, isoDate } = useParams();

  useEffect(() => {
    if (!isoDate) {
      const date = new Date();
      setIsoFormatDate(formatISO(date));
      setDisplayDate("today");
    } else {
      const date = new Date(isoDate);
      setIsoFormatDate(formatISO(date));
      setDisplayDate(date.toDateString());
    }
  }, [patient_id]);

  function handleClick() {
    if (isoFormatDate) {
      navigate(`/patient/${patient_id}/${isoFormatDate}`);
    }
  }

  return (
    <div
      className="bg-green-200 p-5 rounded-lg text-black w-full"
      onClick={handleClick}
    >
      <h1>Progress for {displayDate}</h1>
      <PatientProgressBar completionPercentage={completionPercentage} />
    </div>
  );
}
