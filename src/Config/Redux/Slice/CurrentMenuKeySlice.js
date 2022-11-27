import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  key: localStorage.getItem("menuKey"),
};

export const CurrentMenuKeylice = createSlice({
  name: "CurrentMenuKey",
  initialState,
  reducers: {
    changeCurrentMenuKey: (state, action) => {
      state.key = action.payload;
      localStorage.setItem("menuKey", action.payload);
    },
  },
});

export const { changeCurrentMenuKey } = CurrentMenuKeylice.actions;

export default CurrentMenuKeylice.reducer;
