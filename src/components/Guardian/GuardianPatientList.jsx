import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { PatientProgressBar } from "../Patient/PatientTabs/PatientProgressBar";
import { useNavigate } from "react-router-dom";
export default function GuardianPatientList() {
  const { guardianLoggedIn, carerLoggedIn } = useContext(UserContext);
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

  function handlePatientClick(patient_id) {
    navigate(`/patient/${patient_id}`);
  }

  return isLoading ? (
    "Loading patients"
  ) : (
    <div className="w-full">
      <ul className="flex flex-col justify-center items-center text-black">
        <p className="text-center">Click below to check in with:</p>

        {patientsList.map((patient) => (
          <li
            onClick={() => {
              handlePatientClick(patient._id);
            }}
            key={patient._id}
            className="flex flex-row items-center justify-between gap-4 bg-white w-full p-5 mt-7 px-8 rounded-md shadow-lg max-w-md  hover:shadow-2xl cursor-pointer text-black"
          >
            <div>
              <p className="mb-3 font-bold">{patient.name}</p>
              <PatientProgressBar />
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
