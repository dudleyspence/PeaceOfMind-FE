import React from "react";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postTask } from "../../../axios/task.axios";
import { formatISO } from "date-fns";

export function CreateRoutineTask({ open, setOpen, patient }) {
  const [taskText, setTaskText] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskInterval, setTaskInterval] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  function handleTextChange(event) {
    setTaskText(event.target.value);
  }

  function handleFrequencyChange(value) {
    setTaskInterval(value);
  }

  function handleCategoryChange(value) {
    setTaskCategory(value);
  }

  function handlePostRoutineTask() {
    console.log("posting");
    const routineTask = {
      text: taskText,
      isDaySpecific: false,
      category: taskCategory,
      repeatInterval: taskInterval,
      startDate: formatISO(startDate),
      patient: patient._id,
      carer: patient.carers[0]._id,
    };
    if (endDate) {
      routineTask.repeatEndDate = endDate;
    }
    const task = { taskTemplate: routineTask };
    postTask(task).then(() => {
      setOpen(!open);
    });
  }

  function handleClear() {
    setTaskText("");
    setTaskCategory(null);
    setTaskInterval(null);
    setStartDate(null);
    setEndDate(null);
  }

  function handleStartDateChange(selectedDate) {
    setStartDate(selectedDate);
    if (selectedDate && endDate && selectedDate > endDate) {
      setEndDate(null);
    }
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
              focus:!border-gray-900"
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
            Category*
          </Typography>
          <Select
            required={true}
            size="md"
            onChange={handleCategoryChange}
            className="!w-full !border-[1.5px] !border-blue-gray-200 bg-white text-gray-800 ring-4 ring-transparent focus:!border-primary focus:!border-blue-gray-900 group-hover:!border-primary"
            placeholder="1"
            value={taskCategory}
            labelProps={{
              className: "hidden",
            }}
          >
            <Option value="Meals">Meals</Option>
            <Option value="Medical">Medical</Option>
            <Option value="Hygiene">Hygiene</Option>
            <Option value="Exercise">Exercise</Option>
            <Option value="Additional">Additional</Option>
          </Select>
        </div>
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Frequency*
          </Typography>
          <Select
            required={true}
            onChange={handleFrequencyChange}
            className="!w-full !border-[1.5px] !border-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent focus:!border-primary focus:!border-blue-gray-900 group-hover:!border-primary"
            placeholder="1"
            value={taskInterval}
            labelProps={{
              className: "hidden",
            }}
          >
            <Option value="Daily">Daily</Option>
            <Option value="Weekly">Weekly</Option>
            <Option value="Biweekly">Biweekly</Option>
            <Option value="Monthly">Monthly</Option>
          </Select>
        </div>

        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Routine Start Date*
          </Typography>
          <ReactDatePicker
            required={true}
            selected={startDate}
            minDate={new Date()}
            onChange={(selectedDate) => handleStartDateChange(selectedDate)}
            dateFormat="PPP"
            customInput={
              <Input
                label="Select Date"
                value={startDate ? startDate : ""}
                style={{ fontSize: "12px" }}
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
            Routine End Date*
          </Typography>
          <ReactDatePicker
            disabled={!startDate}
            selected={endDate}
            minDate={startDate + 1}
            onChange={(selectedDate) => setEndDate(selectedDate)}
            dateFormat="PPP"
            customInput={
              <Input
                label="Select Date"
                value={endDate ? endDate : ""}
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
          <Button onClick={handlePostRoutineTask} className="text-sm">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
