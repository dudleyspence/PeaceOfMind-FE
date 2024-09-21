import { peaceOfMindAPI } from "./axios";

export const getPatientByPatientId = (patient_id) => {
  return peaceOfMindAPI.get(`/patients/${patient_id}`).then(({ data }) => {
    return data;
  });
};
