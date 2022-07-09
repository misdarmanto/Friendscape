import React from "react";
import { NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/AuthScreen/LoginScreen";
import SignInScreen from "../screens/AuthScreen/SignInScreen";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function AuthNavigations() {
  const [loaded] = useFonts({
    fontTitle: require("../assets/fonts/Lato-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: { fontFamily: "fontTitle", fontSize: 18 },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
