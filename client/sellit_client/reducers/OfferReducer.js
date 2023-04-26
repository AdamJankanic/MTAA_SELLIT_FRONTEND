import { createSlice } from "@reduxjs/toolkit";
import axiosConfig from "../axiosConfig";

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

const categories = [
  { label: "Furniture", value: "18b8cf7e-397a-425e-88ec-e9a8cea4ed33" },
  { label: "Electro", value: "61218e58-8c7a-4973-bda7-c7cc50dfdffc" },
];

const cities = [
  {
    label: "Bratislava 81101",
    value: "14baa92e-0950-4c58-b59d-acf3a5507dda",
  },
  {
    label: "Nitra 94901",
    value: "01f633e4-b9aa-4c2f-a702-49d35e50fdeb",
  },
];

const offersSlice = createSlice({
  name: "componentsState",
  initialState: {
    cities: cities,
    categories: categories,
    offers: [],
    activeOffer: 0,
    activeOfferDetail: null,
  },
  reducers: {
    addOffer: (state, action) => {
      state.offers.push(action.payload);
    },

    resetOffers: (state, action) => {
      state.offers = [];
    },

    setActiveOffer: (state, action) => {
      state.activeOffer = action.payload;
    },

    setActiveOfferDetail: (state, action) => {
      state.activeOfferDetail = action.payload;
    },

    resetActiveOfferDetail: (state, action) => {
      state.activeOfferDetail = null;
    },
  },
});

export const {
  addOffer,
  setActiveOffer,
  setNewOffer,
  setActiveOfferDetail,
  resetActiveOfferDetail,
  resetOffers,
} = offersSlice.actions;
export default offersSlice.reducer;
