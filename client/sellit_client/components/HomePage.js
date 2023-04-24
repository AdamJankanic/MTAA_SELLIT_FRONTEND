import { View, ScrollView } from "react-native";
import { Offer } from "./Offer";

import { useSelector, useDispatch } from "react-redux";
import { addOffer, resetOffers } from "../reducers/OfferReducer";
import axiosConfig from "../axiosConfig";

import { useEffect } from "react";

export function HomePage() {
  const dispatch = useDispatch();
  console.log("som tu HOMEPAGE");
  const offers = useSelector((state) => state.offerStore.offers);

  const activeScreen = useSelector(
    (state) => state.componentsStore.activeScreen
  );

  // fetch offers from server
  async function fetchOffers() {
    // try fetch offers from server

    try {
      await axiosConfig
        .get("/offers")
        // .get("/chat/mychats/a45a5324-ddb4-43f2-b325-1a717654c505")
        .then((response) => {
          console.log("response.data.offers", response.data.items);

          dispatch(resetOffers());
          response.data.items.forEach((offer) => {
            console.log("offer", offer);
            dispatch(addOffer(offer));
          });
        })
        .catch((error) => {
          console.log("error", error); // TypeError: failed to fetch
        });
    } catch (error) {
      console.log("error", error);
    }
  }

  // async function fetchOffers() {
  //   console.log("som tu fetchOffers");
  //   try {
  //     await fetch(
  //       // "http://10.10.52.71:5000/api/chat/mychats/a45a5324-ddb4-43f2-b325-1a717654c505",
  //       "https://sellitapi.herokuapp.com/api/v1/offers",
  //       {
  //         method: "GET",
  //         // headers: {
  //         //   "Content-Type": "application/json",
  //         //   "X-ApiKey": "695818fb-4c50-4daa-a4ba-a74c4d9d6b77",
  //         //   "X-Signature": "test",
  //         // },
  //       }
  //     )
  //       .then((response) => response.json())
  //       .then((json) => {
  //         console.log("json", json);
  //       })
  //       .catch((error) => {
  //         console.log("error", error);
  //       });
  //   } catch (error) {
  //     console.log("error2", error);
  //   }
  // }

  useEffect(() => {
    fetchOffers();
  }, [activeScreen === "HomePage"]);

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
