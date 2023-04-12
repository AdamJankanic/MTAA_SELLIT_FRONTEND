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
//     <Tab.Navigator
//       // initialRouteName="Home"
//       screenOptions={{
//         tabBarActiveTintColor: "#e91e63",
//       }}
//     >
//       <Tab.Screen
//         name=" "
//         component={HomePage}
//         options={{
//           tabBarLabel: "Home",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="home" color={color} size={size} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Search"
//         component={SearchPage}
//         options={{
//           tabBarLabel: "Search",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="magnify" color={color} size={size} />
//           ),
//           // tabBarBadge: 3,
//         }}
//       />
//       <Tab.Screen
//         name="Add"
//         component={AddPage}
//         options={{
//           tabBarLabel: "Add",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons
//               name="plus-thick"
//               color={color}
//               size={size}
//             />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarLabel: "Profile",
//           tabBarIcon: ({ color, size }) => (
//             <MaterialCommunityIcons name="account" color={color} size={size} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }

// function Home() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function Search() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Search!</Text>
//     </View>
//   );
// }
// function Add() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Add!</Text>
//     </View>
//   );
// }

// function Profile() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Profile!</Text>
//     </View>
//   );
// }

import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
// /* components */
import { HomePage } from "./HomePage";
import { AddPage } from "./AddPage";
import { SearchPage } from "./SearchPage";

const HomeRoute = () => <HomePage />;

const SearchRoute = () => <SearchPage />;

const AddRoute = () => <AddPage />;

const ProfileRoute = () => <Text>Profile work in progress</Text>;

export function BottomNav() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
      unfocusedIcon: "home-outline",
    },
    {
      key: "search",
      title: "Search",
      focusedIcon: "magnify",
      unfocusedIcon: "magnify",
    },
    {
      key: "add",
      title: "Add",
      focusedIcon: "plus-thick",
      unfocusedIcon: "plus",
    },

    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account",
      unfocusedIcon: "account-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    search: SearchRoute,
    add: AddRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
