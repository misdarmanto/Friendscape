import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/AuthScreen/LoginScreen";
import SignInScreen from "../screens/AuthScreen/SignInScreen";
import { useContextApi } from "../lib/hooks/useContextApi";
import UserDetailProfile from "../screens/UserDetailProfile";
import ImageDetail from "../screens/ImageDetail";
import EditProfile from "../screens/EditProfile";
import HomeScreen from "../screens/MainScreen/HomeScreen";
import UserProfile from "../screens/MainScreen/UserProfileScreen";
import ListChatScreen from "../screens/MainScreen/ListChatScreen";
import NotificationScreen from "../screens/MainScreen/NotificationScreen";
import MessageScreen from "../screens/Message";
import Test from "../screens/Test";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

export default function AppNavigations() {
  const { isAuth } = useContextApi();

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
        {/* <Stack.Screen name="Test" component={Test} options={{ title: "" }} /> */}
        {isAuth ? (
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "" }}
            />
            <Stack.Screen name="Profile" component={UserProfile} />
            <Stack.Screen
              name="Notification"
              component={NotificationScreen}
              options={{ title: "Notifikasi" }}
            />
            <Stack.Screen
              name="ListChat"
              component={ListChatScreen}
              options={{ title: "Chat" }}
            />
            <Stack.Screen name="Message" component={MessageScreen} />
            <Stack.Screen
              name="ImageDetail"
              component={ImageDetail}
              options={{ title: "image" }}
            />
            <Stack.Screen name="EditProfile" component={EditProfile} />

            <Stack.Screen
              name="UserDetails"
              component={UserDetailProfile}
              options={{ title: "Profile" }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignIn" component={SignInScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
