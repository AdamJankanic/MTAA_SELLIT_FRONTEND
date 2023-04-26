import { createSlice } from "@reduxjs/toolkit";

const componentsSlice = createSlice({
  name: "componentsState",
  initialState: {
    drawer: false,
    activeScreen: "HomePage",
    image: null,
    user: null,
    websocketUUID: [],
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

    setUser: (state, action) => {
      state.user = action.payload;
    },

    addWebSocketUUID: (state, action) => {
      state.websocketUUID.push(action.payload);
    },
  },
});

export const {
  drawerOpen,
  drawerClose,
  setActiveScreen,
  setImage,
  setImageNull,
  setUser,
  addWebSocketUUID,
} = componentsSlice.actions;
export default componentsSlice.reducer;
