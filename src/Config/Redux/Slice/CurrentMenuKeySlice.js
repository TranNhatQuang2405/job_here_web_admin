import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  key: "1",
};

export const CurrentMenuKeylice = createSlice({
  name: "CurrentMenuKey",
  initialState,
  reducers: {
    changeCurrentMenuKey: (state, action) => {
      state.key = action.payload;
    },
  },
});

export const { changeCurrentMenuKey } = CurrentMenuKeylice.actions;

export default CurrentMenuKeylice.reducer;
