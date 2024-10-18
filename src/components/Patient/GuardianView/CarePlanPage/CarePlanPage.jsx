import React from "react";
import { useState } from "react";
import RoutineList from "./RoutinePlan/RoutineList";
import CarerInfoCard from "./PatientCarerInfoCard";
import { CreateTaskContainer } from "./CreateTaskContainer";
import { ViewSchedule } from "./SchedulePlan/ViewSchedule";
import { useSelector } from "react-redux";
import { Button } from "@material-tailwind/react";
import {
  selectPatient,
  selectPatientCarer,
} from "../../../../state/slices/patientSlice";

export default function CarePlanPage() {
  const patient = useSelector(selectPatient);

  return (
    <div className="p-2 flex flex-col items-center !max-w-[450px] w-full">
      <CarerInfoCard />
      <div className="w-full flex flex-row gap-8 justify-between items-center mt-4">
        <CreateTaskContainer patient={patient} />
        <ViewSchedule patient_id={patient._id} />
      </div>
      <RoutineList patient_id={patient._id} />
    </div>
  );
}
