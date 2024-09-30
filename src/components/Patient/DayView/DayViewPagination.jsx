import React from "react";
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate, useParams } from "react-router-dom";
import { formatISO } from "date-fns";

export function DayViewPagination() {
  const { patient_id, isoDate } = useParams();
  const navigate = useNavigate();
  console.log(isoDate);
  const prev = () => {
    const date = new Date(isoDate);
    date.setDate(date.getDate() - 1);
    navigate(`/patient/${patient_id}/${formatISO(date)}`);
  };

  const next = () => {
    const date = new Date(isoDate);
    date.setDate(date.getDate() + 1);
    navigate(`/patient/${patient_id}/${formatISO(date)}`);
  };

  return (
    <div className="flex flex-row w-full items-center justify-between">
      <Button
        className="p-2 flex flex-row items-center justify-center gap-2 text-sm"
        size="sm"
        variant="outlined"
        onClick={prev}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        <p className="font-bold"> prev</p>
      </Button>
      <div>
        <button
          className="cursor-pointer"
          onClick={() => {
            navigate(`/patient/${patient_id}`);
          }}
        >
          Return to patient
        </button>
      </div>
      <Button
        className="p-2 flex flex-row items-center justify-center gap-2 text-sm"
        size="sm"
        variant="outlined"
        onClick={next}
      >
        <p className="font-bold disabled:opacity-10" onClick={next}>
          next
        </p>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
