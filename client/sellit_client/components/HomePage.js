import { View, ScrollView } from "react-native";
import { Offer } from "./Offer";

import { useSelector } from "react-redux";

export function HomePage() {
  const offers = useSelector((state) => state.offerStore.offers);

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
