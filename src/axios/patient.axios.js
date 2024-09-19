import { peaceOfMindAPI } from "./axios";

export const getPatientByPatientId = (patient_id) => {
  console.log(patient_id);
  return peaceOfMindAPI.get(`/patients/${patient_id}`).then(({ data }) => {
    console.log(data);
    return data;
  });
};
