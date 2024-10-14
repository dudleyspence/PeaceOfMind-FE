import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getScheduledTasks } from "../../../../../axios/task.axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { EditScheduledTask } from "./EditScheduledTask";
import ViewTaskNotes from "../ViewTaskNotes";
import {
  fetchScheduledTasks,
  selectCarePlanError,
  selectCarePlanLoading,
  selectScheduledTasks,
} from "../../../../../state/slices/carePlanSlice";
import { useSelector, useDispatch } from "react-redux";

export function ViewSchedule({ taskUpdates, setTaskUpdates }) {
  const [open, setOpen] = useState(false);
  const scheduledTasks = useSelector(selectScheduledTasks);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCarePlanLoading);
  const error = useSelector(selectCarePlanError);

  const { patient_id } = useParams();

  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    dispatch(fetchScheduledTasks(patient_id));
  }, [dispatch, patient_id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <>
      <Button onClick={handleOpen} variant="gradient" className="text-sm">
        Day-Specific Tasks
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="relative m-0 block">
          <div className="flex flex-row items-center gap-5 justify-start mx-5 my-3">
            <svg
              fill="#000000"
              className="w-8"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 612 612"
              xmlSpacepace="preserve"
            >
              <g>
                <g>
                  <path
                    d="M612,463.781c0-70.342-49.018-129.199-114.75-144.379c-10.763-2.482-21.951-3.84-33.469-3.84
c-3.218,0-6.397,0.139-9.562,0.34c-71.829,4.58-129.725,60.291-137.69,131.145c-0.617,5.494-0.966,11.073-0.966,16.734
c0,10.662,1.152,21.052,3.289,31.078C333.139,561.792,392.584,612,463.781,612C545.641,612,612,545.641,612,463.781z
M463.781,561.797c-54.133,0-98.016-43.883-98.016-98.016s43.883-98.016,98.016-98.016s98.016,43.883,98.016,98.016
S517.914,561.797,463.781,561.797z"
                  />
                  <polygon
                    points="482.906,396.844 449.438,396.844 449.438,449.438 396.844,449.438 396.844,482.906 482.906,482.906 
482.906,449.438 482.906,449.438 		"
                  />
                  <path
                    d="M109.969,0c-9.228,0-16.734,7.507-16.734,16.734v38.25v40.641c0,9.228,7.506,16.734,16.734,16.734h14.344
c9.228,0,16.734-7.507,16.734-16.734V54.984v-38.25C141.047,7.507,133.541,0,124.312,0H109.969z"
                  />
                  <path
                    d="M372.938,0c-9.228,0-16.734,7.507-16.734,16.734v38.25v40.641c0,9.228,7.507,16.734,16.734,16.734h14.344
c9.228,0,16.734-7.507,16.734-16.734V54.984v-38.25C404.016,7.507,396.509,0,387.281,0H372.938z"
                  />
                  <path
                    d="M38.25,494.859h236.672c-2.333-11.6-3.572-23.586-3.572-35.859c0-4.021,0.177-7.999,0.435-11.953H71.719
c-15.845,0-28.688-12.843-28.688-28.688v-229.5h411.188v88.707c3.165-0.163,6.354-0.253,9.562-0.253
c11.437,0,22.61,1.109,33.469,3.141V93.234c0-21.124-17.126-38.25-38.25-38.25h-31.078v40.641c0,22.41-18.23,40.641-40.641,40.641
h-14.344c-22.41,0-40.641-18.231-40.641-40.641V54.984H164.953v40.641c0,22.41-18.231,40.641-40.641,40.641h-14.344
c-22.41,0-40.641-18.231-40.641-40.641V54.984H38.25C17.126,54.984,0,72.111,0,93.234v363.375
C0,477.733,17.126,494.859,38.25,494.859z"
                  />
                  <circle cx="134.774" cy="260.578" r="37.954" />
                  <circle cx="248.625" cy="260.578" r="37.954" />
                  <circle cx="362.477" cy="260.578" r="37.954" />
                  <circle cx="248.625" cy="375.328" r="37.953" />
                  <circle cx="134.774" cy="375.328" r="37.953" />
                </g>
              </g>
            </svg>
            <h3 className="underline font-bold text-[14px]">
              Appointments and Day Specific tasks
            </h3>
          </div>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="flex flex-col max-h-[70vh] overflow-scroll gap-5">
          {scheduledTasks.length > 0 ? (
            scheduledTasks.map((task) => (
              <div
                key={task._id}
                className="items-start bg-yellow-100 p-5 rounded-lg shadow-lg gap-2 flex flex-col"
              >
                <p className="ml-2 font-bold text-black text-[14px]">
                  {task.template.text}
                </p>
                <div className="flex flex-row gap-3 items-center">
                  <p
                    className={
                      "bg-white text-bold text-black py-1 px-2 shadow-md rounded text-lg"
                    }
                  >
                    {task.date}
                  </p>
                  <p
                    className={
                      "bg-white text-bold text-black py-1 px-2 shadow-md rounded text-lg"
                    }
                  >
                    {task.time}
                  </p>
                  {task.template.notes && (
                    <ViewTaskNotes notes={task.template.notes} />
                  )}
                  <EditScheduledTask
                    task={task}
                    setTaskUpdates={setTaskUpdates}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mb-3 font-bold">
              There are not scheduled tasks or appointments
            </p>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}
