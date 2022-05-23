import React from "react";
import { Text } from "react-native";
import { widthPercentage } from "../../../global/Dimensions";
import { useFonts } from "expo-font";

const TextFormat = ({ text }) => {
  const [loaded] = useFonts({
    fontTitle: require("../../../assets/fonts/Lato-Black.ttf"),
  });

  if (!loaded) {
    return null;
  }

  let textResult = "";
  if (text.toString().length > 10) {
    textResult = text.toString().slice(0, 10) + " ...";
  } else {
    textResult = text;
  }

  return (
    <Text
      style={{
        fontSize: 18,
        paddingHorizontal: widthPercentage(2),
        fontWeight: "bold",
        fontFamily: "fontTitle",
      }}
    >
      {textResult}
    </Text>
  );
};

export default TextFormat;
