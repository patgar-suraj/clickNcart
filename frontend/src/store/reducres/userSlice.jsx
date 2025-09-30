import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loaduser: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { loaduser } = userSlice.actions;
export default userSlice.reducer;
