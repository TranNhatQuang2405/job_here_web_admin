import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    show: false
};

export const MenuSlice = createSlice({
    name: "Menu",
    initialState,
    reducers: {
        toggleMenu: (state, action) => {
            state.show = !state.show;
        },
    },
});

export const { toggleMenu } = MenuSlice.actions;

export default MenuSlice.reducer;
