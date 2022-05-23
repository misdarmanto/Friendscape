import React from "react";
import { TouchableOpacity, Image } from "react-native";
import { heightPercentage } from "../../global/Dimensions";

const ImageRounded = ({ children, size, source, onPress, styles, opacity }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles} activeOpacity={opacity || 0.5}>
      <Image
        style={{
          width: size || 100,
          height: size || 100,
          borderRadius: size / 2 || 100 / 2,
          marginVertical: heightPercentage(1)
        }}
        source={source}
      />
      {children}
    </TouchableOpacity>
  );
};

export default ImageRounded;
