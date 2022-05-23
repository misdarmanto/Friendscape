import React, { useState, useLayoutEffect, useEffect } from "react";
import Layout from "../layouts";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import { useContextApi } from "../lib/hooks/useContextApi";
import { db } from "../lib/helper/firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import InputField from "../components/Form/InputField";
import { useNavigation } from "@react-navigation/native";
import { heightPercentage, widthPercentage } from "../global/Dimensions";
import ImageRounded from "../components/Images/ImagesRounded";
import { Red, Primary } from "../global/Colors";
import TextAreaStyles from "../components/Form/TextArea";
import InputNumber from "../components/Form/InputNumber";
import { deleteImageFromStorage } from "../lib/functions/firebaseStorage/deleteImageFromStorage";
import {
  uploadUserImages,
  uploadImageProfile,
} from "../lib/functions/firebaseStorage/uploadImage";
import ImageWrapper from "../components/Images/ImageWraper";
import ButtonPrimary from "../components/Buttons/ButtonPrimary";
import HeaderLeftArrow from "../components/Header/HeaderLeftArrow";

const EditProfile = () => {
  const { currentUserData } = useContextApi();
  const navigation = useNavigation();

  const [userProfile, setUserProfile] = useState({});
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [userImages, setUserImages] = useState([]);
  const [descriptions, setDescriptions] = useState("");

  const deleteImage = (img) => {
    const result = userImages.filter((v) => v.imageUri !== img.imageUri);
    setUserImages(result);
    deleteImageFromStorage(img.path);
  };

  const uploadProfile = () => {
    uploadImageProfile(userProfile, setUserProfile);
  };

  const uploaImage = () => {
    uploadUserImages(userImages, setUserImages);
  };

  const saveData = async () => {
    if (userProfile.imageUri === "") {
      alert("profile can't empty");
      return;
    }
    if (name === "") {
      alert("name can't empty");
      return;
    }
    if (name.length > 20) {
      alert("nama terlalu panjang");
      return;
    }
    if (userImages.length === 0) {
      alert("image can't empty");
      return;
    }

    try {
      const collectionName =
        currentUserData.gender === "male" ? "MaleContent" : "FemaleContent";
      const PublicCollectionDocRef = doc(
        db,
        collectionName,
        currentUserData.id
      );
      await updateDoc(PublicCollectionDocRef, {
        name: name,
        age: age,
        images: userImages,
        userProfile: userProfile,
        description: descriptions,
      });
      const UsersCollectionDocRef = doc(db, "Users", currentUserData.id);
      await updateDoc(UsersCollectionDocRef, {
        name: name,
        userProfile: userProfile,
      }).then(() => navigation.goBack());
    } catch (err) {
      console.log(err);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Edit Profile",
      headerLeft: () => <HeaderLeftArrow />,
    });
  }, []);

  useEffect(() => {
    // get current user data from public collection
    const collectionName =
      currentUserData.gender === "male" ? "MaleContent" : "FemaleContent";
    const docRef = doc(db, collectionName, currentUserData.id);
    const unsubContentDocRef = onSnapshot(docRef, (doc) => {
      const data = { ...doc.data() };
      setUserProfile(data.userProfile);
      setName(data.name);
      setAge(data.age);
      setDescriptions(data.description);
      setUserImages(data.images);
    });
    return () => unsubContentDocRef();
  }, []);

  return (
    <Layout style={{ paddingHorizontal: widthPercentage(1.5) }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageRoundeContainer}>
          <ImageRounded source={{ uri: userProfile.imageUri }} opacity={1} />
          <ButtonPrimary
            title={"Change Profile"}
            onPress={uploadProfile}
            size={4}
          />
        </View>

        <View style={{ marginVertical: heightPercentage(2) }}>
          <View style={styles.formContainer}>
            <Text style={{ fontSize: 13 }}>Name</Text>
            <InputField
              value={name}
              onChangeText={setName}
              inputStyles={[styles.inputForm, { borderColor: "#FFF" }]}
            />
          </View>

          <View
            style={[styles.formContainer, { justifyContent: "flex-start" }]}
          >
            <Text style={{ fontSize: 13 }}>Age </Text>
            <InputNumber onChangeText={setAge} value={age} />
          </View>

          <View style={styles.formContainer}>
            <Text style={{ fontSize: 13 }}>Bio</Text>
            <TextAreaStyles
              titleStyle={{ fontSize: 17 }}
              value={descriptions}
              onChangeText={(value) => {
                setDescriptions(value);
              }}
              placeholder="Diskripsi singkat tentang diri mu "
            />
          </View>

          <View style={{ marginTop: heightPercentage(2) }}>
            <Text style={{ fontSize: 13, marginBottom: heightPercentage(2) }}>
              Image
            </Text>
            <ButtonPrimary
              title={"Choice Image"}
              onPress={uploaImage}
              buttonStyle={{ width: widthPercentage(30) }}
            />
          </View>
          {userImages.length !== 0 && (
            <>
              <Text style={{ color: Red }}>max 2 image</Text>
              <ImageWrapper
                imageArray={userImages}
                showDeleteIcon={true}
                deleteImage={deleteImage}
              />
            </>
          )}
        </View>
        <ButtonPrimary
          title={"save"}
          onPress={saveData}
          buttonStyle={{ marginBottom: heightPercentage(10) }}
        />
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    flexDirection: "column",
  },
  inputForm: {
    borderWidth: 0,
    paddingHorizontal: widthPercentage(5),
    height: heightPercentage(5),
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: heightPercentage(2),
  },
  imageRoundeContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: heightPercentage(2),
  },
  btnChoiceImage: {
    paddingHorizontal: widthPercentage(5),
    backgroundColor: Primary,
    paddingVertical: heightPercentage(1),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: widthPercentage(40),
    height: heightPercentage(5),
  },
  imageStyles: {
    width: widthPercentage(45),
    height: heightPercentage(30),
    borderRadius: 10,
  },
});

export default EditProfile;
