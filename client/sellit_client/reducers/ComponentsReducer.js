import { createSlice } from "@reduxjs/toolkit";

const componentsSlice = createSlice({
  name: "componentsState",
  initialState: {
    drawer: false,
  },
  reducers: {
    drawerOpen: (state, action) => {
      state.drawer = true;
    },

    drawerClose: (state, action) => {
      state.drawer = false;
    },
  },
});

export const { drawerOpen, drawerClose } = componentsSlice.actions;
export default componentsSlice.reducer;
