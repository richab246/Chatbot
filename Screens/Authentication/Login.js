import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [eye, setEye] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("voice");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = () => {
    if (email.length > 0 && password.length > 0) {
      auth
        .signInWithEmailAndPassword(email.trim(), password.trim())
        .then((userCredentials) => {
          const user = userCredentials.user;
          AsyncStorage.setItem("user", JSON.stringify(user));
          navigation.replace("voice");
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Please enter all data");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.conatiner}>
        <Image
          source={require("../../assets/backImage.jpg")}
          style={styles.backImage}
        />
        <View style={styles.whiteSheet}>
          <SafeAreaView style={styles.form}>
            <Text style={styles.head}>Sign in</Text>
            <TextInput
              label="Email"
              mode="outlined"
              outlineColor="#E5E4E4"
              value={email}
              onChangeText={(email) => setEmail(email)}
              style={styles.input}
              theme={{ roundness: 25 }}
              keyboardType="email-address"
            />
            <TextInput
              label="Password"
              mode="outlined"
              outlineColor="#E5E4E4"
              value={password}
              onChangeText={(password) => setPassword(password)}
              style={styles.input}
              theme={{ roundness: 25 }}
              right={
                <TextInput.Icon
                  onPress={() => setEye(!eye)}
                  icon={eye ? "eye-off" : "eye"}
                />
              }
              secureTextEntry={eye ? true : false}
            />
            <Text style={styles.forgot}>Forgot Password?</Text>
            <Button
              style={styles.button}
              mode="contained"
              onPress={handleLogin}
            >
              <Text style={{ fontSize: 18 }}>Login</Text>
            </Button>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 20,
                marginRight: 20,
              }}
            >
              <Text style={{ color: "#7D7D7C" }}>Don't have an account?</Text>
              <Text
                onPress={() => navigation.navigate("Signup")}
                style={{ color: "#074EA4", marginLeft: 5 }}
              >
                SignUp
              </Text>
            </View>
          </SafeAreaView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    backgroundColor: "#fff",
  },
  head: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#139FF0",
    alignSelf: "center",
    paddingBottom: 24,
  },
  inputView: {
    backgroundColor: "#E5E4E4",
  },
  input: {
    backgroundColor: "#E5E4E4",
    marginBottom: 10,
  },
  forgot: {
    textAlign: "right",
    width: "90%",
    color: "#7D7D7C",
  },
  button: {
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: "#139FF0",
  },
  backImage: {
    width: "100%",
    height: 340,
    position: "absolute",
    top: 0,
    resizeMode: "cover",
  },
  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
    // borderTopRightRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
});
