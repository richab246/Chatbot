import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { MotiView } from "moti";
import { Easing } from "react-native-reanimated";
import { Audio } from "expo-av";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

export default function VoiceAuthentication({ navigation }) {
  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [sound, setSound] = useState();

  useEffect(() => {
    async function playSound() {
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/bot.mp3")
      );
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    }

    playSound();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="transparent" />
      <View style={styles.head}>
        <Entypo
          name="cross"
          size={35}
          color="#fff"
          onPress={() => navigation.navigate("chat")}
        />
      </View>
      <Text style={styles.heading}>{`Hello, \n I am KalMiFyn!`}</Text>
      {/* {recording ? ( */}
      <View style={[styles.dot, styles.center, { alignSelf: "center" }]}>
        {[...Array(4).keys()].map((index) => {
          return (
            <MotiView
              from={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 4 }}
              transition={{
                type: "timing",
                duration: 2000,
                easing: Easing.out(Easing.ease),
                delay: index * 400,
                repeatReverse: false,
                loop: true,
              }}
              key={index}
              style={[StyleSheet.absoluteFillObject, styles.dot]}
            />
          );
        })}
        <Image
          source={require("../assets/bot.png")}
          style={{ width: 150, height: 150 }}
        />
      </View>
      <TouchableWithoutFeedback onPress={() => navigation.navigate("chat")}>
        <Text style={styles.tt}>Let's Chat</Text>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3A9CF8",
    marginTop: 20,
  },
  head: {
    margin: 10,
  },
  heading: {
    fontSize: 32,
    alignSelf: "center",
    marginTop: 70,
    textAlign: "center",
    color: "#fff",
  },
  dot: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#5db0fc",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 75,
  },
  tt: {
    fontSize: 28,
    alignSelf: "center",
    marginTop: 130,
    textAlign: "center",
    color: "#83B9EF",
    backgroundColor: "#F3F5F7",
    padding: 10,
    borderRadius: 10,
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fill: {
    flex: 1,
    margin: 16,
  },
  button: {},
});
