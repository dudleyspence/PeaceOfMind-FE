import { useState } from "react";

import React from "react";
import {
  Button,
  Dialog,
  Typography,
  IconButton,
  Badge,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export function NotificationsButton() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Badge content="5" withBorder className="text-sm font-bold">
        <Button onClick={handleOpen} className="text-sm">
          Notifications
        </Button>
      </Badge>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h5" color="black">
            Notifcations
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
        <DialogBody className="text-black">
          The notifications feature of this application is{" "}
          <span className="font-bold">not yet available. </span>
          Please look out for this feature in the future.
        </DialogBody>
      </Dialog>
    </>
  );
}
