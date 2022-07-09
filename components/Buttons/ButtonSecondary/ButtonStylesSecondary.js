import { StyleSheet } from "react-native";
import { Primary } from "../../../global/Colors";
import { heightPercentage, widthPercentage } from "../../../global/Dimensions";

export const styles = StyleSheet.create({
    containerStyle: {
      height: heightPercentage(7),
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: Primary,
      minWidth: widthPercentage(80),
      marginVertical: heightPercentage(1),
    },
    textTitle: {
      color: "#FFF",
      fontSize: 18,
      fontWeight: "bold"
    },
  });