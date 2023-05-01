//source: https://www.npmjs.com/package/react-native-maps-directions
import MapViewDirections from "react-native-maps-directions";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const GOOGLE_MAPS_APIKEY = "";

export function MapRoute({ route }) {
  console.log("MapRoute");
  console.log(route.params);

  const origin = route.params.buyerLocation;
  const destination = route.params.sellerLocation;

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MapView
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Marker
          coordinate={{
            latitude: destination.latitude + 0.01,
            longitude: destination.longitude + 0.01,
          }}
          title="Destination"
        />
        <MapViewDirections
          origin={{
            latitude: origin.latitude,
            longitude: origin.longitude,
          }}
          destination={{
            latitude: destination.latitude + 0.01,
            longitude: destination.longitude + 0.01,
          }}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="hotpink"
        />
      </MapView>
    </View>
  );
}
