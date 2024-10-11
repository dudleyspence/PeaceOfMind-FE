import React from "react";
import {
  Button,
  Input,
  Option,
  Select,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { postTask } from "../../../../../axios/task.axios";
import { formatISO } from "date-fns";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutineTasks } from "../../../../../state/slices/carePlanSlice";
import { selectPatientCarer } from "../../../../../state/slices/patientSlice";

export function CreateRoutineTask({ open, setOpen, setShowAlert }) {
  const { patient_id } = useParams();
  const [taskText, setTaskText] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskInterval, setTaskInterval] = useState("");
  const [taskNotes, setTaskNotes] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const dispatch = useDispatch();

  const carer = useSelector(selectPatientCarer);

  function handleTextChange(event) {
    setTaskText(event.target.value);
  }

  function handleNotesChange(event) {
    setTaskNotes(event.target.value);
  }

  function handleFrequencyChange(value) {
    setTaskInterval(value);
  }

  function handleCategoryChange(value) {
    setTaskCategory(value);
  }

  function handlePostRoutineTask() {
    if (taskText && taskCategory && taskInterval && startDate) {
      setShowAlert(false);
      const routineTask = {
        text: taskText,
        isDaySpecific: false,
        category: taskCategory,
        repeatInterval: taskInterval,
        nextInstanceDate: formatISO(startDate),
        startDate: formatISO(startDate),
        patient: patient_id,
        carer: carer._id,
      };
      if (endDate) {
        routineTask.repeatEndDate = endDate;
      }
      if (taskNotes) {
        routineTask.notes = taskNotes;
      }

      const task = { taskTemplate: routineTask };
      postTask(task).then(() => {
        dispatch(fetchRoutineTasks(patient_id));
        setOpen(!open);
      });
    } else {
      setShowAlert(true);
    }
  }

  function handleClear() {
    setShowAlert(false);
    setTaskText("");
    setTaskCategory(null);
    setTaskInterval(null);
    setStartDate(null);
    setEndDate(null);
    setTaskNotes("");
  }

  function handleStartDateChange(selectedDate) {
    setStartDate(selectedDate);
    if (selectedDate && endDate && selectedDate > endDate) {
      setEndDate(null);
    }
  }

  return (
    <>
      <form className="space-y-4 pb-2">
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
              !text-[14px]"
            containerProps={{
              className: "!min-w-full",
            }}
            labelProps={{
              className: "hidden",
            }}
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className="w-[45%]">
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
              className="!w-full !border-[1.5px] !border-blue-gray-200 bg-white text-gray-800 ring-4 ring-transparent focus:!border-primary focus:!border-blue-gray-900 group-hover:!border-primary text-[14px]"
              placeholder="1"
              value={taskCategory}
              labelProps={{
                className: "hidden",
              }}
            >
              <Option className="text-[12px]" value="Meals">
                Meals
              </Option>
              <Option className="text-[12px]" value="Medical">
                Medical
              </Option>
              <Option className="text-[12px]" value="Hygiene">
                Hygiene
              </Option>
              <Option className="text-[12px]" value="Exercise">
                Exercise
              </Option>
              <Option className="text-[12px]" value="Additional">
                Additional
              </Option>
            </Select>
          </div>
          <div className="w-[45%]">
            <Typography
              variant="h6"
              color="black"
              className="mb-2 text-left font-medium"
            >
              Frequency*
            </Typography>
            <Select
              required={true}
              onChange={handleFrequencyChange}
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent focus:!border-primary focus:!border-blue-gray-900 group-hover:!border-primary text-[14px]"
              placeholder="1"
              value={taskInterval}
              labelProps={{
                className: "hidden",
              }}
            >
              <Option className="text-[12px]" value="Daily">
                Daily
              </Option>
              <Option className="text-[12px]" value="Weekly">
                Weekly
              </Option>
              <Option className="text-[12px]" value="Biweekly">
                Biweekly
              </Option>
              <Option className="text-[12px]" value="Monthly">
                Monthly
              </Option>
            </Select>
          </div>
        </div>

        <div className="flex flex-row w-full items-end justify-between">
          <div className="w-[45%]">
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Routine Start*
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
          <div className="w-[45%]">
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Routine End
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
          <Button onClick={handlePostRoutineTask} className="text-sm">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
