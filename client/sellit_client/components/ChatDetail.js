import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { TextInput, IconButton } from "react-native-paper";

export function ChatDetail() {
  const [message, setMessage] = React.useState("");

  function handleSend() {
    console.log("Message sent");
    console.log(message);
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
        Title
      </Text>

      <ScrollView>
        <View style={styles.received}>
          <Text>
            Ahoj ahoj, chcel by som od teba kupit tieto paradne hodinky. Vieme
            sa dohodnut na 20e a jednom pivku?
          </Text>
        </View>

        <View style={styles.sended}>
          <Text>
            Ahoj, v ziadnom pripade. Tieto hodinky maju ovela vyssiu hodnotu,
            ako si myslis. Minimalne 30e a niekolko piv.
          </Text>
        </View>
        <View style={styles.received}>
          <Text>
            Ahoj ahoj, chcel by som od teba kupit tieto paradne hodinky. Vieme
            sa dohodnut na 20e a jednom pivku?
          </Text>
        </View>

        <View style={styles.sended}>
          <Text>
            Ahoj, v ziadnom pripade. Tieto hodinky maju ovela vyssiu hodnotu,
            ako si myslis. Minimalne 30e a niekolko piv.
          </Text>
        </View>
        <View style={styles.received}>
          <Text>
            Ahoj ahoj, chcel by som od teba kupit tieto paradne hodinky. Vieme
            sa dohodnut na 20e a jednom pivku?
          </Text>
        </View>

        <View style={styles.sended}>
          <Text>
            Ahoj, v ziadnom pripade. Tieto hodinky maju ovela vyssiu hodnotu,
            ako si myslis. Minimalne 30e a niekolko piv.
          </Text>
        </View>
        <View style={styles.received}>
          <Text>
            Ahoj ahoj, chcel by som od teba kupit tieto paradne hodinky. Vieme
            sa dohodnut na 20e a jednom pivku?
          </Text>
        </View>

        <View style={styles.sended}>
          <Text>
            Ahoj, v ziadnom pripade. Tieto hodinky maju ovela vyssiu hodnotu,
            ako si myslis. Minimalne 30e a niekolko piv.
          </Text>
        </View>
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
