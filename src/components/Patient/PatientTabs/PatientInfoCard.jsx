import React from "react";
import {
  Collapse,
  Button,
  Card,
  Typography,
  CardBody,
} from "@material-tailwind/react";

export default function PatientInfoCard({ patient }) {
  const [open, setOpen] = React.useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);
  return (
    <div
      id="patient-profile"
      className="bg-blue-100 w-full max-w-96 rounded-lg shadow-md min-h-40 cursor-pointer overflow-hidden"
      onClick={toggleOpen}
    >
      <div className="flex flex-row justify-start text-black">
        <div className="w-1/3 h-auto aspect-square rounded-lg overflow-hidden max-w-36">
          <img
            src={patient.profileImageURL}
            alt="patient image"
            className="w-full h-full object-cover transform scale-110"
          />
        </div>
        <div id="contact-info" className="pl-2">
          <p className="font-bold m-3 text-center">Patient: {patient.name}</p>
          <p className="flex gap-1 items-center justify-start mt-2 text-base">
            <svg
              className="fill-black h-5"
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
                <clipPath id="55a6c56226">
                  <path
                    d="M 1.179688 1 L 35.964844 1 L 35.964844 37 L 1.179688 37 Z M 1.179688 1 "
                    clipRule="nonzero"
                  />
                </clipPath>
                <clipPath id="260131a400">
                  <path
                    d="M 12.953125 12.953125 L 14.136719 12.953125 L 14.136719 14.136719 L 12.953125 14.136719 Z M 12.953125 12.953125 "
                    clipRule="nonzero"
                  />
                </clipPath>
                <clipPath id="97a8b2378f">
                  <path
                    d="M 13.542969 12.953125 C 13.21875 12.953125 12.953125 13.21875 12.953125 13.542969 C 12.953125 13.871094 13.21875 14.136719 13.542969 14.136719 C 13.871094 14.136719 14.136719 13.871094 14.136719 13.542969 C 14.136719 13.21875 13.871094 12.953125 13.542969 12.953125 Z M 13.542969 12.953125 "
                    clipRule="nonzero"
                  />
                </clipPath>
              </defs>
              <g clipPath="url(#55a6c56226)">
                <path
                  fill="#000000"
                  d="M 24.121094 24.859375 L 28.019531 19.535156 C 28.441406 18.960938 28.808594 18.347656 29.117188 17.707031 C 29.429688 17.0625 29.675781 16.394531 29.863281 15.707031 C 30.050781 15.015625 30.171875 14.316406 30.230469 13.601562 C 30.289062 12.890625 30.277344 12.179688 30.203125 11.46875 C 30.132812 10.757812 29.992188 10.0625 29.789062 9.375 C 29.585938 8.691406 29.324219 8.03125 29 7.394531 C 28.671875 6.757812 28.292969 6.15625 27.855469 5.589844 C 27.421875 5.019531 26.9375 4.5 26.402344 4.019531 C 25.871094 3.542969 25.300781 3.117188 24.6875 2.742188 C 24.078125 2.371094 23.4375 2.054688 22.765625 1.796875 C 22.097656 1.542969 21.410156 1.347656 20.707031 1.21875 C 20 1.089844 19.289062 1.023438 18.574219 1.023438 C 17.855469 1.023438 17.144531 1.089844 16.441406 1.21875 C 15.734375 1.347656 15.046875 1.542969 14.378906 1.796875 C 13.707031 2.054688 13.070312 2.371094 12.457031 2.742188 C 11.847656 3.117188 11.273438 3.542969 10.742188 4.019531 C 10.210938 4.5 9.726562 5.019531 9.289062 5.589844 C 8.851562 6.15625 8.472656 6.757812 8.148438 7.394531 C 7.824219 8.03125 7.558594 8.691406 7.355469 9.375 C 7.152344 10.0625 7.015625 10.757812 6.941406 11.46875 C 6.867188 12.179688 6.859375 12.890625 6.914062 13.601562 C 6.972656 14.316406 7.09375 15.015625 7.28125 15.707031 C 7.46875 16.394531 7.71875 17.0625 8.027344 17.707031 C 8.335938 18.347656 8.703125 18.960938 9.125 19.535156 L 13.023438 24.859375 C 6.546875 25.578125 1.179688 27.574219 1.179688 30.765625 C 1.179688 34.84375 9.929688 36.976562 18.574219 36.976562 C 27.214844 36.976562 35.964844 34.84375 35.964844 30.765625 C 35.964844 27.574219 30.601562 25.574219 24.121094 24.859375 Z M 10.714844 18.378906 C 10.363281 17.902344 10.058594 17.394531 9.800781 16.859375 C 9.542969 16.320312 9.339844 15.769531 9.183594 15.195312 C 9.027344 14.621094 8.925781 14.039062 8.878906 13.445312 C 8.832031 12.855469 8.835938 12.261719 8.898438 11.671875 C 8.960938 11.082031 9.074219 10.5 9.246094 9.929688 C 9.414062 9.359375 9.632812 8.8125 9.902344 8.28125 C 10.171875 7.753906 10.488281 7.253906 10.851562 6.78125 C 11.214844 6.308594 11.617188 5.875 12.058594 5.476562 C 12.503906 5.078125 12.976562 4.726562 13.488281 4.414062 C 13.996094 4.101562 14.527344 3.839844 15.085938 3.628906 C 15.640625 3.414062 16.210938 3.253906 16.796875 3.144531 C 17.386719 3.039062 17.976562 2.984375 18.574219 2.984375 C 19.167969 2.984375 19.761719 3.039062 20.347656 3.144531 C 20.933594 3.253906 21.503906 3.414062 22.0625 3.628906 C 22.617188 3.839844 23.148438 4.101562 23.660156 4.414062 C 24.167969 4.722656 24.640625 5.078125 25.085938 5.476562 C 25.527344 5.875 25.929688 6.308594 26.292969 6.78125 C 26.65625 7.253906 26.972656 7.753906 27.242188 8.28125 C 27.511719 8.8125 27.734375 9.359375 27.902344 9.929688 C 28.070312 10.5 28.183594 11.082031 28.246094 11.671875 C 28.308594 12.261719 28.316406 12.855469 28.265625 13.445312 C 28.21875 14.039062 28.117188 14.621094 27.960938 15.195312 C 27.808594 15.769531 27.601562 16.320312 27.34375 16.859375 C 27.085938 17.394531 26.78125 17.902344 26.429688 18.378906 L 18.574219 29.105469 Z M 18.574219 35.015625 C 9.15625 35.015625 3.148438 32.5 3.148438 30.765625 C 3.148438 29.308594 7.414062 27.300781 14.375 26.699219 L 17.777344 31.34375 C 17.871094 31.472656 17.988281 31.570312 18.125 31.640625 C 18.265625 31.710938 18.414062 31.746094 18.574219 31.746094 C 18.730469 31.746094 18.878906 31.710938 19.019531 31.640625 C 19.160156 31.570312 19.277344 31.472656 19.367188 31.34375 L 22.769531 26.699219 C 29.734375 27.300781 33.996094 29.308594 33.996094 30.765625 C 33.996094 32.5 27.988281 35.015625 18.574219 35.015625 Z M 18.574219 35.015625 "
                  fillOpacity="1"
                  fillRule="nonzero"
                />
              </g>
              <path
                fill="#000000"
                d="M 24.3125 12.671875 C 24.3125 12.296875 24.273438 11.925781 24.199219 11.554688 C 24.128906 11.1875 24.019531 10.832031 23.875 10.484375 C 23.730469 10.136719 23.554688 9.808594 23.34375 9.496094 C 23.136719 9.183594 22.898438 8.894531 22.628906 8.628906 C 22.363281 8.363281 22.074219 8.128906 21.761719 7.917969 C 21.449219 7.710938 21.117188 7.535156 20.769531 7.390625 C 20.421875 7.246094 20.0625 7.136719 19.691406 7.066406 C 19.324219 6.992188 18.949219 6.957031 18.574219 6.957031 C 18.195312 6.957031 17.824219 6.992188 17.453125 7.066406 C 17.082031 7.136719 16.726562 7.246094 16.378906 7.390625 C 16.027344 7.535156 15.699219 7.710938 15.386719 7.917969 C 15.070312 8.128906 14.78125 8.363281 14.515625 8.628906 C 14.25 8.894531 14.011719 9.183594 13.800781 9.496094 C 13.59375 9.808594 13.414062 10.136719 13.269531 10.484375 C 13.128906 10.832031 13.019531 11.1875 12.945312 11.554688 C 12.871094 11.921875 12.835938 12.296875 12.835938 12.671875 C 12.835938 13.046875 12.871094 13.417969 12.945312 13.785156 C 13.019531 14.152344 13.128906 14.511719 13.269531 14.859375 C 13.414062 15.203125 13.59375 15.535156 13.800781 15.847656 C 14.011719 16.15625 14.25 16.445312 14.515625 16.710938 C 14.78125 16.976562 15.070312 17.214844 15.382812 17.421875 C 15.699219 17.632812 16.027344 17.808594 16.375 17.949219 C 16.726562 18.09375 17.082031 18.203125 17.453125 18.277344 C 17.824219 18.351562 18.195312 18.386719 18.574219 18.386719 C 18.949219 18.386719 19.324219 18.347656 19.691406 18.277344 C 20.0625 18.203125 20.417969 18.09375 20.769531 17.949219 C 21.117188 17.804688 21.445312 17.628906 21.757812 17.421875 C 22.074219 17.210938 22.363281 16.976562 22.628906 16.710938 C 22.894531 16.445312 23.132812 16.15625 23.34375 15.84375 C 23.550781 15.53125 23.726562 15.203125 23.871094 14.855469 C 24.015625 14.511719 24.125 14.152344 24.199219 13.785156 C 24.273438 13.417969 24.3125 13.046875 24.3125 12.671875 Z M 14.804688 12.671875 C 14.804688 12.171875 14.898438 11.695312 15.089844 11.234375 C 15.28125 10.773438 15.554688 10.367188 15.90625 10.015625 C 16.261719 9.664062 16.667969 9.394531 17.128906 9.203125 C 17.59375 9.011719 18.074219 8.917969 18.574219 8.917969 C 19.074219 8.917969 19.554688 9.011719 20.015625 9.203125 C 20.476562 9.394531 20.882812 9.664062 21.238281 10.015625 C 21.589844 10.367188 21.863281 10.773438 22.054688 11.234375 C 22.246094 11.695312 22.34375 12.171875 22.34375 12.671875 C 22.34375 13.167969 22.246094 13.648438 22.054688 14.109375 C 21.863281 14.566406 21.589844 14.972656 21.238281 15.324219 C 20.882812 15.675781 20.476562 15.949219 20.015625 16.140625 C 19.554688 16.328125 19.074219 16.425781 18.574219 16.425781 C 18.074219 16.425781 17.59375 16.328125 17.132812 16.136719 C 16.667969 15.949219 16.261719 15.675781 15.910156 15.324219 C 15.554688 14.972656 15.28125 14.566406 15.089844 14.105469 C 14.898438 13.648438 14.804688 13.167969 14.804688 12.671875 Z M 14.804688 12.671875 "
                fillOpacity="1"
                fillRule="nonzero"
              />
              <g clipPath="url(#260131a400)">
                <g clipPath="url(#97a8b2378f)">
                  <path
                    fill="#000000"
                    d="M 12.953125 12.953125 L 14.136719 12.953125 L 14.136719 14.136719 L 12.953125 14.136719 Z M 12.953125 12.953125 "
                    fillOpacity="1"
                    fillRule="nonzero"
                  />
                </g>
              </g>
            </svg>
            {patient.address}
          </p>
          <p className="flex gap-1 items-center justify-start mt-2 text-base text-black">
            <svg
              className="fill-black h-5"
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
                <clipPath id="263708f090">
                  <path
                    d="M 0 0 L 37.007812 0 L 37.007812 37 L 0 37 Z M 0 0 "
                    clipRule="nonzero"
                  />
                </clipPath>
              </defs>
              <g clipPath="url(#263708f090)">
                <path
                  d="M 25.632812 26.082031 C 26.183594 26.773438 25.523438 27.535156 25.207031 27.824219 C 24.800781 28.210938 24.277344 28.527344 23.636719 28.765625 C 23.308594 28.886719 23.050781 28.960938 22.800781 28.992188 L 22.652344 29.011719 C 22.023438 29.078125 21.316406 29.019531 20.484375 28.832031 C 18.835938 28.484375 17.308594 27.484375 15.800781 25.792969 C 15.574219 25.574219 13.859375 23.855469 12.761719 21.4375 C 11.65625 18.984375 11.519531 16.582031 11.507812 16.320312 C 11.238281 14.011719 11.515625 12.210938 12.328125 10.75 C 12.78125 9.953125 13.25 9.34375 13.753906 8.910156 C 13.933594 8.75 14.167969 8.605469 14.480469 8.4375 C 15.066406 8.144531 15.640625 7.957031 16.179688 7.902344 C 16.515625 7.871094 17.660156 7.839844 17.804688 8.734375 L 17.953125 10.269531 C 18.023438 10.953125 18.171875 12.683594 18.171875 12.683594 C 18.28125 13.777344 18.152344 14.355469 17.085938 14.503906 C 17.003906 14.511719 16.925781 14.5 16.824219 14.5 C 16.585938 14.472656 16.371094 14.460938 16.179688 14.460938 L 15.402344 14.46875 L 15.417969 15.242188 C 15.4375 16.109375 15.746094 18.34375 16.40625 19.8125 C 17.015625 21.167969 18.429688 22.894531 19.175781 23.578125 L 19.75 24.101562 L 20.265625 23.515625 C 20.382812 23.382812 20.515625 23.214844 20.589844 23.117188 C 20.71875 22.945312 20.777344 22.859375 20.835938 22.816406 C 21.105469 22.582031 21.359375 22.453125 21.613281 22.429688 C 22.105469 22.378906 22.476562 22.734375 22.90625 23.210938 Z M 37.007812 18.503906 C 37.007812 28.710938 28.722656 36.992188 18.503906 36.992188 C 8.285156 36.992188 0 28.710938 0 18.503906 C 0 8.296875 8.285156 0.015625 18.503906 0.015625 C 28.722656 0.015625 37.007812 8.296875 37.007812 18.503906 Z M 34.195312 18.503906 C 34.195312 9.847656 27.167969 2.828125 18.503906 2.828125 C 9.835938 2.828125 2.8125 9.847656 2.8125 18.503906 C 2.8125 27.160156 9.835938 34.179688 18.503906 34.179688 C 27.167969 34.179688 34.195312 27.160156 34.195312 18.503906 Z M 34.195312 18.503906 "
                  fillOpacity="1"
                  fillRule="nonzero"
                />
              </g>
              <path
                strokeLinecap="butt"
                transform="matrix(0.473821, 0.568585, -0.568585, 0.473821, 12.864928, 17.89973)"
                fill="none"
                strokeLinejoin="miter"
                d="M 0.00128775 0.498619 L 12.495234 0.501998 "
                stroke="#000000"
                strokeWidth="1"
                strokeOpacity="1"
                strokeMiterlimit="4"
              />
            </svg>
            {patient.phone}
          </p>
          <p className="flex gap-1 items-center justify-start mt-2 text-base">
            <svg
              className="fill-black h-5"
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
                <clipPath id="7f43d0afe4">
                  <path
                    d="M 0 4.238281 L 37 4.238281 L 37 33.105469 L 0 33.105469 Z M 0 4.238281 "
                    clipRule="nonzero"
                  />
                </clipPath>
              </defs>
              <g clipPath="url(#7f43d0afe4)">
                <path
                  fill="#000000"
                  d="M 1.03125 25.308594 C 3.042969 25.308594 5.054688 25.308594 7.066406 25.308594 C 7.410156 25.308594 7.691406 25.074219 7.792969 24.753906 C 9.050781 20.730469 10.304688 16.707031 11.5625 12.683594 C 11.078125 12.683594 10.59375 12.683594 10.109375 12.683594 C 11.617188 16.875 13.125 21.066406 14.636719 25.257812 C 14.875 25.925781 15.894531 26.027344 16.089844 25.257812 C 17.765625 18.636719 19.441406 12.011719 21.117188 5.390625 C 20.632812 5.390625 20.148438 5.390625 19.664062 5.390625 C 21.257812 14.445312 22.847656 23.496094 24.441406 32.550781 C 24.554688 33.179688 25.546875 33.296875 25.820312 32.730469 C 27.03125 30.226562 28.242188 27.722656 29.453125 25.222656 C 29.753906 24.597656 28.515625 25.308594 29.332031 25.308594 C 30.125 25.308594 30.917969 25.308594 31.710938 25.308594 C 33.136719 25.308594 34.558594 25.308594 35.980469 25.308594 C 36.953125 25.308594 36.953125 23.800781 35.980469 23.800781 C 33.636719 23.800781 31.289062 23.800781 28.941406 23.800781 C 28.691406 23.800781 28.402344 23.9375 28.289062 24.171875 C 27.03125 26.769531 25.777344 29.371094 24.519531 31.96875 C 24.976562 32.027344 25.4375 32.085938 25.898438 32.148438 C 24.304688 23.097656 22.710938 14.042969 21.117188 4.992188 C 20.988281 4.238281 19.839844 4.300781 19.664062 4.992188 C 17.988281 11.613281 16.3125 18.234375 14.636719 24.855469 C 15.121094 24.855469 15.605469 24.855469 16.089844 24.855469 C 14.582031 20.664062 13.074219 16.472656 11.5625 12.28125 C 11.3125 11.589844 10.339844 11.542969 10.109375 12.28125 C 8.851562 16.304688 7.59375 20.328125 6.335938 24.351562 C 6.578125 24.167969 6.820312 23.984375 7.066406 23.800781 C 5.054688 23.800781 3.042969 23.800781 1.03125 23.800781 C 0.0546875 23.800781 0.0546875 25.308594 1.03125 25.308594 Z M 1.03125 25.308594 "
                  fillOpacity="1"
                  fillRule="nonzero"
                />
              </g>
            </svg>
            {patient.medicalConditions.join(", ")}
          </p>
        </div>
      </div>
      <p className="flex gap-1 items-center justify-center m-2 text-base">
        click here for more info
      </p>
      <Collapse open={open}>
        <Card className="mt-4 mx-auto w-full rounded-lg">
          <CardBody>
            <Typography className="text-black">{patient.about}</Typography>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}
