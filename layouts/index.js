import React from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { heightPercentage, widthPercentage } from "../global/Dimensions";

export default function Layout({ style, children }) {
  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: "#FFF",
          paddingHorizontal: widthPercentage(1),
        },
        style,
      ]}
    >
      {children}
      <StatusBar style="auto" />
    </View>
  );
}
