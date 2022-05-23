import React from "react";
import { View, StyleSheet } from "react-native";
import IconCricle from "../../IconCircle/IconCricle";
import { widthPercentage, heightPercentage } from "../../../global/Dimensions";
import { MaterialCommunityIcons, Entypo, AntDesign } from "@expo/vector-icons";
import shareThisApp from "../../../lib/functions/playStore/shareFunction";

export default ButtonGroup = ({ onSwipeLeft, onSwipeBack, onSwipeRight }) => {
  return (
    <View style={styles.buttonGroup}>
      <IconCricle onPress={onSwipeRight} styles={styles.iconSpace}>
        <AntDesign
          name="hearto"
          size={30}
          color="#FFF"
          style={{ width: widthPercentage(7.7) }}
        />
      </IconCricle>
      <IconCricle onPress={onSwipeLeft} styles={styles.iconSpace}>
        <Entypo name="cross" size={42} color="#fff" />
      </IconCricle>
      <IconCricle styles={styles.iconSpace}>
        <MaterialCommunityIcons
          name="share"
          size={35}
          color="#FFF"
          onPress={shareThisApp}
        />
      </IconCricle>
      <IconCricle onPress={onSwipeBack} styles={styles.iconSpace}>
        <MaterialCommunityIcons name="history" size={35} color="#fff" />
      </IconCricle>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    position: "absolute",
    bottom: heightPercentage(13),
    right: 0,
    justifyContent: "space-between",
    height: heightPercentage(25),
    zIndex: 1,
  },
  iconSpace: { marginVertical: heightPercentage(1) },
});
