import React from "react";
import { MapRoute } from "./MapRoute";

import { View, StyleSheet } from "react-native";

export function MapPage({ route }) {
  console.log("MapPage");
  console.log(route.params);

  return (
    <View>
      <MapRoute />
    </View>
  );
}
