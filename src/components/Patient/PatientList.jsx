import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
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
    <div>
      <ul>
        {patientsList.map((patient) => {
          {
            console.log(patient);
          }
          <li key={patient._id}>
            <p>Click here to check in with:</p>
            <p>{patient.name}</p>
          </li>;
        })}
      </ul>
    </div>
  );
}
