import React from "react";
import { Text } from "react-native";
import { TextColor } from "../../global/Colors";

const TextSmall = ({ children, style }) => {
  return (
    <Text
      style={[
        {
          padding: 5,
          fontSize: 12,
          color: TextColor,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default TextSmall;
