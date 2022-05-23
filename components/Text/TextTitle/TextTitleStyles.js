import { StyleSheet } from "react-native";
import { widthPercentage } from "../../../global/Dimensions";

export const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    textAlign: "justify",
    flexWrap: "wrap",
    paddingHorizontal: widthPercentage(1),
    fontWeight: "bold"
  },
});
