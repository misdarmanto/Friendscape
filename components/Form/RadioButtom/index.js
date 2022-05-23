import React, { memo } from "react";
import { Gray, Blue, Red } from "../../../global/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Text, View } from "react-native";
import { widthPercentage } from "../../../global/Dimensions";

const RadioButton = ({ checked, value, onSelect, label, error }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={() => onSelect(value)}>
        {checked === value ? (
          <Ionicons name="radio-button-on" color={Blue} size={25} />
        ) : (
          <Ionicons
            name="radio-button-off-sharp"
            color={error ? Red : Gray}
            size={25}
          />
        )}
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 16,
          color: Gray,
          paddingHorizontal: widthPercentage(2),
        }}
      >
        {label}
      </Text>
    </View>
  );
};

export default memo(RadioButton);
