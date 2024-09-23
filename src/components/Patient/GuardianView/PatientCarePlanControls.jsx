import { Button } from "@material-tailwind/react";
import React from "react";
import { CreateTaskContainer } from "./CreateTaskContainer";

export default function PatientCarePlanControls() {
  return (
    <div className="w-full flex flex-row justify-evenly items-center mt-4">
      <CreateTaskContainer />
      <Button className="text-sm">View Schedule</Button>
    </div>
  );
}