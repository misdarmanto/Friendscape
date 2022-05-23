import { StyleSheet } from "react-native";
import { heightPercentage, widthPercentage } from "../../global/Dimensions";

export const styles = StyleSheet.create({
  list: {
    paddingHorizontal: widthPercentage(2),
    paddingVertical: heightPercentage(1),
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "center",
  },
});
