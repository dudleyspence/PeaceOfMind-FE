import { peaceOfMindAPI } from "./axios";

export const getPatientByPatientId = (patient_id) => {
  return peaceOfMindAPI.get(`/patients/${patient_id}`).then(({ data }) => {
    return data;
  });
};

export const updatePatient = (patient_id, update) => {
  return peaceOfMindAPI
    .patch(`/patients/${patient_id}`, update)
    .then(({ data }) => {
      return data;
    });
};

export const addPatient = (patient) => {
  return peaceOfMindAPI.post(`/patients`, patient).then(({ data }) => {
    return data;
  });
};
