import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../Screens/Authentication/Login";
import SignUp from "../Screens/Authentication/SignUp";
import VoiceAuthentication from "../Screens/VoiceAuthentication";
import Chat from "../Screens/Chat";
import Help from "../Screens/Help";

const Stack = createNativeStackNavigator();

export default AppNavigator = () => {
  React.useEffect(() => {
    checkAuthentication();
  }, []);

  const [routeName, setRouteName] = React.useState("voice");
  const [appLoading, isAppLoading] = React.useState(false);

  const checkAuthentication = async () => {
    AsyncStorage.getItem("user").then(function (value) {
      console.log(value !== null);
      if (value !== null) {
        setRouteName("voice");
        isAppLoading(false);
      } else {
        setRouteName("Login");
        isAppLoading(false);
      }
    });
  };

  if (!appLoading) {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={routeName}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="voice" component={VoiceAuthentication} />
        <Stack.Screen name="chat" component={Chat} />
        <Stack.Screen name="help" component={Help} />
      </Stack.Navigator>
    );
  } else {
    return (
      <View
        style={{ flex: 1, backgroundColor: "#fff", justifyContent: "center" }}
      >
        <Text>Loading</Text>
      </View>
    );
  }
};
