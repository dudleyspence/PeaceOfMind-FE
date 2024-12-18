import React from "react";
import {
  Input,
  Option,
  Select,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import {
  deleteTaskTemplate,
  updateTaskTemplate,
} from "../../../../../axios/task.axios";
import { useDispatch } from "react-redux";
import { fetchRoutineTasks } from "../../../../../state/slices/carePlanSlice";
import { useParams } from "react-router-dom";

export function EditRecurringTask({ task }) {
  const { patient_id } = useParams();
  const [open, setOpen] = useState(false);
  const [taskText, setTaskText] = useState(task.text);
  const [taskCategory, setTaskCategory] = useState(task.category);
  const [taskInterval, setTaskInterval] = useState(task.repeatInterval);
  const [taskNotes, setTaskNotes] = useState(task.notes ? task.notes : "");

  const dispatch = useDispatch();

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

  function handleDeleteTask() {
    deleteTaskTemplate(task._id).then(() => {
      dispatch(fetchRoutineTasks(patient_id));
      setOpen(!open);
    });
  }

  function handleUpdateTask() {
    const update = {
      text: taskText,
      category: taskCategory,
      repeatInterval: taskInterval,
    };
    if (taskNotes) {
      update.notes = taskNotes;
    }
    updateTaskTemplate(task._id, update).then(() => {
      dispatch(fetchRoutineTasks(patient_id));
      setOpen(!open);
    });
  }

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <svg
        className="h-5 cursor-pointer"
        onClick={() => {
          handleOpen();
        }}
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="50"
        zoomAndPan="magnify"
        viewBox="0 0 37.5 37.499999"
        height="50"
        preserveAspectRatio="xMidYMid meet"
        version="1.0"
      >
        <defs>
          <clipPath id="2c4ef3ab98">
            <path
              d="M 0 0 L 37.007812 0 L 37.007812 37 L 0 37 Z M 0 0 "
              clipRule="nonzero"
            />
          </clipPath>
        </defs>
        <g clipPath="url(#2c4ef3ab98)">
          <path
            fill="#000000"
            d="M 37.007812 5.515625 C 37.007812 4.1875 36.480469 2.933594 35.527344 2.007812 C 33.539062 0.0390625 30.304688 0.0390625 28.320312 2.007812 L 26.214844 4.089844 L 3.601562 4.089844 C 2.628906 4.089844 1.734375 4.457031 1.050781 5.132812 C 0.371094 5.804688 0 6.710938 0 7.65625 L 0 33.398438 C 0 34.363281 0.371094 35.25 1.050781 35.925781 C 1.734375 36.601562 2.648438 36.964844 3.601562 36.964844 L 29.605469 36.964844 C 30.578125 36.964844 31.476562 36.601562 32.15625 35.925781 C 32.839844 35.25 33.207031 34.34375 33.207031 33.398438 L 33.207031 11.300781 L 33.949219 10.570312 L 35.507812 9.027344 C 36.480469 8.101562 37.007812 6.847656 37.007812 5.515625 Z M 17.625 24.742188 L 15.582031 22.714844 L 27.328125 11.089844 C 27.597656 10.820312 27.597656 10.355469 27.328125 10.085938 C 27.054688 9.816406 26.585938 9.816406 26.3125 10.085938 L 14.570312 21.714844 L 12.523438 19.667969 L 27.347656 4.996094 L 32.449219 10.046875 Z M 12.015625 21.191406 L 16.109375 25.242188 L 11.335938 25.917969 Z M 31.785156 33.417969 C 31.785156 33.996094 31.554688 34.535156 31.144531 34.941406 C 30.734375 35.347656 30.191406 35.578125 29.605469 35.578125 L 3.601562 35.578125 C 3.019531 35.578125 2.472656 35.347656 2.066406 34.941406 C 1.65625 34.535156 1.421875 33.996094 1.421875 33.417969 L 1.421875 7.65625 C 1.421875 7.078125 1.65625 6.539062 2.066406 6.132812 C 2.472656 5.730469 3.019531 5.496094 3.601562 5.496094 L 24.773438 5.496094 L 10.984375 19.167969 C 10.925781 19.226562 10.867188 19.304688 10.847656 19.378906 C 10.828125 19.398438 10.828125 19.4375 10.828125 19.457031 C 10.808594 19.496094 10.808594 19.535156 10.789062 19.554688 L 9.777344 26.628906 C 9.738281 26.863281 9.816406 27.074219 9.972656 27.230469 C 10.109375 27.363281 10.285156 27.441406 10.480469 27.441406 C 10.519531 27.441406 10.539062 27.441406 10.574219 27.441406 L 17.722656 26.4375 C 17.761719 26.4375 17.800781 26.417969 17.820312 26.398438 C 17.839844 26.398438 17.878906 26.378906 17.898438 26.378906 C 17.976562 26.339844 18.054688 26.304688 18.113281 26.246094 L 31.765625 12.726562 L 31.765625 33.417969 Z M 33.460938 9.066406 L 28.359375 3.992188 L 29.351562 3.011719 C 30.035156 2.335938 30.949219 1.949219 31.921875 1.949219 C 32.898438 1.949219 33.8125 2.316406 34.492188 3.011719 C 35.175781 3.683594 35.546875 4.570312 35.546875 5.515625 C 35.546875 6.460938 35.175781 7.347656 34.492188 8.023438 Z M 33.460938 9.066406 "
            fillOpacity="1"
            fillRule="nonzero"
          />
        </g>
        <path
          strokeLinecap="butt"
          transform="matrix(0.740132, -0.000000000000000092, 0.000000000000000092, 0.740132, 12.673701, 4.440789)"
          fill="none"
          strokeLinejoin="miter"
          d="M -0.00246759 0.502223 L 14.078644 0.502223 "
          stroke="#000000"
          strokeWidth="1"
          strokeOpacity="1"
          strokeMiterlimit="4"
        />
      </svg>
      <Dialog size="sm" open={open} handler={handleOpen} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Edit Task
          </Typography>

          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
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
              focus:!border-gray-900 !text-[15px]"
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
              className="!w-full !border-[1.5px] !border-blue-gray-200 bg-white text-gray-800 ring-4 ring-transparent focus:!border-primary focus:!border-blue-gray-900 group-hover:!border-primary !text-[15px]"
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
              className="!w-full !border-[1.5px] !border-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent focus:!border-primary focus:!border-blue-gray-900 group-hover:!border-primary !text-[15px]"
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
              !text-[15px]
              overflow-scroll"
              containerProps={{
                className: "!min-w-full",
              }}
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <div className="w-full flex flex-row justify-between">
            <Button className="text-sm" onClick={handleDeleteTask}>
              Delete Task
            </Button>
            <Button className="text-sm" onClick={handleUpdateTask}>
              Update Task
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
