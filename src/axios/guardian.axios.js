import { peaceOfMindAPI } from "./axios";

export const getGuardianByUserId = (user_id) => {
  return peaceOfMindAPI.get(`/guardian/${user_id}`).then(({ data }) => {
    console.log(data);
    return data;
  });
};
