import React, { useEffect, useState } from "react";
import { heightPercentage, widthPercentage } from "../../global/Dimensions";
import { View, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import ImageRounded from "../Images/ImagesRounded";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./cardStyles";
import Wrapper from "../Wrapper";
import TextParagraph from "../Text/TextParagraph";
import TextTitle from "../Text/TextTitle";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import { useAlgorithm } from "../../lib/hooks/useAlgorithm";
import { useContextApi } from "../../lib/hooks/useContextApi";
import BannerAd from "../AdMob/BannerAd";
import { Primary } from "../../global/Colors";


const Card = ({ cardData, index }) => {
  const { handleUserLike } = useAlgorithm();
  const navigation = useNavigation();
  const { currentUserData } = useContextApi();

  const navigateToUserDetail = async () => {
    navigation.navigate("UserDetails", { userTargetData: cardData });
  };

  const [buttonTitle, setButtonTitle] = useState("");

  // check apakah user target sedang menunggu konfirmasi dari user saat ini (btn title "Terima")
  const isWaitToConfirm = currentUserData.userAlreadyLikes.includes(
    cardData.id
  );
  // chek apakah user saat ini sedang menunggu konfirmasi dari user target (btn title "menunggu konfirmasi")
  const confirmThisUser = currentUserData.userLikes.includes(cardData.id);
  // chek apakah chat room sudah ada ( return function boolean)
  const isChatRoomExist = () => {
    return (
      currentUserData.chatId.filter((id) => {
        return id.userChatTargetId === cardData.id;
      }).length !== 0
    );
  };

  // arahkan ke Message screen
  const navigateToMessageScreen = () => {
    const findChatRoomObject = currentUserData.chatId.filter(
      (chatRef) => chatRef.userChatTargetId === cardData.id
    );
    navigation.navigate("Message", {
      chatRef: findChatRoomObject[0].chatRef,
      userProfile: cardData.userProfile,
      name: cardData.name,
      userTargetId: cardData.id,
    });
  };

  const buttonActionOnPress = () => {
    // jika menungu konfirmasi maka berhentikan eksekusi
    if (isWaitToConfirm) return;

    if (confirmThisUser) {
      handleUserLike(cardData);
      setButtonTitle("Kirim Pesan...");
      return;
    }

    // jika chat room ada, arahkan ke message screen
    if (isChatRoomExist()) {
      navigateToMessageScreen();
      return;
    }
    // jika button title "Terima" atau "ajak jadian" eksekusi handleUserLike
    handleUserLike(cardData).then(() => setButtonTitle("Tunggu Konfirmasi"));
  };

  useEffect(() => {
    if (isWaitToConfirm) {
      setButtonTitle("Tunggu konfirmasi");
    } else if (confirmThisUser) {
      setButtonTitle("Terima");
    } else if (isChatRoomExist()) {
      setButtonTitle("Kirim Pesan...");
    } else {
      setButtonTitle("Ajak jadian");
    }
  }, []);

  const handleOnScroll = (event) => {
    const index = parseInt(
      event.nativeEvent.contentOffset.x / Dimensions.get("window").width
    );
    console.log(event.nativeEvent.contentOffset.y);
  };

  return (
    <View>
      <Wrapper
        wrapperStyle={{
          justifyContent: "flex-start",
          marginBottom: 0,
          paddingHorizontal: widthPercentage(2),
        }}
      >
        <ImageRounded
          onPress={navigateToUserDetail}
          source={{ uri: cardData.userProfile.imageUri }}
          size={45}
        />
        <TextTitle TextStyles={{ fontSize: 16 }}>
          {cardData.name} {cardData.age}
        </TextTitle>
      </Wrapper>
      <ScrollView horizontal pagingEnabled onScroll={(e) => handleOnScroll(e)} >
        {cardData.images.map((item, index) => {
          return (
            <Image
              key={index}
              source={{ uri: item.imageUri }}
              style={{
                width: widthPercentage(100),
                height: heightPercentage(70),
              }}
            />
          );
        })}
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          paddingTop: heightPercentage(1),
        }}
      >
        {cardData.images.length > 1 &&
          cardData.images.map((data, i) => {
            return <Indicator key={i} />;
          })}
      </View>
      <View
        style={{
          paddingHorizontal: widthPercentage(2.5),
          paddingBottom: heightPercentage(2),
        }}
      >
        <TextParagraph
          style={{ paddingVertical: heightPercentage(1), color: "gray" }}
        >
          {cardData.description}
        </TextParagraph>
        <ButtonPrimary
          title={buttonTitle}
          onPress={buttonActionOnPress}
          full={true}
          buttonStyle={{ paddingVertical: heightPercentage(0) }}
        />
      </View>
      {index % 4 === 0 && <BannerAd />}
    </View>
  );
};

const Indicator = () => {
  return (
    <View
      style={{
        backgroundColor: Primary,
        width: 13,
        height: 13,
        borderRadius: 13 / 2,
        marginHorizontal: widthPercentage(0.5),
      }}
    ></View>
  );
};

export default Card;
