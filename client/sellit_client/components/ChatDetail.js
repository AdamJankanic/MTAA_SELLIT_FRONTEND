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
import { addWebSocketUUID } from "../reducers/ComponentsReducer";

import { useNavigation } from "@react-navigation/native";
import axiosConfig from "../axiosConfig";

import createWebSocket from "../Websockets";

export function ChatDetail() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const activeChannelId = useSelector(
    (state) => state.messagesStore.activeChannel
  );

  const activeChannelDetail = useSelector(
    (state) => state.messagesStore.activeChannelDetail
  );
  const user = useSelector((state) => state.componentsStore.user);

  const [location, setLocation] = React.useState(null);
  const [buyerLocation, setBuyerLocation] = React.useState(null);
  const [sellerLocation, setSellerLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);

  const activeScreen = useSelector(
    (state) => state.componentsStore.activeScreen
  );

  React.useEffect(() => {
    async function fetchMessages() {
      try {
        await axiosConfig
          .get(`chats/${activeChannelId}/messages?limit=1000`)
          .then((res) => {
            // console.log("res", res.data.items);
            // dispatch(addMessages(res.data));
            dispatch(resetMessages());
            res.data.items.forEach((message) => {
              dispatch(addMessages(message));
            });
          });
      } catch (error) {
        console.log("error chat detail messages", error.response.data);
      }
    }

    fetchMessages();
  }, []);

  const [message, setMessage] = React.useState("");

  const messages = useSelector((state) => state.messagesStore.messages);

  /*************************************************************************/
  // Websocket
  const websocketUUID = useSelector(
    (state) => state.componentsStore.websocketUUID
  );

  const socketRef = React.useRef(null);

  React.useEffect(() => {
    if (!socketRef.current) {
      // Create a WebSocket instance if it doesn't exist
      console.log("createWebSocket activeChannelId", activeChannelId);
      socketRef.current = createWebSocket(activeChannelId);
    }
    const socket = socketRef.current;

    if (!websocketUUID.includes(activeChannelId)) {
      dispatch(addWebSocketUUID(activeChannelId));
      socket.addEventListener("open", () => {
        console.log(`WebSocket connected for chat ${activeChannelId}`);
      });

      // Dispatch an action with the received message

      socket.addEventListener("close", () => {
        console.log(`WebSocket disconnected for chat ${activeChannelId}`);
      });

      socket.addEventListener("error", (event) => {
        console.error(`WebSocket error for chat ${activeChannelId}:`, event);
      });

      socket.addEventListener("message", (event) => {
        // console.log("event", event);
        const message = JSON.parse(event.data);
        console.log("message", message);
        dispatch(addMessages(message));
      });
    }

    return () => {
      // Remove the event listeners when the component is unmounted
      console.log("unmounting socket");
      // socket.removeEventListener("open");
      // socket.removeEventListener("message");
      // socket.removeEventListener("close");
      // socket.removeEventListener("error");
    };
  }, [activeChannelId]);

  function handleSend() {
    const newMessage = {
      // channelId: activeChannelDetail.id,
      user_id: user.id,
      username: user.name,
      message: message,
      location: false,
    };

    const socket = socketRef.current;
    if (socket.readyState === WebSocket.OPEN) {
      const messageStr = JSON.stringify(newMessage);
      socket.send(messageStr);
    }

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

      const socket = socketRef.current;
      if (socket.readyState === WebSocket.OPEN) {
        const messageStr = JSON.stringify(newMessage);
        socket.send(messageStr);
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

  //buyer location
  async function getBuyerLocation() {
    console.log("sendLocation");
    await (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      console.log("location get inside a function");
      let currentLocation = await Location.getCurrentPositionAsync({});

      setBuyerLocation(currentLocation);
    })();
  }

  // console.log("location", location);
  // click on navigation message
  async function navigationMessage(message) {
    console.log(
      "navigationMessage",
      Number(message.location.latitude),
      Number(message.location.longitude)
    );

    setSellerLocation({
      latitude: Number(message.location.latitude),
      longitude: Number(message.location.longitude),
    });

    await getBuyerLocation();
  }
  React.useEffect(() => {
    console.log("user location", buyerLocation?.coords.latitude);

    if (buyerLocation !== null) {
      const buyLoc = {
        latitude: buyerLocation?.coords.latitude,
        longitude: buyerLocation?.coords.longitude,
      };

      navigation.navigate("MapPage", {
        sellerLocation: sellerLocation,
        buyerLocation: buyLoc,
      });
    }
  }, [buyerLocation]);

  //convert string to number

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
                (message.user?.id ? message.user?.id : message.user_id) ===
                user?.id
                  ? styles.sended
                  : styles.received
              }
            >
              {message.location &&
              user?.id !== activeChannelDetail.offer?.user?.id ? (
                <Pressable
                  onPress={() => navigationMessage(message)}
                  style={{
                    backgroundColor: "orange",
                  }}
                >
                  <Text ked={index}>
                    {/* {message.location.longitude +
                      " " +
                      message.location.latitude} */}
                    NAVIGATE
                  </Text>
                </Pressable>
              ) : (
                <Text ked={index}>
                  {message.content?.length > 0
                    ? message.content
                    : message.message}
                </Text>
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

            display:
              user?.id === activeChannelDetail.offer?.user?.id
                ? "flex"
                : "none",
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
            width:
              user?.id === activeChannelDetail.offer?.user?.id ? "85%" : "100%",
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
