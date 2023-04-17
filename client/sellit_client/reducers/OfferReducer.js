import { createSlice } from "@reduxjs/toolkit";

const offerTest = [
  {
    id: 1,
    userId: 1,
    nickname: "Mark",
    userImage: "https://picsum.photos/200",
    location: "London",
    image: "https://picsum.photos/700",
    title: "Iphone 12",
    description: "Iphone 12 128GB",
    price: 1000,
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 2,
    userId: 1,
    nickname: "Mark",
    userImage: "https://picsum.photos/200",
    location: "New York",
    image: "https://picsum.photos/700",
    title: "Iphone 13",
    description: "Iphone 13 128GB",
    price: 1200,
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 3,
    userId: 2,
    nickname: "John",
    location: "Martin",
    userImage: "https://picsum.photos/200",
    image: "https://picsum.photos/700",
    title: "Iphone 4",
    description: "Iphone 4 128GB",
    price: 200,
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 4,
    userId: 3,
    nickname: "Paul",
    userImage: "https://picsum.photos/200",
    location: "Stropkov",
    image: "https://picsum.photos/700",
    title: "Iphone 5",
    description: "Iphone 5 128GB",
    price: 300,
    created_at: "2021-03-01T00:00:00.000Z",
    deleted_at: null,
  },
];

const offersSlice = createSlice({
  name: "componentsState",
  initialState: {
    offers: offerTest,
    activeOffer: 0,
  },
  reducers: {
    addOffer: (state, action) => {
      state.channels.push(action.payload);
    },

    setActiveOffer: (state, action) => {
      state.activeOffer = action.payload;
    },
  },
});

export const { addChannel, addMessages, setActiveOffer } = offersSlice.actions;
export default offersSlice.reducer;
