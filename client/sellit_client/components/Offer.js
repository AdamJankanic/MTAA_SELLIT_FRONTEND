import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setActiveOffer } from "../reducers/OfferReducer";

export function Offer(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const activeOfferS = useSelector((state) => state.offerStore.activeOffer);
  console.log("activeOfferSssssssssssssssssssssss", activeOfferS);

  function handleOfferClick() {
    //set active offer
    dispatch(setActiveOffer(props.offer.id));
    console.log("activeOffer", props.offer.id);
    console.log("changed");
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
            // source={{ uri: "https://picsum.photos/200" }}
            source={{ uri: props.offer.userImage }}
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
              {props.offer.nickname}
            </Text>
            <Text>{props.offer.location}</Text>
          </View>
        </View>
        <Card style={{ marginBottom: 15 }}>
          <Card.Cover
            source={{
              // uri: "https://picsum.photos/700"
              uri: props.offer.image,
            }}
          />
        </Card>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {props.offer.title}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          {props.offer.price}$
        </Text>
      </View>
    </TouchableOpacity>
  );
}
