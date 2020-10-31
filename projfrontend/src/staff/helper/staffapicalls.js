import { API } from "../../backend";

export const getAllUsers = () => {
  return fetch(`${API}users`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
export const getAnswerSheet = (userId) => {
  console.log(typeof userId, userId);
  let passingObj = {
    userId: userId,
  };
  return fetch(`${API}correction`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(passingObj),
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .catch((err) => console.log(err));
};
