import { createSlice } from "@reduxjs/toolkit";

const messagesTest = [
  {
    id: 1,
    channelId: 1,
    userId: 1,
    nickname: "Mark",
    message: "Hello",
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 2,
    channelId: 1,
    userId: 2,
    nickname: "John",
    message: "Hi",
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 3,
    channelId: 1,
    userId: 1,
    nickname: "Mark",
    message: "How are you?",
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 4,
    channelId: 1,
    userId: 1,
    nickname: "Mark",
    message: "Are you there?",
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 5,
    channelId: 1,
    userId: 2,
    nickname: "John",
    message: "I'm fine, thanks",
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 6,
    channelId: 2,
    userId: 1,
    nickname: "Mark",
    message: "Hello",
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 7,
    channelId: 2,
    userId: 2,
    nickname: "John",
    message: "Hi",
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 8,
    channelId: 2,
    userId: 2,
    nickname: "John",
    message: "How are you?",
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 9,
    channelId: 2,
    userId: 1,
    nickname: "Mark",
    message: "Good.",
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
];

const channelsTest = [
  {
    id: 1,
    title: "Topanky",
    myOffer: true,
    offerId: 1,
    price: 100,
    nickname: "John",
    message: "I'm fine, thanks",
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 2,
    title: "Panvica",
    myOffer: false,
    offerId: 1,
    price: 150,
    nickname: "Mark",
    message: "Good.",
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 3,
    title: "Ponozky",
    myOffer: false,
    offerId: 3,
    price: 100,
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
];

const messagesSlice = createSlice({
  name: "componentsState",
  initialState: {
    buyChannels: [],
    sellChannels: [],
    messages: [],
    activeChannel: 0,
    activeChannelDetail: null,
  },
  reducers: {
    addMessages: (state, action) => {
      state.messages.push(action.payload);
    },

    resetMessages: (state) => {
      state.messages = [];
    },

    addBuyChannel: (state, action) => {
      state.buyChannels.push(action.payload);
    },
    addSellChannel: (state, action) => {
      state.sellChannels.push(action.payload);
    },

    resetChannels: (state) => {
      state.buyChannels = [];
      state.sellChannels = [];
    },

    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },

    setActiveChannelDetail: (state, action) => {
      state.activeChannelDetail = action.payload;
    },
  },
});

export const {
  addBuyChannel,
  addSellChannel,
  resetChannels,
  addMessages,
  resetMessages,
  setActiveChannel,
  setActiveChannelDetail,
} = messagesSlice.actions;
export default messagesSlice.reducer;
