import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  TouchableOpacity,
  TextInput,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Keyboard,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { Button } from "react-native-paper";
import { auth } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [data, setData] = useState();
  const [input, setInput] = useState("");
  const [userMsg, setUserMsg] = useState(false);

  useEffect(() => {
    if (messages.length > 0) {
      const botResponse = async () => {
        try {
          const response = await fetch(
            `https://8ad4-115-98-234-41.in.ngrok.io/?prompt=${input}`
          );
          const data = await response.json();
          setMessages([...messages, { text: data.response, sender: "bot" }]);
        } catch (error) {
          console.error(error);
        }
      };
      botResponse();
    }
  }, [userMsg]);

  const handleSend = () => {
    Keyboard.dismiss();
    if (input) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setUserMsg(!userMsg);
    }
  };
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        AsyncStorage.setItem("user", null);
        navigation.replace("Login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" backgroundColor="transparent" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <View style={styles.header}>
          <Text style={styles.head}>KalMiFyn</Text>
          <MaterialIcons
            name="logout"
            size={26}
            color="#fff"
            style={{ marginTop: 10 }}
            onPress={handleSignOut}
          />
        </View>
        <>
          <ScrollView style={styles.messagesContainer}>
            {messages.map((message, index) => (
              <View
                key={index}
                style={[
                  styles.message,
                  message.sender === "user"
                    ? styles.userMessage
                    : styles.botMessage,
                ]}
              >
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              style={styles.input}
              placeholder="Type a message..."
              value={input}
              onChangeText={(text) => setInput(text)}
            />

            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderTopWidth: 0.5,
    borderTopColor: "#E0E4E8",
  },
  messagesContainer: {
    flex: 1,
    padding: 10,
  },
  message: {
    maxWidth: "80%",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#1e90ff",
    color: "#fff",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e6e6e6",
    color: "#333",
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  sendButton: {
    backgroundColor: "#1e90ff",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    padding: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#3A9CF8",
    alignItems: "center",
  },
  head: {
    fontSize: 20,
    marginTop: 10,
    color: "#fff",
    fontWeight: "700",
  },
});
