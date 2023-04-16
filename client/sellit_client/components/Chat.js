import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";

export function Chat() {
  const navigation = useNavigation();

  function handleChatClick() {
    console.log("chat");
    //navigate to add page
    navigation.navigate("ChatDetailPage");
  }

  return (
    <TouchableOpacity onPress={handleChatClick}>
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
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Title
          </Text>
        </View>

        <View
          style={{
            position: "absolute",
            right: 10,
            top: -5,
            borderWidth: 3,
            padding: 3,
            borderRadius: 10,
            borderColor: "red",
            backgroundColor: "white",

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,
            elevation: 5,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            150$
          </Text>
        </View>

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
            <Text>Last message</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
