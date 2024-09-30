import React from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
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
  const [taskNotes, setTaskNotes] = useState("");

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
      if (taskNotes) {
        template.notes = taskNotes;
      }
      const task = { taskTemplate: template, taskInstance: instance };
      postTask(task).then(() => {
        setTaskUpdates(true);
        setOpen(!open);
      });
    } else {
      setShowAlert(true);
    }
  }
  function handleNotesChange(event) {
    setTaskNotes(event.target.value);
  }

  function handleClear() {
    setTaskText("");
    showAlert(false);
    setScheduledDate(null);
    setTaskNotes("");
  }

  return (
    <>
      <form className="space-y-4 pb-2 overflow-visible">
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
              !text-[16px]"
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
            variant="large"
            color="black"
            className="mb-2 text-left font-medium"
          >
            Scheduled Date*
          </Typography>
          <ReactDatePicker
            required={true}
            showTimeSelect
            className="!text-[16px]"
            timeIntervals={10}
            minDate={new Date()}
            selected={scheduledDate}
            onChange={(selectedDate) => setScheduledDate(selectedDate)}
            dateFormat="PPPp"
            customInput={
              <Input
                label="Select Date"
                value={scheduledDate ? scheduledDate : ""}
                style={{ fontSize: "16px" }}
              />
            }
            popperContainer={({ children }) => (
              <div className="z-[9999]">{children}</div>
            )}
          />
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Additional Notes
          </Typography>
          <Textarea
            required={true}
            onChange={handleNotesChange}
            color="gray"
            size="lg"
            name="name"
            value={taskNotes}
            className="
              !border-t-gray-600
              border-gray-600
              focus:!border-gray-900
              !text-[16px]
              overflow-scroll"
            containerProps={{
              className: "!min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
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
