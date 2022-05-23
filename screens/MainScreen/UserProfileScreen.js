import React, { useEffect, useLayoutEffect, useState } from "react";
import Layout from "../../layouts";
import { TouchableOpacity } from "react-native";
import TextTitle from "../../components/Text/TextTitle";
import { signOut, getAuth } from "firebase/auth";
import { useContextApi } from "../../lib/hooks/useContextApi";
import { useNavigation } from "@react-navigation/native";
import { widthPercentage } from "../../global/Dimensions";
import { Feather } from "@expo/vector-icons";
import ImageRounded from "../../components/Images/ImagesRounded";
import { Primary } from "../../global/Colors";
import ImageWrapper from "../../components/Images/ImageWraper";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import TextParagraph from "../../components/Text/TextParagraph";
import Wrapper from "../../components/Wrapper";
import HeaderLeftArrow from "../../components/Header/HeaderLeftArrow";
import { clearAllDataLocalStorage } from "../../lib/functions/asyncStorage/localStorage";
import { db } from "../../lib/helper/firebase";
import { doc, onSnapshot } from "firebase/firestore";

const UserProfile = () => {
  const { setIsAuth, setCurrentUserData, currentUserData } = useContextApi();
  const [isDataAvaliable, setIsDataAvaliable] = useState(false);
  const [userData, setUserData] = useState([]);
  const navigation = useNavigation();

  const logOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        setIsAuth(false);
        setCurrentUserData({});
        clearAllDataLocalStorage();
      })
      .catch((error) => console.log(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={logOut}
        >
          <TextTitle TextStyles={{ color: Primary }}>Logout</TextTitle>
          <Feather name="log-out" size={22} color={Primary} />
        </TouchableOpacity>
      ),
      headerLeft: () => <HeaderLeftArrow />,
    });
  }, []);

  useEffect(() => {
    const collectionName =
      currentUserData.gender === "male" ? "MaleContent" : "FemaleContent";
    const docRef = doc(db, collectionName, currentUserData.id);
    const unsubContentDocRef = onSnapshot(docRef, (docSnap) => {
      setUserData(docSnap.data());
      setIsDataAvaliable(true);
    });
    return () => unsubContentDocRef();
  }, []);

  return (
    <Layout>
      {isDataAvaliable && (
        <>
          <Wrapper wrapperStyle={{ justifyContent: "flex-start", flex: 0 }}>
            <ImageRounded
              source={{ uri: userData.userProfile.imageUri }}
              opacity={0}
              size={70}
              onPress={() =>
                navigation.navigate("ImageDetail", {
                  imageUri: userData.userProfile.imageUri,
                })
              }
            />
            <TextTitle style={{ paddingHorizontal: widthPercentage(4) }}>
              {userData.name} {userData.age}
            </TextTitle>
          </Wrapper>
          <TextParagraph> Bio : {userData.description}</TextParagraph>
          <ButtonPrimary
            title={"Edit Profile"}
            onPress={() =>
              navigation.navigate("EditProfile", { userData: userData })
            }
          />
          {/* image wrapper */}

          <ImageWrapper imageArray={userData.images} />
        </>
      )}
    </Layout>
  );
};

export default UserProfile;
