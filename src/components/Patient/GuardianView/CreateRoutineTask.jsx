import React from "react";
import { Input, Option, Select, Typography } from "@material-tailwind/react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export function CreateRoutineTask() {
  const [taskText, setTaskText] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskInterval, setTaskInterval] = useState("");
  const [startDate, setStartDate] = useState();

  console.log(startDate);

  function handleTextChange(event) {
    setTaskText(event.target.value);
  }

  function handleFrequencyChange(value) {
    setTaskInterval(value);
  }

  function handleCategoryChange(value) {
    setTaskCategory(value);
  }

  function handleUpdateTask() {
    const update = {
      text: taskText,
      category: taskCategory,
      repeatInterval: taskInterval,
    };
    updateRecurringTask(task._id, update).then(() => {
      setTaskUpdates(true);
      setOpen(!open);
    });
  }

  const handleOpen = () => setOpen(!open);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <div className="space-y-4 pb-6">
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Task
          </Typography>
          <Input
            onChange={handleTextChange}
            color="gray"
            size="lg"
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
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Category
          </Typography>
          <Select
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
            variant="small"
            color="blue-gray"
            className="mb-2 text-left font-medium"
          >
            Frequency
          </Typography>
          <Select
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
          <ReactDatePicker
            selected={startDate}
            onChange={(selectedDate) => setStartDate(selectedDate)}
            customInput={
              <Input
                label="Routine Start Date"
                value={startDate ? format(startDate, "ppp") : ""}
                style={{ fontSize: "12px" }}
              />
            }
            popperContainer={({ children }) => (
              <div className="z-[9999]">{children}</div>
            )}
          />
        </div>
        <div>
          <ReactDatePicker
            selected={startDate}
            onChange={(selectedDate) => setStartDate(selectedDate)}
            customInput={
              <Input
                label="Routine End Date"
                value={startDate ? format(startDate, "ppp") : ""}
                style={{ fontSize: "12px" }}
              />
            }
            popperContainer={({ children }) => (
              <div className="z-[9999]">{children}</div>
            )}
          />
        </div>
      </div>
    </>
  );
}
