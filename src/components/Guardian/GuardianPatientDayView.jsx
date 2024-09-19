import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPatientByPatientId } from "../../axios/patient.axios";

export default function GuardianPatientDayView() {
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
  const { patient_id, isoDate } = useParams();

  useEffect(() => {
    setIsLoading(true);
    console.log(patient_id);
    getPatientByPatientId({ patient_id }).then((patient) => {
      setIsLoading(false);
      setPatient(patient);
      setCarer(patient.carers[0]);
    });
  }, []);

  return isLoading ? (
    "loading"
  ) : (
    <div>
      <p>{patient_id}</p>
      <p>{isoDate}</p>
    </div>
  );
}
