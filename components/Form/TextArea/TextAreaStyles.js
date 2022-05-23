import { StyleSheet } from "react-native";
import { heightPercentage, widthPercentage } from "../../../global/Dimensions";

export const styles = StyleSheet.create({
  textareaContainer: {
    height: heightPercentage(15),
    paddingHorizontal: widthPercentage(1),
    borderBottomWidth: 1,
  },
  textarea: {
    textAlignVertical: "bottom",
    height: heightPercentage(10),
    fontSize: 14,
    color: "gray",
  },
});
