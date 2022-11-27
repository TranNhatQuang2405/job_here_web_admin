import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    show: false,
    visible: false
};

export const MenuSlice = createSlice({
    name: "Menu",
    initialState,
    reducers: {
        toggleMenu: (state, action) => {
            state.show = !state.show;
        },
        visbleMenu: (state, action) => {
            state.visible = true;
        },
        disableMenu: (state, action) => {
            state.visible = false;
        }

    },
});

export const { toggleMenu, visbleMenu, disableMenu } = MenuSlice.actions;

export default MenuSlice.reducer;
