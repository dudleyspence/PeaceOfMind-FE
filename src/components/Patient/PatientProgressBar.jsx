import { Progress, Typography } from "@material-tailwind/react";

export function PatientProgressBar({ percentageCompleted = 0 }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-4">
        <Typography color="blue-gray" variant="h6">
          Completed
        </Typography>
        <Typography color="blue-gray" variant="h6">
          {Math.round(percentageCompleted)}%
        </Typography>
      </div>
      <Progress value={percentageCompleted} />
    </div>
  );
}
