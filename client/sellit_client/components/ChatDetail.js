import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { TextInput, IconButton } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import * as Location from "expo-location";
import { addMessages } from "../reducers/MessagesReducer";
import { useNavigation } from "@react-navigation/native";

export function ChatDetail() {
  const navigation = useNavigation();
  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  // React.useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);
  //   })();
  // }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   // text = JSON.stringify(location);
  //   text =
  //     "Latitude: " +
  //     location.coords.latitude +
  //     "\n" +
  //     "Longitude: " +
  //     location.coords.longitude;
  // }

  const [message, setMessage] = React.useState("");

  const dispatch = useDispatch();

  const channels = useSelector((state) => state.messagesStore.channels);

  const activeChannel = useSelector(
    (state) => state.messagesStore.activeChannel
  );

  const messages = useSelector((state) => state.messagesStore.messages).filter(
    (message) => {
      return message.channelId === activeChannel;
    }
  );

  function handleSend() {
    const newMessage = {
      channelId: 1,
      userId: 1,
      nickname: "Mark",
      message: message,
    };

    dispatch(addMessages(newMessage));
    setMessage("");
  }

  // sending location message
  React.useEffect(() => {
    if (location !== null) {
      const newMessage = {
        channelId: 1,
        userId: 1,
        nickname: "Mark",
        message: "Navigate to the Location",
        navigation: true,
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
      };

      dispatch(addMessages(newMessage));
    } else {
      console.log("location is null");
    }
  }, [location]);

  // sending location message
  async function sendLocation() {
    console.log("sendLocation");
    await (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      console.log("location get inside a function");
      let currentLocation = await Location.getCurrentPositionAsync({});

      setLocation(currentLocation);
    })();
  }

  // click on navigation message
  function navigationMessage(message) {
    navigation.navigate("MapPage", {
      longitude: message.longitude,
      latitude: message.latitude,
    });
  }

  return (
    <View
      style={{
        // backgroundColor: "blue",
        height: "100%",
      }}
    >
      <Text
        style={{
          alignSelf: "center",
          fontSize: 20,
          fontWeight: "bold",
        }}
      >
        {
          channels.find((channel) => {
            return channel.id === activeChannel;
          }).title
        }
      </Text>

      <ScrollView>
        {messages.map((message, index) => {
          return (
            <View
              key={index}
              style={message.userId === 1 ? styles.sended : styles.received}
            >
              {message.navigation ? (
                <Pressable
                  onPress={() => navigationMessage(message)}
                  style={{
                    backgroundColor: "orange",
                  }}
                >
                  <Text ked={index}>{message.message}</Text>
                </Pressable>
              ) : (
                <Text ked={index}>{message.message}</Text>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
        }}
      >
        <IconButton
          icon="map-marker"
          style={{
            width: "10%",
            // height: 50,
          }}
          onPress={sendLocation}
        />
        <TextInput
          label="Message"
          mode="outlined"
          value={message}
          onChangeText={(text) => setMessage(text)}
          right={<TextInput.Icon icon="send" onPress={handleSend} />}
          style={{
            justifyContent: "flex-end",
            backgroundColor: "white",
            width: "85%",
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  received: {
    position: "relative",
    alignSelf: "flex-start",
    left: 10,
    width: "40%",
    backgroundColor: "green",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  sended: {
    position: "relative",
    alignSelf: "flex-end",
    right: 10,
    width: "40%",
    backgroundColor: "red",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
});
