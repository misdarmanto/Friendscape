import React from "react";
import { View, Text } from "react-native";
import NoInternetAnimation from "../components/animations/NoInternetAnimation";

const OfflineScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <NoInternetAnimation/>
    </View>
  );
};

export default OfflineScreen;
