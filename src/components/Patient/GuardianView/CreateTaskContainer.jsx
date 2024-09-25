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
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { CreateRoutineTask } from "./CreateRoutineTask";
import { CreateDaySpecificTask } from "./CreateDaySpecificTask";

export function CreateTaskContainer({ patient }) {
  const [open, setOpen] = React.useState(false);
  const data = [
    {
      label: "Routine Task",
      value: "Routine",
      desc: (
        <CreateRoutineTask open={open} setOpen={setOpen} patient={patient} />
      ),
    },
    {
      label: "Day-Specific Task",
      value: "DaySpecific",
      desc: (
        <CreateDaySpecificTask
          open={open}
          setOpen={setOpen}
          patient={patient}
        />
      ),
    },
  ];

  const handleOpen = () => setOpen(!open);

  return (
    <>
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
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </Dialog>
    </>
  );
}
