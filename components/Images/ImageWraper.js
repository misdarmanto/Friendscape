import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity, Image, View } from "react-native";
import { widthPercentage, heightPercentage } from "../../global/Dimensions";
import { Entypo } from "@expo/vector-icons";
import { Red } from "../../global/Colors";
import Wrapper from "../Wrapper";

const ImageWrapper = ({ imageArray, showDeleteIcon, deleteImage, styles }) => {
  const navigation = useNavigation();
  return (
    <Wrapper wrapperStyle={styles}>
      {imageArray.map((image, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate("ImageDetail", { imageUri: image.imageUri })
          }
        >
          {showDeleteIcon && (
            <TouchableOpacity
              onPress={() => deleteImage(image)}
              style={{ marginLeft: widthPercentage(1) }}
            >
              <Entypo name="circle-with-cross" size={25} color={Red} />
            </TouchableOpacity>
          )}
          <Image
            source={{ uri: image.imageUri }}
            style={{
              width: widthPercentage(47.5),
              height: heightPercentage(30),
              borderRadius: 10,
            }}
          />
        </TouchableOpacity>
      ))}
    </Wrapper>
  );
};

export default ImageWrapper;
