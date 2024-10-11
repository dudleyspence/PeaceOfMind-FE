import { peaceOfMindAPI } from "./axios";

export const addNewUser = (user_id, name, email, role, photo) => {
  console.log(user_id, name, email, role);
  const user = {
    firebaseUID: user_id,
    name: name,
    email: email,
    role: role,
  };

  if (photo) {
    user.profileImageURL = photo;
  }

  return peaceOfMindAPI.post(`/user`, user).then(({ data }) => {
    console.log(data);
    return data;
  });
};

export const getUserByFirebaseUID = (firebaseUID) => {
  console.log(firebaseUID);
  return peaceOfMindAPI.get(`/user/UID/${firebaseUID}`).then(({ data }) => {
    console.log(data);
    return data;
  });
};
