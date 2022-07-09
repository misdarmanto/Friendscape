import React from "react";
import LottieView from "lottie-react-native";
import { heightPercentage, widthPercentage } from "../../global/Dimensions";
import Layout from "../../layouts";

function LoadingAnimation() {
  return (
    <Layout
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
    </Layout>
  );
}

export default LoadingAnimation;
