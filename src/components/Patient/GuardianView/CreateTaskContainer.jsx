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

export function CreateTaskContainer() {
  const data = [
    {
      label: "Routine Task",
      value: "Routine",
      desc: <CreateRoutineTask />,
    },
    {
      label: "Day-Specific Task",
      value: "DaySpecific",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
  ];

  const handleOpen = () => setOpen(!open);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={handleOpen} className="text-sm">
        Create Task
      </Button>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="p-4 overflow-visible"
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
        <Tabs
          id="custom-animation"
          value="Routine"
          className="overflow-visible"
        >
          <TabsHeader>
            {data.map(({ label, value }) => (
              <Tab key={value} value={value}>
                {label}
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody
            className="overflow-visible"
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
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
