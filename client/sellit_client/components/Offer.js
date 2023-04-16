import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

export function Offer() {
  const navigation = useNavigation();

  function handleOfferClick() {
    console.log("offer");

    navigation.navigate("OfferDetailPage");
  }

  return (
    <TouchableOpacity onPress={handleOfferClick}>
      <View
        style={{
          backgroundColor: "white",
          /* positioning */
          margin: 5,
          padding: 15,
          /* box shadow */
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.43,
          shadowRadius: 9.51,
          elevation: 5,

          /* border */
          borderRadius: 25,
          width: "95%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 15,
            marginBottom: 10,
          }}
        >
          <Image
            style={{ width: 50, height: 50, borderRadius: 50 }}
            source={{ uri: "https://picsum.photos/200" }}
          />
          <View
            style={{
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
              }}
            >
              Username
            </Text>
            <Text>Location</Text>
          </View>
        </View>
        <Card style={{ marginBottom: 15 }}>
          <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        </Card>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Title
        </Text>
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          200$
        </Text>
      </View>
    </TouchableOpacity>
  );
}
