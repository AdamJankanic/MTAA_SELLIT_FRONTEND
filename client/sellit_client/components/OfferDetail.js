import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import { Card, IconButton } from "react-native-paper";

export function OfferDetail() {
  return (
    <View
      style={{
        backgroundColor: "white",
        /* positioning */
        // margin: 5,
        padding: 15,
        height: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 15,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          Title
        </Text>
      </View>
      <Card style={{ marginBottom: 15 }}>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
      </Card>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // backgroundColor: "red",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: -5,
            // marginBottom: 10,
            alignItems: "center",
          }}
        >
          <IconButton icon="map-marker" size={30}></IconButton>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Martin, 048 07{" "}
          </Text>
        </View>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          200$
        </Text>
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text>
          Description of the offer goes here and it can be very long. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl
          eget ultricies lacinia, nunc nisl aliquet nunc, eget aliquet nunc
        </Text>
      </View>

      <Pressable
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 10,
          borderRadius: 20,
          elevation: 3,
          backgroundColor: "black",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            lineHeight: 20,
            fontWeight: "bold",
            letterSpacing: 0.25,
            color: "white",
          }}
        >
          Contact Seller
        </Text>
      </Pressable>
    </View>
  );
}
