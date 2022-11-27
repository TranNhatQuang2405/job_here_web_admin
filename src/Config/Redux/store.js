import { configureStore } from "@reduxjs/toolkit";
import CurrentPageSlice from "./Slice/CurrentPageSlice";
import HeaderRequestSlice from "./Slice/HeaderRequestSlice";
import UserSlice from "./Slice/UserSlice";
import MenuSlice from "./Slice/MenuSlice";
import CurrentMenuKeylice from "./Slice/CurrentMenuKeySlice";

export const store = configureStore({
  reducer: {
    CurrentPage: CurrentPageSlice,
    HeaderRequest: HeaderRequestSlice,
    User: UserSlice,
    Menu: MenuSlice,
    MenuKey: CurrentMenuKeylice
  },
});
