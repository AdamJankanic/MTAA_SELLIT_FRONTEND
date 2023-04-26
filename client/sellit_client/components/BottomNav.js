import * as React from "react";
import { BottomNavigation, Icon, IconButton, Text } from "react-native-paper";
// /* components */
import { HomePage } from "./HomePage";
import { AddPage } from "./AddPage";
import { SearchPage } from "./SearchPage";
import { Button, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { setActiveScreen } from "../reducers/ComponentsReducer";
import { useDispatch, useSelector } from "react-redux";

import { setImageNull } from "../reducers/ComponentsReducer";
import { resetNewOffer } from "../reducers/OfferReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function BottomNav() {
  const [token, setStoredData] = React.useState(null);
  const [allKeys, setAllKeys] = React.useState(null);

  const activeScreen = useSelector(
    (state) => state.componentsStore.activeScreen
  );

  React.useEffect(() => {
    retrieveToken();
  }, [activeScreen]);

  // Retrieve data from AsyncStorage
  const retrieveToken = async () => {
    try {
      const value = await AsyncStorage.getItem("token");

      console.log("value from store is: ", value);
      setStoredData(value);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigation();
  const dispatch = useDispatch();

  function goHomePage() {
    dispatch(setActiveScreen("HomePage"));
    console.log("goHomePage");
    navigate.navigate("HomePage");
  }
  function goSearchPage() {
    dispatch(setActiveScreen("SearchPage"));
    console.log("goSearchPage");
    navigate.navigate("SearchPage");
  }

  function goAddPage() {
    console.log("token bottom navigation", token);

    if (!token) {
      dispatch(setActiveScreen("LoginPage"));
      navigate.navigate("LoginPage");
      return;
    }

    dispatch(setImageNull());

    dispatch(setActiveScreen("AddPage"));
    console.log("goAddPage");
    navigate.navigate("AddPage");
  }

  function goProfilePage() {
    console.log("token bottom navigation", token);

    if (!token) {
      dispatch(setActiveScreen("LoginPage"));
      navigate.navigate("LoginPage");
      return;
    }

    dispatch(setActiveScreen("ProfilePage"));
    console.log("goProfilePage");
    navigate.navigate("ProfilePage");
  }

  return (
    <View
      style={{
        marginBottom: 10,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity onPress={goHomePage}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton icon="home"></IconButton>
          <Text style={{ marginTop: -15 }}>Home</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goSearchPage}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton icon="magnify"></IconButton>
          <Text style={{ marginTop: -15 }}>Search</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goAddPage}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton icon="plus-thick"></IconButton>
          <Text style={{ marginTop: -15 }}>Add</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={goProfilePage}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton icon="account"></IconButton>
          <Text style={{ marginTop: -15 }}>Profile</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
