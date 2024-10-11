import React from "react";
import {
  Alert,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CreateRoutineTask } from "./RoutinePlan/CreateRoutineTask";
import { CreateDaySpecificTask } from "./SchedulePlan/CreateDaySpecificTask";

export function CreateTaskContainer({ patient, setTaskUpdates }) {
  const [open, setOpen] = React.useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const data = [
    {
      label: "Routine Task",
      value: "Routine",
      desc: (
        <CreateRoutineTask
          open={open}
          setOpen={setOpen}
          setShowAlert={setShowAlert}
          patient={patient}
        />
      ),
    },
    {
      label: "Day-Specific Task",
      value: "DaySpecific",
      desc: (
        <CreateDaySpecificTask
          open={open}
          setShowAlert={setShowAlert}
          setOpen={setOpen}
          patient={patient}
          setTaskUpdates={setTaskUpdates}
        />
      ),
    },
  ];

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <Button onClick={handleOpen} className="text-sm">
        Create Task
      </Button>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="p-4 overflow-visible !max-h-[95vh]"
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Create Task
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
        <Tabs value="Routine" className="overflow-visible">
          <TabsHeader className="z-0">
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="overflow-visible">
            {data.map(({ value, desc }) => (
              <TabPanel key={value} value={value} className="overflow-visible">
                {desc}
                {showAlert && (
                  <Alert
                    variant="ghost"
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                        />
                      </svg>
                    }
                  >
                    <span>
                      Some necessary information is missing. All required fields
                      are marked with an asterisk *.
                    </span>
                  </Alert>
                )}
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </Dialog>
    </div>
  );
}
