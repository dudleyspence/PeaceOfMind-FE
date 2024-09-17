import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { ProgressBar } from "../General/ProgressBar";
export default function PatientList() {
  const { guardianLoggedIn, carerLoggedIn } = useContext(UserContext);
  const [patientsList, setPatientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return isLoading ? (
    "Loading patients"
  ) : (
    <div className="w-full">
      <ul className="flex flex-col justify-center items-center">
        <p className="text-center">Click below to check in with:</p>

        {patientsList.map((patient) => (
          <li
            key={patient._id}
            className="flex flex-row items-center justify-between gap-4 bg-blue-200 w-full p-5 mt-7 px-8 rounded-md shadow-md max-w-md"
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
        ))}
      </ul>
    </div>
  );
}
