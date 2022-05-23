import { StyleSheet } from "react-native";
import { heightPercentage, widthPercentage } from "../../global/Dimensions";

export const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
    },
    modalView: {
      height: heightPercentage(50),
      marginHorizontal: widthPercentage(2),
      backgroundColor: "#FFF",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      paddingVertical: heightPercentage(8),
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  
  });