import React from "react";
import { Typography } from "@material-tailwind/react";
import { selectPatientGuardian } from "../../../state/slices/patientSlice";
import { useSelector } from "react-redux";

export default function GuardianInfoCard() {
  const guardian = useSelector(selectPatientGuardian);

  return (
    <div className="flex flex-row justify-start bg-cyan-900 w-full max-w-96  rounded-lg text-white shadow-md">
      <div className="w-1/4 h-auto aspect-square rounded-lg overflow-hidden max-w-36">
        <img
          src={guardian.user.profileImageURL}
          alt="patient image"
          className="w-full h-full object-cover transform scale-110"
        />
      </div>
      <div id="contact-info">
        <p className="font-bold mt-1 text-center text-white">
          Guardian: {guardian.user.name}
        </p>
        <p className="flex gap-1 items-center justify-start text-base">
          <svg
            className="h-4 !fill-white"
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
              <clipPath id="c5322551d6">
                <path
                  d="M 0 3.367188 L 37 3.367188 L 37 30.753906 L 0 30.753906 Z M 0 3.367188 "
                  clipRule="nonzero"
                />
              </clipPath>
            </defs>
            <g clipPath="url(#c5322551d6)">
              <path
                d="M 34.101562 30.75 L 2.867188 30.75 C 2.628906 30.71875 2.457031 30.695312 2.351562 30.671875 C 1.347656 30.464844 0.519531 29.6875 0.183594 28.765625 C 0.0859375 28.488281 0.046875 28.199219 0 27.90625 L 0 6.167969 C 0.0507812 6.027344 0.046875 5.871094 0.078125 5.75 C 0.117188 5.589844 0.15625 5.40625 0.222656 5.257812 C 0.644531 4.28125 1.382812 3.679688 2.429688 3.449219 C 2.527344 3.425781 2.625 3.414062 2.722656 3.410156 C 2.851562 3.40625 2.980469 3.375 3.113281 3.375 C 13.289062 3.371094 23.574219 3.371094 33.964844 3.375 C 34.046875 3.375 34.125 3.378906 34.203125 3.390625 C 34.28125 3.402344 34.359375 3.414062 34.4375 3.425781 C 34.710938 3.460938 34.949219 3.523438 35.160156 3.617188 C 36.152344 4.054688 36.886719 4.976562 36.960938 6.078125 C 36.972656 6.257812 36.992188 6.429688 36.988281 6.605469 C 36.949219 12.066406 36.96875 17.527344 36.972656 23.371094 C 36.972656 24.625 37.003906 25.941406 36.988281 27.257812 C 36.980469 27.664062 36.972656 27.941406 36.957031 28.085938 C 36.875 28.949219 36.464844 29.652344 35.722656 30.195312 C 35.367188 30.457031 34.972656 30.621094 34.535156 30.691406 C 34.390625 30.714844 34.246094 30.734375 34.101562 30.75 Z M 17.945312 19.832031 C 18.414062 20.007812 18.964844 19.894531 19.332031 19.558594 C 22.554688 16.589844 25.761719 13.65625 28.945312 10.75 C 30.789062 9.070312 32.613281 7.398438 34.421875 5.738281 C 34.449219 5.714844 34.449219 5.6875 34.425781 5.660156 C 34.382812 5.617188 34.320312 5.59375 34.242188 5.59375 C 23.683594 5.589844 13.257812 5.589844 2.957031 5.589844 C 2.757812 5.589844 2.640625 5.636719 2.503906 5.765625 C 2.484375 5.785156 2.484375 5.800781 2.503906 5.820312 C 2.617188 5.914062 2.726562 6.011719 2.835938 6.113281 C 4.066406 7.222656 5.441406 8.480469 6.96875 9.886719 C 10.246094 12.910156 13.429688 15.832031 16.515625 18.65625 C 16.789062 18.90625 17.070312 19.164062 17.359375 19.425781 C 17.589844 19.636719 17.785156 19.773438 17.945312 19.832031 Z M 34.6875 8.636719 C 34.6875 8.628906 34.683594 8.625 34.675781 8.617188 C 34.667969 8.613281 34.660156 8.613281 34.652344 8.617188 C 34.398438 8.8125 34.195312 9.039062 33.953125 9.261719 C 31.335938 11.664062 28.648438 14.140625 25.894531 16.691406 C 25.871094 16.714844 25.839844 16.738281 25.8125 16.757812 C 25.769531 16.785156 25.769531 16.816406 25.808594 16.847656 C 25.898438 16.925781 25.980469 16.996094 26.050781 17.058594 C 27.539062 18.4375 29.140625 19.933594 30.859375 21.539062 C 31.191406 21.847656 31.480469 22.125 31.734375 22.371094 C 32.003906 22.632812 32.296875 22.886719 32.566406 23.148438 C 32.78125 23.355469 32.988281 23.550781 33.191406 23.734375 C 33.53125 24.039062 33.84375 24.355469 34.183594 24.660156 C 34.34375 24.804688 34.503906 24.957031 34.652344 25.113281 C 34.660156 25.117188 34.667969 25.121094 34.675781 25.117188 C 34.691406 25.117188 34.695312 25.109375 34.695312 25.101562 C 34.699219 19.621094 34.695312 14.144531 34.695312 8.671875 C 34.695312 8.664062 34.695312 8.65625 34.691406 8.652344 C 34.6875 8.648438 34.6875 8.640625 34.6875 8.636719 Z M 2.339844 25.121094 C 2.566406 24.894531 2.816406 24.65625 3.082031 24.402344 C 5.480469 22.152344 7.84375 19.917969 10.179688 17.707031 C 10.445312 17.453125 10.726562 17.191406 11.019531 16.921875 C 11.074219 16.871094 11.074219 16.820312 11.015625 16.765625 C 10.90625 16.667969 10.796875 16.570312 10.695312 16.476562 C 7.875 13.863281 5.21875 11.417969 2.726562 9.136719 C 2.574219 9 2.433594 8.867188 2.296875 8.742188 C 2.289062 8.734375 2.285156 8.734375 2.285156 8.742188 L 2.277344 25.09375 C 2.277344 25.152344 2.296875 25.160156 2.339844 25.121094 Z M 18.609375 22.199219 C 17.488281 22.25 16.582031 21.847656 15.761719 21.082031 C 15.015625 20.390625 14.09375 19.535156 12.996094 18.523438 C 12.953125 18.480469 12.902344 18.441406 12.847656 18.398438 C 12.8125 18.375 12.777344 18.375 12.746094 18.40625 C 12.605469 18.527344 12.476562 18.667969 12.34375 18.792969 C 9.480469 21.496094 6.648438 24.175781 3.84375 26.835938 C 3.488281 27.175781 3.171875 27.46875 2.894531 27.71875 C 2.738281 27.859375 2.589844 28 2.453125 28.136719 C 2.414062 28.175781 2.414062 28.210938 2.449219 28.25 C 2.671875 28.484375 2.867188 28.46875 3.226562 28.46875 C 13.484375 28.46875 23.742188 28.46875 34 28.46875 C 34.25 28.46875 34.390625 28.441406 34.527344 28.242188 C 34.558594 28.195312 34.550781 28.152344 34.511719 28.113281 C 31.207031 25.023438 27.902344 21.929688 24.597656 18.832031 C 24.414062 18.660156 24.257812 18.503906 24.128906 18.363281 C 24.089844 18.320312 24.046875 18.320312 24.003906 18.359375 C 23.070312 19.210938 22.148438 20.074219 21.222656 20.929688 C 20.871094 21.261719 20.59375 21.488281 20.402344 21.609375 C 19.828125 21.976562 19.234375 22.171875 18.609375 22.199219 Z M 18.609375 22.199219 "
                fillOpacity="1"
                fillRule="nonzero"
              />
            </g>
          </svg>
          {guardian.user.email}
        </p>
        <p className="flex gap-1 items-center justify-start mt-2 text-base">
          <svg
            className="fill-white h-4"
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
          {guardian.phone}
        </p>
      </div>
    </div>
  );
}
