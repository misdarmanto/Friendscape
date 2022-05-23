import { StyleSheet } from "react-native";
import { Primary } from "../../../global/Colors";
import { heightPercentage, widthPercentage } from "../../../global/Dimensions";

export const styles = StyleSheet.create({
  btnEditProfile: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Primary,
    borderRadius: 10,
    marginVertical: heightPercentage(1),
    marginHorizontal: widthPercentage(0.5),
  },
  textStyle: {
    fontSize: 16,
    paddingHorizontal: widthPercentage(2),
    color: Primary,
  },
});
