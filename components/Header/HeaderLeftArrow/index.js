import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { widthPercentage } from "../../../global/Dimensions";
import { FontAwesome5 } from "@expo/vector-icons";

const HeaderLeftArrow = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={{ margin: 0, padding: 0, paddingRight: widthPercentage(5) }}
      onPress={() => navigation.goBack()}
    >
      <FontAwesome5 name="chevron-left" size={25} color="black" />
    </TouchableOpacity>
  );
};

export default HeaderLeftArrow;
