import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./btnPrimaryStyles";
import { heightPercentage } from "../../../global/Dimensions";
import { Primary } from "../../../global/Colors";

const ButtonPrimary = ({ title, onPress, size = 5, full, buttonStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.btnEditProfile,
        {
          height: heightPercentage(size),
          backgroundColor: full ? Primary : "#FFF",
        },
        buttonStyle,
      ]}
    >
      <Text style={[styles.textStyle, { color: full ? "#FFF" : Primary }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;
