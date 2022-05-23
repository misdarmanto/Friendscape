import React from "react";
import { Text } from "react-native";
import { TextColor } from "../../global/Colors";

const TextLarge = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          fontSize: 25,
          color: TextColor,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextLarge;
