import { createSlice } from "@reduxjs/toolkit";

const componentsSlice = createSlice({
  name: "componentsState",
  initialState: {
    drawer: false,
    activeScreen: "HomePage",
    image: null,
  },
  reducers: {
    drawerOpen: (state, action) => {
      state.drawer = true;
    },

    drawerClose: (state, action) => {
      state.drawer = false;
    },

    setActiveScreen: (state, action) => {
      state.activeScreen = action.payload;
    },

    setImage: (state, action) => {
      state.image = action.payload;
    },

    setImageNull: (state, action) => {
      state.image = null;
    },
  },
});

export const {
  drawerOpen,
  drawerClose,
  setActiveScreen,
  setImage,
  setImageNull,
} = componentsSlice.actions;
export default componentsSlice.reducer;
