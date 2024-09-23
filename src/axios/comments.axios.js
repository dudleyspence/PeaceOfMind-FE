import { peaceOfMindAPI } from "./axios";

export const getCommentsForSingleDay = (patient_id, isoDate) => {
  return peaceOfMindAPI
    .get(`/patients/${patient_id}/${isoDate}/comments`)
    .then(({ data }) => {
      return data;
    });
};

export const postComment = (
  commentText,
  patient_id,
  isoDate,
  author,
  authorType
) => {
  const comment = {
    text: commentText,
    patient: patient_id,
    author: author,
    authorType: authorType,
    dateOfComment: isoDate,
  };
  return peaceOfMindAPI.post(`/comments`, comment).then(({ data }) => {
    return data;
  });
};
