import { View, ScrollView } from "react-native";
import { Offer } from "./Offer";

import { useSelector, useDispatch } from "react-redux";
import { addOffer, resetOffers } from "../reducers/OfferReducer";
import { setUser } from "../reducers/ComponentsReducer";

import axiosConfig from "../axiosConfig";

import { useEffect } from "react";

export function HomePage() {
  const dispatch = useDispatch();
  // console.log("som tu HOMEPAGE");
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
          // console.log("response.data.offers", response.data.items);

          dispatch(resetOffers());
          response.data.items.forEach((offer) => {
            // console.log("offer", offer);
            dispatch(addOffer(offer));
          });
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
        console.log("user me switched", res.data.response);
        dispatch(setUser(res.data.response));
      })
      .catch((error) => {
        console.log("error get me", error);
      });
  }

  useEffect(() => {
    fetchOffers();
    getMe();
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
