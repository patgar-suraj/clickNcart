import axios from "../../api/axiosconfig";
import { loaduser, removeuser } from "../reducres/userSlice";
import { toast } from "react-toastify";

// register user
export const asyncregisteruser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(loaduser(data));
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
    if (data.length > 0) {
      const loggedInUser = data[0];
      dispatch(loaduser(loggedInUser));
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      return { success: "true", user: loggedInUser };
    } else {
      return { success: "false" };
    }
  } catch (error) {
    toast.error("Something went wrong while logging in!");
    return { success: "false" };
  }
};

// logout user
export const asynclogoutuser = (user) => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeuser());
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
    }
  } catch (error) {
    console.log(error);
  }
};

// update user
export const asyncUpdateUser = (id, user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch("/users/" + id, user);
    localStorage.setItem("user", JSON.stringify(data));
    dispatch(asynccurrentuser());
  } catch (error) {
    console.log("error", error);
  }
};

// delete user
export const asyncDeleteUser = (id) => async (dispatch, getState) => {
  try {
    await axios.delete("/users/" + id);
    dispatch(asynclogoutuser());
  } catch (error) {
    console.log("error", error);
  }
};
