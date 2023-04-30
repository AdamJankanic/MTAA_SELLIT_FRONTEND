import { View, ScrollView } from "react-native";
import { Offer } from "./Offer";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOffer, resetOffers } from "../reducers/OfferReducer";
import { setUser, setConnection } from "../reducers/ComponentsReducer";

import axiosConfig from "../axiosConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";

export function HomePage() {
  const [connection, setConnection] = React.useState(null);

  const dispatch = useDispatch();

  NetInfo.fetch().then((state) => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    setConnection(state.isConnected);
  });

  const offers = useSelector((state) => state.offerStore.offers);

  const activeScreen = useSelector(
    (state) => state.componentsStore.activeScreen
  );

  async function getOffersAsyncStorage() {
    try {
      const offers = await AsyncStorage.getItem("offers").then((res) => {
        // console.log("offers from async storage", JSON.parse(res));
        dispatch(resetOffers());
        JSON.parse(res).forEach((offer) => {
          dispatch(addOffer(offer));
        });
      });
    } catch (error) {
      console.log("error get offers", error);
    }
  }

  async function getMeAsyncStorage() {
    try {
      const user = await AsyncStorage.getItem("user").then((res) => {
        // console.log("user from async storage", JSON.parse(res));
        dispatch(setUser(JSON.parse(res)));
      });
    } catch (error) {
      console.log("error get user", error);
    }
  }

  async function setOffersToAsyncStorage(offers) {
    try {
      // console.log("offers do async storage", offers);
      await AsyncStorage.setItem("offers", JSON.stringify(offers));
    } catch (error) {
      console.log("error set offers", error);
    }
  }
  // fetch offers from server
  async function fetchOffers() {
    // try fetch offers from server

    try {
      await axiosConfig
        .get("/offers")
        // .get("/chat/mychats/a45a5324-ddb4-43f2-b325-1a717654c505")
        .then((response) => {
          // console.log("response.data.offers", response.data.items);

          dispatch(resetOffers());
          response.data.items.forEach((offer) => {
            // console.log("offer", offer);
            dispatch(addOffer(offer));
          });

          setOffersToAsyncStorage(response.data.items);
        })
        .catch((error) => {
          console.log("error home page inside fetchoffers", error); // TypeError: failed to fetch
        });
    } catch (error) {
      console.log("error home page offers", error.response.data);
    }
  }

  async function getMe() {
    await axiosConfig
      .get(`/users/me`)
      .then((res) => {
        // console.log("res", res.data.response);
        // console.log("user me switched", res.data.response);
        dispatch(setUser(res.data.response));

        // save user to async storage
        try {
          AsyncStorage.setItem("user", JSON.stringify(res.data.response));
        } catch (error) {
          console.log("error set user", error);
        }
      })
      .catch((error) => {
        console.log("error get me", error);
      });
  }

  async function sendExpToken() {
    await AsyncStorage.getItem("expoPushToken").then((token) => {
      // console.log("token expo send push ", token);
      axiosConfig
        .post("/expotoken", {
          expotoken: token,
        })
        .then((res) => {
          console.log(
            "res send exp token"
            // res.data
          );
        })
        .catch((error) => {
          console.log("error send exp token", error);
        });
    });
  }

  useEffect(() => {
    if (connection) {
      fetchOffers();
      getMe();
      sendExpToken();
    } else {
      getOffersAsyncStorage();
      getMeAsyncStorage();
    }
  }, [activeScreen]);

  return (
    <View
      style={
        {
          // flex: 1,
        }
      }
    >
      <ScrollView>
        {offers.map((offer, index) => (
          <Offer key={index} offer={offer} />
        ))}
      </ScrollView>
    </View>
  );
}
