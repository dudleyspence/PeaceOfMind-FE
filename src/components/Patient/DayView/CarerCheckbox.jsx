import { Checkbox } from "@material-tailwind/react";
import { updateTaskInsance } from "../../../axios/task.axios";

import { useDispatch } from "react-redux";
import { updateTaskCompletion } from "../../../state/slices/daySlice";

export function CarerCheckbox({ isTaskComplete, taskId }) {
  const dispatch = useDispatch();

  const handleToggle = (event) => {
    const newIsCompleted = event.target.checked;
    console.log("Toggled checkbox:", event.target.checked);

    dispatch(updateTaskCompletion({ taskId, isCompleted: newIsCompleted }));

    const update = { isCompleted: newIsCompleted };
    updateTaskInsance(taskId, update)
      .then(() => {
        console.log("task_updated");
      })
      .catch((error) => {
        dispatch(
          updateTaskCompletion({ taskId, isCompleted: !newIsCompleted })
        );
        console.error("Failed to update task completion status:", error);
      });
  };

  return (
    <Checkbox
      onChange={handleToggle}
      checked={isTaskComplete}
      color="green"
      ripple={false}
      className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
    />
  );
}
