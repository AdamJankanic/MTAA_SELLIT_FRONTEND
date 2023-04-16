// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// import { View, Text } from "react-native";

// /* components */
// import { HomePage } from "./HomePage";
// import { AddPage } from "./AddPage";
// import { SearchPage } from "./SearchPage";

// const Tab = createBottomTabNavigator();

// export function BottomNav() {
//   return (
//     // <Tab.Navigator
//     //   // initialRouteName="Home"
//     //   initialRouteName={SearchPage}
//     //   screenOptions={{
//     //     tabBarActiveTintColor: "#e91e63",
//     //   }}
//     // >
//     <Tab.Screen
//       name="home"
//       nam
//       component={HomePage}
//       options={{
//         tabBarLabel: "Home",
//         headerShown: false,
//         tabBarIcon: ({ color, size }) => (
//           <MaterialCommunityIcons name="home" color={color} size={size} />
//         ),
//       }}
//     />
//     // <Tab.Screen
//     //   name="Search"
//     //   component={SearchPage}
//     //   options={{
//     //     tabBarLabel: "Search",
//     //     headerShown: false,
//     //     tabBarIcon: ({ color, size }) => (
//     //       <MaterialCommunityIcons name="magnify" color={color} size={size} />
//     //     ),
//     //     // tabBarBadge: 3,
//     //   }}
//     // />
//     // <Tab.Screen
//     //   name="Add"
//     //   component={AddPage}
//     //   options={{
//     //     tabBarLabel: "Add",
//     //     headerShown: false,
//     //     tabBarIcon: ({ color, size }) => (
//     //       <MaterialCommunityIcons
//     //         name="plus-thick"
//     //         color={color}
//     //         size={size}
//     //       />
//     //     ),
//     //   }}
//     // />
//     // <Tab.Screen
//     //   name="Profile"
//     //   component={Profile}
//     //   options={{
//     //     tabBarLabel: "Profile",
//     //     headerShown: false,
//     //     tabBarIcon: ({ color, size }) => (
//     //       <MaterialCommunityIcons name="account" color={color} size={size} />
//     //     ),
//     //   }}
//     // />

//     // </Tab.Navigator>
//   );
// }

function Profile() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Profile!</Text>
    </View>
  );
}

import * as React from "react";
import { BottomNavigation, Icon, IconButton, Text } from "react-native-paper";
// /* components */
import { HomePage } from "./HomePage";
import { AddPage } from "./AddPage";
import { SearchPage } from "./SearchPage";
import { Button, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export function BottomNav() {
  const navigate = useNavigation();

  function goHomePage() {
    navigate.navigate("HomePage");
  }
  function goSearchPage() {
    console.log("goSearchPage");
    navigate.navigate("SearchPage");
  }

  function goAddPage() {
    navigate.navigate("AddPage");
  }

  function goProfilePage() {
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
