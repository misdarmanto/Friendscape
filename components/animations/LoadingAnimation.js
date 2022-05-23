import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { heightPercentage, widthPercentage } from "../../global/Dimensions"

function LoadingAnimation() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
     <LottieView
        style={{ width: widthPercentage(60), height: heightPercentage(25) }}
        source={require("../../assets/LottieFile/loading.json")}
        autoPlay
        loop={true}
      />
    </View>
  );
}

export default LoadingAnimation;