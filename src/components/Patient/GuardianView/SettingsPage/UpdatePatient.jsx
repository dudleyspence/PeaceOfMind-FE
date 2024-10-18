import React from "react";
import {
  Input,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Chip,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { updatePatient } from "../../../../axios/patient.axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectPatient,
  fetchPatient,
} from "../../../../state/slices/patientSlice";
import { AddMedicalConditions } from "../../../Guardian/AddPatient/AddMedicalConditions";

export function UpdatePatient() {
  const patient = useSelector(selectPatient);
  const [open, setOpen] = useState(false);
  const [patientName, setPatientName] = useState(patient.name);
  const [patientAddress, setPatientAddress] = useState(patient.address);
  const [patientPhone, setPatientPhone] = useState(patient.phone);
  const [patientAbout, setPatientAbout] = useState(patient.about);
  const navigate = useNavigate();
  const [medicalConditions, setMedicalConditions] = useState(
    patient.medicalConditions || []
  );
  const dispatch = useDispatch();

  function handleUpdatePatient() {
    const update = {
      name: patientName,
      address: patientAddress,
      about: patientAbout,
      phone: patientPhone,
      medicalConditions: medicalConditions,
    };

    updatePatient(patient._id, update).then((updated) => {
      dispatch(fetchPatient(patient._id));
      console.log("patient updated >>> ", updated);
      navigate(`/patient/${patient._id}`);
    });
  }

  function handleDeleteMedicalCondition(condition) {
    setMedicalConditions(medicalConditions.filter((c) => c !== condition));
  }

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <Button
        onClick={() => {
          handleOpen();
        }}
        className="bg-blue-100 text-black shadow-lg flex flex-row items-center justify-center gap-2 w-4/5"
      >
        Update Patient
      </Button>
      <Dialog
        size="sm"
        open={open}
        handler={handleOpen}
        className="p-4 max-h-[95%] self-start overflow-scroll"
      >
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            Update Patient
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
              variant="h6"
              color="black"
              className="mb-2 text-left font-medium"
            >
              Full Name
            </Typography>
            <Input
              onChange={(event) => {
                setPatientName(event.target.value);
              }}
              color="gray"
              size="lg"
              name="name"
              value={patientName}
              className="
              !border-t-gray-600
              border-gray-600
              focus:!border-gray-900
              !text-[16px]"
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
              variant="h6"
              color="black"
              className="mb-2 text-left font-medium"
            >
              Address
            </Typography>
            <Input
              onChange={(event) => {
                setPatientAddress(event.target.value);
              }}
              color="gray"
              size="lg"
              name="name"
              value={patientAddress}
              className="
              !border-t-gray-600
              border-gray-600
              focus:!border-gray-900
              !text-[16px]"
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
              variant="h6"
              color="black"
              className="mb-2 text-left font-medium"
            >
              Phone Number
            </Typography>
            <Input
              onChange={(event) => {
                setPatientPhone(event.target.value);
              }}
              color="gray"
              size="lg"
              name="name"
              value={patientPhone}
              className="
              !border-t-gray-600
              border-gray-600
              focus:!border-gray-900
              !text-[16px]"
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
              variant="h6"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              Medical Conditions
            </Typography>
            <AddMedicalConditions
              medicalConditions={medicalConditions}
              setMedicalConditions={setMedicalConditions}
            />
            <div className="flex flex-wrap gap-2 mt-3">
              {medicalConditions.map((condition) => (
                <Chip
                  open={open}
                  value={condition}
                  onClose={() => handleDeleteMedicalCondition(condition)}
                />
              ))}
            </div>
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="mb-2 text-left font-medium"
            >
              About
            </Typography>
            <Textarea
              required={true}
              onChange={(event) => {
                setPatientAbout(event.target.value);
              }}
              color="gray"
              size="lg"
              name="name"
              value={patientAbout}
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
            <Button className="text-sm" onClick={handleOpen}>
              Cancel
            </Button>
            <Button className="text-sm" onClick={handleUpdatePatient}>
              Update Patient
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
}
