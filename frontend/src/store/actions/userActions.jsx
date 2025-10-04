import axios from "../../api/axiosconfig";
import { loaduser, removeuser } from "../reducres/userSlice";

// register user
export const asyncregisteruser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(loaduser(data));
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

// update user
export const asyncUpdateUser = (id, user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch("/users/" + id, user);
    dispatch(loaduser(data));
    localStorage.setItem("user", JSON.stringify(data));
    console.log("Updated User:", data);
  } catch (error) {
    console.log("error", error);
  }
};

// login user
export const asyncloginuser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );
    if (data.length > 0) {
      const loggedInUser = data[0];

      // Save to localStorage + Redux
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      dispatch(loaduser(loggedInUser));

      console.log("Logged in User:", loggedInUser);
    } else {
      console.log("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
  }
};

// logout user
export const asynclogoutuser = (user) => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeuser());
    console.log("User Logged out");
  } catch (error) {
    console.log(error);
  }
};

// current user
export const asynccurrentuser = () => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(loaduser(user));
    } else {
      dispatch(loaduser(null));
      console.log("User not logged in");
    }
  } catch (error) {
    console.log(error);
  }
};
