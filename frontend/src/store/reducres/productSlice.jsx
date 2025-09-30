import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productData: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    loadproduct: (state, action) => {
      state.productData = action.payload;
    },
  },
});

export const { loadproduct } = productSlice.actions;
export default productSlice.reducer;
