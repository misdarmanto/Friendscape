import React from "react";
import { View } from "react-native";
import { styles } from "./wrapperStyles";

const Wrapper = ({ children, wrapperStyle }) => {
  return (
    <View style={[styles.wrapperContainer, wrapperStyle]}>{children}</View>
  );
};

export default Wrapper;
