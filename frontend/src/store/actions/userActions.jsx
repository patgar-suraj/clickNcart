import axios from "../../api/axiosconfig";
import { loaduser } from "../reducres/userSlice";

// register user
export const asyncregisteruser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// login user
export const asyncloginuser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data[0]));
  } catch (error) {
    console.log(error);
  }
};

// logout user
export const asynclogoutuser = (user) => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user")
    console.log("User Logged out")
  } catch (error) {
    console.log(error);
  }
};

// current user
export const asynccurrentuser = (user) => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(loaduser(user));
    else console.log("User not logged in");
  } catch (error) {
    console.log(error);
  }
};
