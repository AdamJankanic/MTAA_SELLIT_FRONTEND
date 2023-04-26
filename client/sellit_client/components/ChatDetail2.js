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
import { addMessages, resetMessages } from "../reducers/MessagesReducer";

import { useNavigation } from "@react-navigation/native";
import axiosConfig from "../axiosConfig";

export function ChatDetail() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeChannelId = useSelector(
    (state) => state.messagesStore.activeChannel
  );

  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const user = useSelector((state) => state.componentsStore.user);
  const activeChannelDetail = useSelector(
    (state) => state.componentsStore.activeChannelDetail
  );

  const activeScreen = useSelector(
    (state) => state.componentsStore.activeScreen
  );

  React.useEffect(() => {
    async function fetchMessages() {
      try {
        await axiosConfig
          .get(`chats/${activeChannelId}/messages`)
          .then((res) => {
            console.log("res", res.data.items);
            // dispatch(addMessages(res.data));
            dispatch(resetMessages());
            res.data.items.forEach((message) => {
              dispatch(addMessages(message));
            });
          });
      } catch (error) {
        console.log("error", error.response.data);
      }
    }

    fetchMessages();
  }, []);

  console.log("activeScreen", activeScreen);
  console.log("activeChannelId", activeChannelId);
  const ws = new WebSocket(
    `wss://sellitapi.herokuapp.com/${activeChannelId}/chat/`
  );

  ws.onopen = () => {
    // connection opened
    console.log("ws.onopen");
  };

  ws.onerror = (e) => {
    // an error occurred
    console.log("ws.onerror", e);
  };

  w;

  if (activeScreen === "ChatDetail") {
    console.log("ChatDetail active");
  } else {
    console.log("ChatDetail inactive");

    ws.close();
  }

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

  const [message, setMessage] = React.useState("");

  const messages = useSelector((state) => state.messagesStore.messages);

  function handleSend() {
    const newMessage = {
      // channelId: activeChannelDetail.id,
      user_id: user.id,
      username: user.name,
      message: message,
      location: false,
    };

    console.log("newMessage", JSON.stringify(newMessage));
    if (ws.readyState === WebSocket.OPEN) {
      console.log("ws.readyState  message send");
      ws.send(JSON.stringify(newMessage));
    }
    console.log(activeChannelId);

    // dispatch(addMessages(newMessage));
    setMessage("");
  }

  // sending location message
  React.useEffect(() => {
    if (location !== null) {
      const newMessage = {
        user_id: user.id,
        username: user.name,
        message: `${location.coords.longitude}:${location.coords.latitude}`,
        location: true,
      };

      console.log("location useEffect", newMessage);
      const newMessageStr = JSON.stringify(newMessage);
      console.log("newMessageStr", newMessageStr);
      // ws.send(JSON.stringify(newMessageStr));

      if (ws.readyState === WebSocket.OPEN) {
        console.log("ws.readyState location send");
        ws.send(newMessageStr);
      }

      // dispatch(addMessages(newMessage));
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

  // console.log("location", location);
  // click on navigation message
  function navigationMessage(message) {
    navigation.navigate("MapPage", {
      longitude: message.longitude,
      latitude: message.latitude,
    });
  }

  // console.log("messages", messages);
  // messages.map((message) => {
  //   console.log("message", message.user.id);
  // });

  // console.log("user store", user.id);

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
        {/* {activeChannelDetail.offer.title} */}
      </Text>

      <ScrollView>
        {messages.map((message, index) => {
          return (
            <View
              key={index}
              style={
                message.user.id === user.id ? styles.sended : styles.received
              }
            >
              {message.location ? (
                <Pressable
                  onPress={() => navigationMessage(message)}
                  style={{
                    backgroundColor: "orange",
                  }}
                >
                  <Text ked={index}>
                    {message.location.longitude +
                      " " +
                      message.location.latitude}
                  </Text>
                </Pressable>
              ) : (
                <Text ked={index}>{message.content}</Text>
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
