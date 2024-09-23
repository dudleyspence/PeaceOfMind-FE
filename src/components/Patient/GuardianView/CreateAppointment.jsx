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

export function CreateTask() {
  const [taskText, setTaskText] = useState("");
  const [taskCategory, setTaskCategory] = useState("");
  const [taskInterval, setTaskInterval] = useState("");

  function handleTextChange(event) {
    setTaskText(event.target.value);
  }

  function handleFrequencyChange(value) {
    setTaskInterval(value);
  }

  function handleCategoryChange(value) {
    setTaskCategory(value);
  }

  function handleDeleteTask() {
    deleteRecurringTask(task._id).then(() => {
      setOpen(!open);
    });
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
      <Button onClick={handleOpen} className="text-sm">
        Create Task
      </Button>
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
        </DialogBody>
        <DialogFooter>
          <div className="w-full flex flex-row justify-between">
            <Button className="text-sm" onClick={handleDeleteTask}>
              Cancel
            </Button>
            <Button className="text-sm" onClick={handleUpdateTask}>
              Add Task
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
