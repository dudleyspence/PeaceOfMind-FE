import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";

export function AddMedicalConditions({
  medicalConditions,
  setMedicalConditions,
}) {
  const [currentMedical, setCurrentMedical] = useState("");

  function handleAddMedicalCondition() {
    if (currentMedical) {
      setMedicalConditions([...medicalConditions, currentMedical]);
      setCurrentMedical("");
    }
  }

  return (
    <div className="relative flex w-full min-w-full">
      <Input
        label="Add Medical Conditions Here"
        size="lg"
        value={currentMedical}
        onChange={({ target }) => setCurrentMedical(target.value)}
        className="pr-20 text-[16px]"
        containerProps={{
          className: "min-w-0",
        }}
      />
      <Button
        size="sm"
        color={currentMedical ? "gray" : "blue-gray"}
        disabled={!currentMedical}
        onClick={handleAddMedicalCondition}
        className="!absolute right-1 top-1 rounded"
      >
        Add
      </Button>
    </div>
  );
}
