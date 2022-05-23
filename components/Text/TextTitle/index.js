import React from "react";
import { Text } from "react-native";
import { styles } from "./TextTitleStyles";
import { useFonts } from "expo-font";

const TextTitle = ({ children, TextStyles }) => {
  const [loaded] = useFonts({
    myFont: require("../../../assets/fonts/Lato-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return <Text style={[styles.text, {fontFamily: "myFont"} , TextStyles]}>{children}</Text>;
};

export default TextTitle;
