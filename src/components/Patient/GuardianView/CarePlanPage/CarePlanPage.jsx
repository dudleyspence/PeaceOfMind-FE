import React from "react";
import { useState } from "react";
import RoutineList from "./RoutineList";
import CarerInfoCard from "./PatientCarerInfoCard";
import { CreateTaskContainer } from "./CreateTaskContainer";
import { ViewSchedule } from "./ViewSchedule";

export default function CarePlanPage({ patient }) {
  const [taskUpdates, setTaskUpdates] = useState(false);

  return (
    <div className="p-2 flex flex-col items-center">
      <CarerInfoCard carer={patient.carers[0]} />
      <div className="w-full flex flex-row justify-evenly items-center mt-4">
        <CreateTaskContainer
          taskUpdates={taskUpdates}
          setTaskUpdates={setTaskUpdates}
          patient={patient}
        />
        <ViewSchedule
          taskUpdates={taskUpdates}
          setTaskUpdates={setTaskUpdates}
          patient_id={patient._id}
        />
      </div>
      <RoutineList
        taskUpdates={taskUpdates}
        setTaskUpdates={setTaskUpdates}
        patient_id={patient._id}
      />
    </div>
  );
}
