import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPatientByPatientId } from "../../../axios/patient.axios";

import PatientInfoCard from "../PatientTabs/PatientInfoCard";
import CarerInfoCard from "../PatientTabs/PatientCarerInfoCard";
import SelectDate from "../PatientTabs/SelectCareDay";
import RepeatingTasksList from "./PatientCarePlanDesktop";
import ProgressTab from "../PatientTabs/PatientProgressTab";

export default function GuardianPatientViewDesktop() {
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
      setIsLoading(false);
      setPatient(patient);
      setCarer(patient.carers[0]);
    });
  }, [patient_id]);

  return isLoading ? (
    "Loading"
  ) : (
    <div className="min-h-[calc(100vh-6rem)] w-full flex justify-center items-center">
      <div
        id="patient-homepage"
        className="grid grid-cols-2 w-full h-full gap-5 max-w-3xl max-h-lg"
      >
        <PatientInfoCard patient={patient} />
        <div className="row-span-2">
          <SelectDate patient_id={patient._id} />
        </div>
        <CarerInfoCard carer={carer} />
        <RepeatingTasksList patient_id={patient_id} />
        <ProgressTab />
      </div>
    </div>
  );
}