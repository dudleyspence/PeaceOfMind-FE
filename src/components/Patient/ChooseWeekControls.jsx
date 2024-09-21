import React from "react";
import { IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function ChooseWeekControls({ active, setActive }) {
  const prev = () => {
    if (active === 10) return;

    setActive(active + 1);
  };

  const next = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  return (
    <div className="flex flex-row w-full items-center justify-between">
      <IconButton className="p-4" size="sm" variant="outlined" onClick={prev}>
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
      <div className="w-full flex flex-row justify-between mx-4 text-lg">
        <p className="font-bold"> prev</p>
        <p className="font-bold"> next</p>
      </div>
      <IconButton
        className="p-4"
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={active === 1}
      >
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </IconButton>
    </div>
  );
}
