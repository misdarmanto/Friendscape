import React from "react";
import { View, Text } from "react-native";
import { heightPercentage, widthPercentage } from "../../global/Dimensions";

export default Tag = ({ children, styles, fontStyles }) => {
  return (
    <View
      style={[
        {
          backgroundColor: "#C4C4C4",
          paddingHorizontal: widthPercentage(2),
          marginHorizontal: widthPercentage(1),
          marginVertical: heightPercentage(0.4),
          borderRadius: 20,
          opacity: 0.7,
          height: heightPercentage(4),
          justifyContent: "center",
          alignItems: "center",
        },
        styles,
      ]}
    >
      <Text style={[{ color: "#FFF", fontSize: 13 }, fontStyles]}>
        {children}
      </Text>
    </View>
  );
};
