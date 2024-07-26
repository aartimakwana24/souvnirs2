import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  login: "",
  darkMode: false,
  sidebarExpanded: false,
};

export const appConfigSlice = createSlice({
  name: "appConfig",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarExpanded = !state.sidebarExpanded;
    },
    getLoginInfo: (state, action) => {
      state.login = action.payload;
    },
    setActiveLink: (state, payload) => {
      state.activeLink = payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { getLoginInfo, toggleSidebar, setActiveLink, toggleDarkMode } =
  appConfigSlice.actions;
export default appConfigSlice.reducer;