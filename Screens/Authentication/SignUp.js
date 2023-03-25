import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("Hello");
      }
    });

    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    if (email.length > 0 && password.length > 0 && name.length > 0) {
      await auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          AsyncStorage.setItem("user", JSON.stringify(user));
          navigation.replace("route");
          console.log("Account created");
        })
        .catch((error) => alert(error.message));
    } else {
      alert("Please enter all data");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <View style={styles.conatiner}>
          <Text style={styles.head}>Sign Up</Text>
          <View style={styles.inputView}>
            <TextInput
              label="Name"
              mode="outlined"
              outlineColor="#E5E4E4"
              value={name}
              onChangeText={(name) => setName(name)}
              style={styles.input}
              theme={{ roundness: 25 }}
            />
            <TextInput
              label="Email"
              mode="outlined"
              outlineColor="#E5E4E4"
              value={email}
              onChangeText={(email) => setEmail(email)}
              style={styles.input}
              theme={{ roundness: 25 }}
            />
            <TextInput
              label="Password"
              mode="outlined"
              outlineColor="#E5E4E4"
              value={password}
              onChangeText={(password) => setPassword(password)}
              style={styles.input}
              theme={{ roundness: 25 }}
              secureTextEntry={true}
            />
            <TextInput
              label="Confirm Password"
              mode="outlined"
              value={pass}
              onChangeText={(pass) => setPass(pass)}
              outlineColor="#E5E4E4"
              style={styles.input}
              theme={{ roundness: 25 }}
            />
            {pass === password ? null : (
              <Text style={{ color: "#F44B10", marginLeft: 10 }}>
                *Password does not match
              </Text>
            )}
          </View>
          <Button style={styles.button} mode="contained" onPress={handleLogin}>
            <Text style={{ fontSize: 17 }}>Create New Account</Text>
          </Button>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginTop: 20,
              marginRight: 20,
            }}
          >
            <Text style={{ color: "#7D7D7C" }}>Already have an account?</Text>
            <Text
              onPress={() => navigation.navigate("Login")}
              style={{ color: "#074EA4", marginLeft: 3 }}
            >
              Sign in
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    margin: 20,
  },
  head: {
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
    color: "#5E5D5D",
    width: "90%",
    marginTop: 120,
  },
  inputView: {
    marginTop: 30,
    width: "90%",
    justifyContent: "space-evenly",
    flex: 0.6,
  },
  input: {
    backgroundColor: "#E5E4E4",
  },
  forgot: {
    textAlign: "right",
    width: "90%",
    color: "#7D7D7C",
  },
  button: {
    width: "90%",
    marginTop: 30,
    height: 50,
    justifyContent: "center",
    borderRadius: 25,
    backgroundColor: "#139FF0",
  },
});
