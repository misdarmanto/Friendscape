import { StyleSheet } from "react-native";
import { heightPercentage, widthPercentage } from "../../global/Dimensions";

export const styles = StyleSheet.create({
  wrapperContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    marginHorizontal: widthPercentage(0.5),
    marginVertical: heightPercentage(2),
  },
});
