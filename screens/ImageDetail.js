import React from "react";
import { ImageBackground } from "react-native";
import { useRoute } from "@react-navigation/native";

const ImageDetail = () => {
  const { imageUri } = useRoute().params;
  return (
    <ImageBackground
      resizeMode="cover"
      style={{ flex: 1 }}
      source={{ uri: imageUri }}
    />
  );
};

export default ImageDetail;
