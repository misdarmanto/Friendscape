import { StyleSheet } from "react-native";
import { heightPercentage, widthPercentage } from "../../global/Dimensions";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    height: heightPercentage(25),
    backgroundColor: "#FFF",
    // justifyContent: "center",
    // alignItems: "center",
    paddingHorizontal: widthPercentage(2),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: heightPercentage(1),
    borderWidth: 1,
    borderColor: "#e3e3e3",
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
