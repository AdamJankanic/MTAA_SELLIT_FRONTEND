import { View, ScrollView } from "react-native";
import { Offer } from "./Offer";

import { useSelector } from "react-redux";

import axiosConfig from "../axiosConfig";

import { useEffect } from "react";

export function HomePage() {
  const offers = useSelector((state) => state.offerStore.offers);

  //fetch offers from server

  async function fetchOffers() {
    //try fetch offers from server
    // try {
    //   await axiosConfig
    //     .get("offers")
    //     .then((response) => {
    //       console.log("response", response);
    //       console.log("response.data", response.data);
    //     })
    //     .catch((error) => {
    //       console.log("error", error); // TypeError: failed to fetch
    //     });
    // } catch (error) {
    // console.log("error", error);
    // }

    try {
      fetch("http://10.10.52.71:8000/api/v1/offers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-ApiKey": "695818fb-4c50-4daa-a4ba-a74c4d9d6b77",
          "X-Signature": "test",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("json", json);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchOffers();
  }, []);

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
