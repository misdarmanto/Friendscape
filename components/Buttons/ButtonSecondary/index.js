import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./ButtonStylesSecondary";

function ButtonSecondary({ children, onPress, style }) {
  return (
    <TouchableOpacity style={[styles.containerStyle, style]} onPress={onPress}>
      <Text style={styles.textTitle}>{children}</Text>
    </TouchableOpacity>
  );
}

export default ButtonSecondary;
