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
  Drawer,
  Card,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export function SideNavBar() {
  const [open, setOpen] = React.useState(0);
  const { currentUser, handleSignOut } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const [patientsList, setPatientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setPatientsList(currentUser.patients);
    setIsLoading(false);
  }, [currentUser]);

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
    handleSignOut().then(() => {
      navigate("/login");
    });
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
                  fillOpacity="1"
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
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      zoomAndPan="magnify"
                      viewBox="0 0 375 374.999991"
                      preserveAspectRatio="xMidYMid meet"
                      version="1.0"
                    >
                      <defs>
                        <clipPath id="bad9f357c3">
                          <path
                            d="M 0 0 L 330.75 0 L 330.75 375 L 0 375 Z M 0 0 "
                            clip-rule="nonzero"
                          />
                        </clipPath>
                      </defs>
                      <g clip-path="url(#bad9f357c3)">
                        <path
                          fill="#000000"
                          d="M 78.472656 342.351562 L 85.097656 352.75 L 50.269531 374.972656 L -0.0078125 296.097656 L 34.804688 273.875 L 78.363281 342.179688 C 78.371094 342.195312 78.378906 342.21875 78.386719 342.234375 C 78.417969 342.273438 78.4375 342.3125 78.472656 342.351562 Z M 280.785156 262.460938 L 224.03125 298.855469 C 222.558594 305.816406 218.449219 311.964844 212.71875 315.621094 C 208.972656 318.007812 204.695312 319.21875 200.210938 319.21875 C 197.417969 319.21875 194.535156 318.75 191.65625 317.800781 L 150.777344 304.277344 C 147.871094 303.316406 146.292969 300.175781 147.253906 297.261719 C 148.214844 294.355469 151.347656 292.777344 154.257812 293.738281 L 195.136719 307.261719 C 199.53125 308.714844 203.4375 308.378906 206.761719 306.261719 C 210.339844 303.980469 212.898438 299.675781 213.4375 295.042969 C 213.460938 294.824219 213.5 294.621094 213.554688 294.417969 C 213.742188 288.292969 209.792969 282.558594 203.9375 280.621094 L 114.207031 250.921875 C 105.46875 248.03125 97.074219 248.984375 89.246094 253.765625 L 50.269531 277.488281 L 84.886719 331.78125 L 104.132812 320.070312 C 105.515625 319.226562 107.207031 319.039062 108.753906 319.546875 L 182.636719 343.984375 C 192.558594 347.28125 202.460938 346.03125 211.257812 340.382812 L 295.921875 286.089844 C 302.425781 281.917969 304.332031 273.210938 300.171875 266.679688 C 295.992188 260.179688 287.296875 258.28125 280.785156 262.460938 Z M 330.757812 170.132812 C 330.757812 177.578125 327.878906 184.554688 322.648438 189.777344 L 279.449219 233.023438 L 236.25 189.777344 C 225.429688 178.953125 225.429688 161.320312 236.25 150.46875 C 241.464844 145.25 248.445312 142.375 255.886719 142.375 C 263.332031 142.375 270.3125 145.25 275.527344 150.476562 C 277.691406 152.640625 281.203125 152.640625 283.367188 150.476562 C 294.203125 139.648438 311.832031 139.648438 322.652344 150.476562 C 327.878906 155.703125 330.757812 162.6875 330.757812 170.132812 Z M 302.238281 182.246094 C 302.238281 179.179688 299.753906 176.695312 296.695312 176.695312 L 284.992188 176.695312 L 284.992188 164.992188 C 284.992188 161.929688 282.507812 159.445312 279.449219 159.445312 C 276.386719 159.445312 273.90625 161.929688 273.90625 164.992188 L 273.90625 176.695312 L 262.234375 176.695312 C 259.164062 176.695312 256.683594 179.179688 256.683594 182.246094 C 256.683594 185.308594 259.164062 187.792969 262.234375 187.792969 L 273.90625 187.792969 L 273.90625 199.472656 C 273.90625 202.535156 276.386719 205.019531 279.449219 205.019531 C 282.507812 205.019531 284.992188 202.535156 284.992188 199.472656 L 284.992188 187.792969 L 296.695312 187.792969 C 299.753906 187.792969 302.238281 185.3125 302.238281 182.246094 Z M 117.6875 240.390625 L 207.417969 270.085938 C 215.179688 272.65625 220.980469 278.691406 223.40625 286.074219 L 273.90625 253.6875 L 273.90625 243.171875 L 228.40625 197.621094 C 213.265625 182.476562 213.265625 157.804688 228.40625 142.632812 L 228.40625 142.625 C 228.871094 142.164062 229.339844 141.710938 229.824219 141.273438 C 222.800781 138.800781 215.359375 137.503906 207.878906 137.503906 L 156.695312 137.503906 C 120.289062 137.503906 90.667969 167.132812 90.667969 203.558594 L 90.667969 240.765625 C 99.292969 237.507812 108.496094 237.34375 117.6875 240.390625 Z M 182.285156 126.402344 C 217.097656 126.402344 245.417969 98.070312 245.417969 63.234375 C 245.417969 28.417969 217.097656 0.09375 182.285156 0.09375 C 147.488281 0.09375 119.179688 28.417969 119.179688 63.234375 C 119.179688 98.070312 147.488281 126.402344 182.285156 126.402344 Z M 182.285156 126.402344 "
                          fill-opacity="1"
                          fill-rule="nonzero"
                        />
                      </g>
                      <path
                        stroke-linecap="butt"
                        transform="matrix(0.616027, -0.427797, 0.427797, 0.616027, 208.234092, 38.022192)"
                        fill="none"
                        stroke-linejoin="miter"
                        d="M 0.00043196 1.999747 L 1.224169 1.999865 "
                        stroke="#000000"
                        stroke-width="4"
                        stroke-opacity="1"
                        stroke-miterlimit="4"
                      />
                    </svg>
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
