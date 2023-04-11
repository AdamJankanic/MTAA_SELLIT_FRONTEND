import { View, ScrollView } from "react-native";
import { Offer } from "./Offer";

export function HomePage() {
  return (
    <View
      style={
        {
          // flex: 1,
          // justifyContent: "center",
          // alignItems: "center",
        }
      }
    >
      <ScrollView>
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
        <Offer />
      </ScrollView>
    </View>
  );
}
