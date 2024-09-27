import React from "react";
import { Button, Input, Alert, Typography } from "@material-tailwind/react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postTask } from "../../../../axios/task.axios";
import { formatISO } from "date-fns";

export function CreateDaySpecificTask({
  open,
  setOpen,
  patient,
  setShowAlert,
  setTaskUpdates,
}) {
  const [taskText, setTaskText] = useState("");
  const [scheduledDate, setScheduledDate] = useState(null);

  function handleTextChange(event) {
    setTaskText(event.target.value);
  }

  function handlePostDaySpecificTask() {
    if (taskText && scheduledDate) {
      setShowAlert(false);
      const template = {
        text: taskText,
        isDaySpecific: true,
        nextInstanceDate: formatISO(scheduledDate),
        patient: patient._id,
        carer: patient.carers[0]._id,
        guardian: patient.guardians[0]._id,
      };
      const instance = {
        scheduleDate: formatISO(scheduledDate),
        carer: patient.carers[0]._id,
        patient: patient._id,
      };
      const task = { taskTemplate: template, taskInstance: instance };
      postTask(task).then(() => {
        setTaskUpdates(true);
        setOpen(!open);
      });
    } else {
      setShowAlert(true);
    }
  }

  function handleClear() {
    setTaskText("");
    showAlert(false);
    setScheduledDate(null);
  }

  return (
    <>
      <form className="space-y-4 pb-2 overflow-scroll">
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Task*
          </Typography>
          <Input
            required={true}
            onChange={handleTextChange}
            color="gray"
            size="md"
            name="name"
            value={taskText}
            className="
              !border-t-gray-600
              border-gray-600
              focus:!border-gray-900
              text-[13px]"
            containerProps={{
              className: "!min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
          />
        </div>

        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Scheduled Date*
          </Typography>
          <ReactDatePicker
            required={true}
            showTimeSelect
            timeIntervals={10}
            minDate={new Date()}
            selected={scheduledDate}
            onChange={(selectedDate) => setScheduledDate(selectedDate)}
            dateFormat="PPPp"
            customInput={
              <Input
                label="Select Date"
                value={scheduledDate ? scheduledDate : ""}
                style={{ fontSize: "12px" }}
              />
            }
            popperContainer={({ children }) => (
              <div className="z-[9999]">{children}</div>
            )}
          />
        </div>

        <div className="flex flex-row justify-evenly">
          <Button onClick={handleClear} className="text-sm">
            Clear
          </Button>
          <Button onClick={handlePostDaySpecificTask} className="text-sm">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
