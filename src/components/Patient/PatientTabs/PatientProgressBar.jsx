import { Progress, Typography } from "@material-tailwind/react";

export function PatientProgressBar({ completionPercentage = 0 }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between gap-4">
        <Typography color="blue-gray" variant="h6">
          Completed
        </Typography>
        <Typography color="blue-gray" variant="h6">
          {Math.round(completionPercentage)}%
        </Typography>
      </div>
      <Progress value={completionPercentage} />
    </div>
  );
}
