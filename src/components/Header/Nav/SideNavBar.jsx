import React from "react";
import {
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  CubeTransparentIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export function SideNavBar() {
  const [open, setOpen] = React.useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const {
    guardianLoggedIn,
    carerLoggedIn,
    setCarerLoggedIn,
    setGuardianLoggedIn,
  } = useContext(UserContext);
  const [patientsList, setPatientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    if (guardianLoggedIn) {
      setPatientsList(guardianLoggedIn.patients);
      setIsLoading(false);
    }
    if (carerLoggedIn) {
      setPatientsList(carerLoggedIn.patients);
      setIsLoading(false);
    }
  }, [guardianLoggedIn, carerLoggedIn]);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  function handlePatientClick(patient_id) {
    closeDrawer();
    navigate(`/patient/${patient_id}`);
  }

  function handleGoToDashboard() {
    closeDrawer();
    navigate("/dashboard");
  }

  function handleSignOutClick() {
    setCarerLoggedIn(null);
    setGuardianLoggedIn(null);
    localStorage.removeItem("guardianLoggedIn");
    localStorage.removeItem("carerLoggedIn");
    closeDrawer();
    navigate("/login");
  }

  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);

  return isLoading ? (
    "loading"
  ) : (
    <>
      <IconButton variant="text" size="lg" onClick={openDrawer}>
        {isDrawerOpen ? (
          <XMarkIcon className="h-8 w-8 stroke-2" />
        ) : (
          <Bars3Icon className="h-8 w-8 stroke-2" />
        )}
      </IconButton>
      <Drawer open={isDrawerOpen} onClose={closeDrawer}>
        <Card
          color="transparent"
          shadow={false}
          className="h-[calc(100vh-2rem)] w-full p-4"
        >
          <div className="mb-2 flex items-center gap-4 p-4">
            <svg
              className="h-8 w-8 fill-black"
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
                <clipPath id="3264b8d004">
                  <path
                    d="M 9.359375 0 L 36.382812 0 L 36.382812 36.511719 L 9.359375 36.511719 Z M 9.359375 0 "
                    clipRule="nonzero"
                  />
                </clipPath>
              </defs>
              <g clipPath="url(#3264b8d004)">
                <path
                  d="M 20.085938 0.355469 C 19.109375 0.015625 18.222656 0.0429688 17.449219 0.453125 C 16.765625 0.824219 16.3125 1.421875 16.023438 1.9375 C 15.738281 1.421875 15.285156 0.816406 14.59375 0.453125 C 13.828125 0.0429688 12.941406 0.015625 11.957031 0.355469 C 10.398438 0.902344 9.429688 2.191406 9.394531 3.785156 C 9.359375 5.054688 9.910156 6.421875 10.9375 7.644531 C 12.074219 8.996094 13.777344 10.160156 15.859375 11.011719 C 15.910156 11.035156 15.96875 11.042969 16.023438 11.042969 C 16.074219 11.042969 16.132812 11.035156 16.179688 11.011719 C 21.054688 9.125 22.753906 6.101562 22.710938 3.910156 C 22.683594 2.242188 21.703125 0.917969 20.085938 0.355469 Z M 16.03125 10.160156 C 11.6875 8.335938 10.195312 5.605469 10.246094 3.808594 C 10.28125 2.558594 11.003906 1.59375 12.242188 1.15625 C 12.597656 1.035156 12.933594 0.972656 13.238281 0.972656 C 13.589844 0.972656 13.910156 1.050781 14.191406 1.199219 C 15.234375 1.753906 15.605469 3.132812 15.613281 3.148438 C 15.664062 3.332031 15.832031 3.464844 16.023438 3.464844 C 16.21875 3.464844 16.386719 3.339844 16.4375 3.148438 C 16.445312 3.132812 16.816406 1.753906 17.859375 1.199219 C 18.402344 0.910156 19.066406 0.894531 19.808594 1.15625 C 21.097656 1.605469 21.84375 2.613281 21.863281 3.921875 C 21.90625 6.785156 18.789062 9.054688 16.03125 10.160156 Z M 28.921875 11.820312 C 31.0625 11.820312 32.796875 10.078125 32.796875 7.945312 C 32.796875 5.8125 31.0625 4.0625 28.921875 4.0625 C 26.785156 4.0625 25.050781 5.804688 25.050781 7.9375 C 25.050781 10.070312 26.785156 11.820312 28.921875 11.820312 Z M 28.921875 4.917969 C 30.59375 4.917969 31.949219 6.277344 31.949219 7.945312 C 31.949219 9.613281 30.59375 10.972656 28.921875 10.972656 C 27.253906 10.972656 25.898438 9.613281 25.898438 7.945312 C 25.898438 6.277344 27.253906 4.917969 28.921875 4.917969 Z M 33.167969 12.03125 L 31.738281 12.03125 C 29.890625 12.03125 28.382812 13.539062 28.382812 15.382812 L 28.382812 15.777344 L 29.234375 15.417969 L 29.234375 15.390625 C 29.234375 14.011719 30.355469 12.890625 31.738281 12.890625 L 33.167969 12.890625 C 34.542969 12.890625 35.664062 14.011719 35.664062 15.390625 L 35.664062 21.746094 L 29.234375 21.746094 L 29.234375 17.269531 L 28.382812 17.625 L 28.382812 22.164062 C 28.382812 22.402344 28.574219 22.589844 28.808594 22.589844 L 29.578125 22.589844 L 30.167969 35.679688 C 30.171875 35.90625 30.363281 36.085938 30.59375 36.085938 L 34.308594 36.085938 C 34.535156 36.085938 34.71875 35.90625 34.734375 35.679688 L 35.324219 22.589844 L 36.09375 22.589844 C 36.328125 22.589844 36.519531 22.402344 36.519531 22.164062 L 36.519531 15.382812 C 36.511719 13.53125 35.011719 12.03125 33.167969 12.03125 Z M 33.902344 35.234375 L 31.003906 35.234375 L 30.4375 22.585938 L 34.472656 22.585938 Z M 25.78125 21.683594 C 25.78125 21.703125 25.78125 21.71875 25.78125 21.738281 L 25.78125 36.082031 C 25.78125 36.3125 25.589844 36.503906 25.351562 36.503906 C 25.121094 36.503906 24.929688 36.3125 24.929688 36.082031 L 24.929688 21.769531 C 24.898438 21.582031 24.671875 20.464844 23.71875 20.464844 C 22.699219 20.464844 22.539062 21.730469 22.535156 21.789062 C 22.503906 22.023438 22.300781 22.183594 22.066406 22.164062 C 21.828125 22.132812 21.667969 21.921875 21.695312 21.695312 C 21.78125 20.976562 22.3125 19.621094 23.726562 19.621094 C 25.132812 19.613281 25.6875 20.960938 25.78125 21.683594 Z M 29.234375 17.253906 L 28.382812 17.609375 L 24.070312 19.429688 C 23.960938 19.472656 23.851562 19.492188 23.742188 19.492188 C 23.40625 19.492188 23.09375 19.300781 22.960938 18.972656 C 22.773438 18.542969 22.984375 18.042969 23.414062 17.859375 L 28.390625 15.761719 L 29.242188 15.40625 L 31.011719 14.660156 C 31.445312 14.476562 31.941406 14.683594 32.125 15.113281 C 32.3125 15.550781 32.105469 16.046875 31.671875 16.234375 Z M 29.234375 17.253906 "
                  fill-opacity="1"
                  fillRule="nonzero"
                />
              </g>
            </svg>
            <Typography variant="h5" color="blue-gray">
              Peace Of Mind
            </Typography>
          </div>

          <List>
            <ListItem onClick={handleGoToDashboard}>
              <ListItemPrefix>
                <UserCircleIcon className="h-5 w-5" />
              </ListItemPrefix>
              Dashboard
            </ListItem>
            <Accordion
              open={open === 1}
              icon={
                <ChevronDownIcon
                  strokeWidth={2.5}
                  className={`mx-auto h-4 w-4 transition-transform ${
                    open === 1 ? "rotate-180" : ""
                  }`}
                />
              }
            >
              <ListItem className="p-0" selected={open === 1}>
                <AccordionHeader
                  onClick={() => handleOpen(1)}
                  className="border-b-0 p-3"
                >
                  <ListItemPrefix>
                    <PresentationChartBarIcon className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography color="blue-gray" className="mr-auto font-normal">
                    Patients
                  </Typography>
                </AccordionHeader>
              </ListItem>
              <AccordionBody className="py-1">
                <List className="p-0">
                  {patientsList.map((patient) => (
                    <ListItem
                      onClick={() => {
                        handlePatientClick(patient._id);
                      }}
                      key={patient._id}
                    >
                      <ListItemPrefix>
                        <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                      </ListItemPrefix>
                      {patient.name}
                    </ListItem>
                  ))}
                </List>
              </AccordionBody>
            </Accordion>

            <hr className="my-2 border-blue-gray-50" />
            <ListItem>
              <ListItemPrefix>
                <InboxIcon className="h-5 w-5" />
              </ListItemPrefix>
              Notifications
              <ListItemSuffix>
                <Chip
                  value="14"
                  size="sm"
                  variant="ghost"
                  color="blue-gray"
                  className="rounded-full"
                />
              </ListItemSuffix>
            </ListItem>

            <ListItem>
              <ListItemPrefix>
                <Cog6ToothIcon className="h-5 w-5" />
              </ListItemPrefix>
              Settings
            </ListItem>
            <ListItem onClick={handleSignOutClick}>
              <ListItemPrefix>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Log Out
            </ListItem>
          </List>
        </Card>
      </Drawer>
    </>
  );
}

/*

{patientsList.map((patient) => (
          <li
            onClick={() => {
              handlePatientClick(patient._id);
            }}
            key={patient._id}
            className="flex flex-row items-center justify-between gap-4 bg-white w-full p-5 mt-7 px-8 rounded-md shadow-lg max-w-md  hover:shadow-2xl cursor-pointer"
          >
            <div>
              <p className="mb-3 font-bold">{patient.name}</p>
              <ProgressBar />
            </div>
            <img
              src={patient.profileImageURL}
              alt="patient image"
              className="h-20 rounded-lg"
            />
          </li>
        ))}*/

/*
{patientsList.map((patient) => (

        ))}
*/

/*
<AccordionBody className="py-1">

                <List className="p-0">
                {patientsList.map((patient) => (
                <ListItem             onClick={() => {
              handlePatientClick(patient._id);
            }}
            key={patient._id}>
                    <ListItemPrefix>
                      <ChevronRightIcon strokeWidth={3} className="h-3 w-5" />
                    </ListItemPrefix>
                    {patient.name}
                </ListItem>
                ))}
                </List>
              </AccordionBody>
*/
