import React from "react";
import { Text } from "react-native";
import { styles } from "./TextStylesParagraph";

const TextParagraph = ({ children, style }) => {
  return <Text style={[styles.text, style]}>{children}</Text>;
};

export default TextParagraph;
