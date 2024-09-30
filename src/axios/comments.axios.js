import { peaceOfMindAPI } from "./axios";

export const getPatientComments = (patient_id) => {
  return peaceOfMindAPI
    .get(`/patients/${patient_id}/comments`)
    .then(({ data }) => data);
};

export const postComment = (commentText, patient_id, author, authorType) => {
  const comment = {
    text: commentText,
    patient: patient_id,
    author: author,
    authorType: authorType,
  };
  return peaceOfMindAPI.post(`/comments`, comment).then(({ data }) => {
    return data;
  });
};
