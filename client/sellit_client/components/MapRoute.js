import MapViewDirections from "react-native-maps-directions";
import MapView from "react-native-maps";
import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";

const GOOGLE_MAPS_APIKEY = "AIzaSyC03EQjaitDtft_wG5LBfGvYr6p8L2AEto";

// class MapRoute extends Component {
//   render() {
//     return (
//       <View
//         style={{
//           width: "100%",
//           height: "100%",
//         }}
//       >
//         <MapView
//           initialRegion={{
//             latitude: 37.3318456,
//             longitude: -122.0296002,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//           style={{
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <MapViewDirections
//             origin={origin}
//             destination={destination}
//             apikey={GOOGLE_MAPS_APIKEY}
//             strokeWidth={4}
//             strokeColor="hotpink"
//           />
//         </MapView>
//       </View>
//     );
//   }
// }

// export default MapRoute;

export function MapRoute({ route }) {
  // const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  const destination = { latitude: 48.142198, longitude: 17.100426 };

  console.log("MapRoute");
  console.log(route.params);

  const originLatitude = route.params.latitude;
  const originLongitude = route.params.longitude;

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <MapView
        initialRegion={{
          latitude: originLatitude,
          longitude: originLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <MapViewDirections
          origin={{
            latitude: originLatitude,
            longitude: originLongitude,
          }}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={4}
          strokeColor="hotpink"
        />
      </MapView>
    </View>
  );
}
