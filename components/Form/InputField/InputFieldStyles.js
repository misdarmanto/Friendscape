import { StyleSheet } from "react-native";
import { Gray, Primary, Red } from "../../../global/Colors";
import { heightPercentage, widthPercentage } from "../../../global/Dimensions";

export const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: widthPercentage(5),
    height: heightPercentage(8),
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#FFF",
    borderRadius: 30,
  },
  input: {
    fontSize: 16,
    color: Gray,
    flexDirection: "row",
    marginHorizontal: widthPercentage(2)
  },
});
