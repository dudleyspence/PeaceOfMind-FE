import React from "react";
import { Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function SelectCareDayPagination({ active, setActive }) {
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
      <Button
        className="p-2 flex flex-row items-center justify-center gap-2 text-sm"
        size="sm"
        variant="outlined"
        onClick={prev}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
        <p className="font-bold"> prev</p>
      </Button>

      <Button
        className="p-2 flex flex-row items-center justify-center gap-2 text-sm"
        size="sm"
        variant="outlined"
        onClick={next}
        disabled={active === 1}
      >
        <p
          className="font-bold disabled:opacity-10"
          onClick={next}
          disabled={active === 1}
        >
          next
        </p>
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}
