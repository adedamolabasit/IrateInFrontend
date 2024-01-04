import axios from "../axios";

// Auth services
export const signup = (user) => {
  return axios.post("/register/", user);
};

export const signin = (user) => {
  return axios.post("/login/", user);
};

export const getUsers = () => {
  return axios.get("/users/");
};

export const getSingleUser = (id) => {
  return axios.get(`/users/${id}/`);
};