import { peaceOfMindAPI } from "./axios";

export const addNewUser = (user_id, name, email, role) => {
  const user = {
    _id: user_id,
    name: name,
    email: email,
    role: role,
  };
  return peaceOfMindAPI.post(`/user`, user).then(({ data }) => {
    return data;
  });
};
