import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPatientByPatientId } from "../../axios/patient.axios";
import { getTasksForSpecificDay } from "../../axios/task.axios";

export default function GuardianDayReview() {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
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
    getPatientByPatientId(patient_id).then((patient) => {
      setIsLoading(false);
      setPatient(patient);
      setCarer(patient.carers[0]);
      getTasksForSpecificDay(patient_id, isoDate).then((tasks) => {
        console.log(tasks);
        setTasks(tasks);
      });
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
