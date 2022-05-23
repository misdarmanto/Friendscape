import { heightPercentage, widthPercentage } from "../../global/Dimensions";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: widthPercentage(3),
    paddingVertical: heightPercentage(5),
  },
  darkness: {
    backgroundColor: "rgba(0,0,0,0.2)",
    width: widthPercentage(100),
    height: heightPercentage(100),
    position: "absolute",
  },
});
