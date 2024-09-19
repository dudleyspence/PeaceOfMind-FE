import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatientByPatientId } from "../../axios/patient.axios";

import PatientInfoCard from "../Patient/patientInfoCard";
import CarerInfoCard from "../Patient/CarerInfoCard";
import SelectDate from "../Patient/SelectDate";
import RepeatingTasksList from "./RepeatingTasksList";

export default function GuardianPatientView() {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [carer, setCarer] = useState(() => {
    if (patient) {
      return patient.carers[0];
    } else {
      setIsLoading(true);
      return null;
    }
  });
  const { patient_id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getPatientByPatientId(patient_id).then((patient) => {
      console.log(patient);
      setIsLoading(false);
      setPatient(patient);
      setCarer(patient.carers[0]);
    });
  }, []);
  return isLoading ? (
    "Loading"
  ) : (
    <div className="min-h-[calc(100%-6rem)] w-full">
      <div
        id="patient-homepage"
        className="flex flex-col justify-center items-center w-full h-full gap-5 my-5"
      >
        <div className="w-full flex flex-row items-start justify-center gap-10">
          <PatientInfoCard patient={patient} />
          <CarerInfoCard carer={carer} />
        </div>
        <div className="w-full flex flex-row items-start justify-center gap-10">
          <SelectDate patient_id={patient._id} />
          <RepeatingTasksList patient_id={patient_id} />
        </div>
      </div>
    </div>
  );
}
