import React from "react";
import { Text, View } from "react-native";
import ImageRounded from "../Images/ImagesRounded";
import { widthPercentage, heightPercentage } from "../../global/Dimensions";
import { useNavigation } from "@react-navigation/native";
import TextParagraph from "../Text/TextParagraph";

const ListHeader = ({ item }) => {
  const navigation = useNavigation();

  const profileOnClick = () => {
    navigation.navigate("UserDetails", { userTargetData: item });
  };

  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: widthPercentage(2),
        paddingBottom: heightPercentage(1),
      }}
    >
      <ImageRounded
        source={{ uri: item.userProfile.imageUri }}
        size={50}
        roundStyle={{ borderWidth: 1, borderColor: "red" }}
        onPress={profileOnClick}
      />
      <TextParagraph style={{fontSize: 13}}>
        {item.name.length > 5 ? item.name.slice(0, 5) + "..." : item.name}
      </TextParagraph>
    </View>
  );
};

export default ListHeader;
