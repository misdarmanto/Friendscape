import { StyleSheet } from "react-native";
import { Red, BgColor } from "../../../global/Colors";

export const styles = StyleSheet.create({
  rounded: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2,
    overflow: "hidden",
    backgroundColor: BgColor,
    justifyContent: "center",
    alignItems: "center",
  },
  notification: {
    minWidth: 16,
    minHeight: 16,
    padding: 2,
    borderRadius: 16 / 2,
    backgroundColor: Red,
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 8,
    color: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});
