import { Progress, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { getProgress } from "../../axios/index.axios";

export function TodaysPatientProgress({ patient_id }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    getProgress(patient_id).then((progress) => {
      setProgress(progress);
      console.log(progress);
    });
  }, [patient_id]);

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-4">
        <Typography color="blue-gray" variant="h6">
          Completed
        </Typography>
        <Typography color="blue-gray" variant="h6">
          {Math.round(progress)}%
        </Typography>
      </div>
      <Progress value={progress} />
    </div>
  );
}
