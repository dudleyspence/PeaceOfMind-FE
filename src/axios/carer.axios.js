import { peaceOfMindAPI } from "./axios";

export const getCarerByUserId = (user_id) => {
  return peaceOfMindAPI.get(`/carer/${user_id}`).then(({ data }) => {
    console.log(data);
    return data;
  });
};
