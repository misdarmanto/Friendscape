import React, { useLayoutEffect, useState } from "react";
import Layout from "../../layouts";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { heightPercentage, widthPercentage } from "../../global/Dimensions";
import { FontAwesome5, Entypo, Feather } from "@expo/vector-icons";
import { Blue, Gray, Primary, Red } from "../../global/Colors";
import TextSmall from "../../components/Text/TextSmall";
import InputField from "../../components/Form/InputField";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../lib/database/firebase";
import RadioButtom from "../../components/Form/RadioButtom";
import InputNumber from "../../components/Form/InputNumber";
import { uploadUserImages } from "../../lib/functions/firebaseStorage/uploadImage";
import { deleteImageFromStorage } from "../../lib/functions/firebaseStorage/deleteImageFromStorage";
import ButtonPrimary from "../../components/Buttons/ButtonPrimary";
import ButtonSecondary from "../../components/Buttons/ButtonSecondary";
import Wrapper from "../../components/Wrapper";
import HeaderLeftArrow from "../../components/Header/HeaderLeftArrow";


const SignInScreen = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedAge, setSelectedAge] = useState(18);
  const [selectedGender, setSelectedGender] = useState("");

  const [errorUserName, setErrorUserName] = useState({});
  const [errorEmail, setErrorEmail] = useState({});
  const [errorPassword, setErrorPassword] = useState({});

  const [showPassword, setShowPassword] = useState(true);
  const [selectedGenderIsEmpty, setSelectedGenderIsEmpty] = useState(false);
  const [userImages, setUserImages] = useState([]);

  const navigation = useNavigation();

  const deleteImages = (img) => {
    const result = userImages.filter((v) => v.imageUri !== img.imageUri);
    setUserImages(result);
    deleteImageFromStorage(img.path);
  };

  const uploaImage = () => {
    uploadUserImages(userImages, setUserImages);
  };

  const onSubmit = async () => {
    setErrorUserName({});
    setErrorEmail({});
    setErrorPassword({});

    if (userName === "") {
      setErrorUserName({
        message: "username tidak boleh kosong",
        isError: true,
      });
      alert("username tidak boleh kosong");
      return;
    }
    if (userName.length < 3 || userName.length > 20) {
      setErrorUserName({
        message: "user name harus lebih dari 2 dan kurang dari 20 karakter ",
        isError: true,
      });
      alert("user name harus lebih dari 2 dan kurang dari 20 karakter ");
      return;
    }
    if (email === "") {
      setErrorEmail({ message: "email tidak boleh kosong", isError: true });
      alert("email tidak boleh kosong");
      return;
    }
    if (password === "") {
      setErrorPassword({
        message: "password tidak boleh kosong",
        isError: true,
      });
      alert("password tidak boleh kosong");
      return;
    }
    if (password !== confirmPassword) {
      setErrorPassword({ message: "Pasword tidak sama", isError: true });
      alert("Pasword tidak sama");
      return;
    }

    if (selectedGender === 0) {
      setSelectedGenderIsEmpty(true);
      return;
    }
    if (userImages.length === 0) {
      alert("Image can't empty");
      return;
    }

    try {
      const auth = getAuth();
      await createUserWithEmailAndPassword(auth, email, password);
      // create document in Users collection
      const userDocRef = doc(db, "Users", email.toLowerCase());
      await setDoc(userDocRef, {
        name: userName.trim(),
        id: `${email.toLowerCase()}`,
        gender: selectedGender,
        userProfile: {
          imageUri:
            "https://firebasestorage.googleapis.com/v0/b/chatapp-cebed.appspot.com/o/defaultImages%2Favatar.jpeg?alt=media&token=791ae238-6189-4d66-b299-862bcc98f3b4",
          path: "",
        },
        notification: {
          match: 0,
          chat: 0,
        },
        userLikes: [],
        userAlreadyLikes: [],
        chatId: [],
      });

      // create document in Public collection
      const collectionName =
        selectedGender === "male" ? "MaleContent" : "FemaleContent";
      const userPublicDocRef = doc(db, collectionName, email.toLowerCase());
      await setDoc(userPublicDocRef, {
        name: userName.trim(),
        age: selectedAge,
        id: `${email.toLowerCase()}`,
        createAt: Timestamp.now(),
        images:
          userImages.length !== 0 ? userImages : { imageUri: "", path: "" },
        userProfile: {
          imageUri:
            "https://firebasestorage.googleapis.com/v0/b/chatapp-cebed.appspot.com/o/defaultImages%2Favatar.jpeg?alt=media&token=791ae238-6189-4d66-b299-862bcc98f3b4",
          path: "",
        },
        description: "",
      })
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/invalid-email":
          setErrorEmail({ message: "email tidak valid", isError: true });
          break;
        case "auth/email-already-in-use":
          setErrorEmail({ message: "email sudah digunakan", isError: true });
          break;
        case "auth/weak-password":
          setErrorPassword({ message: "password tidak aman", isError: true });
          break;
      }
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <HeaderLeftArrow />,
    });
  }, []);

  return (
    <Layout style={styles.container}>
      {/* title */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* input username*/}
        <InputField
          value={userName}
          onChangeText={(value) => {
            setUserName(value);
            setErrorUserName({});
          }}
          placeholder={"name..."}
          error={errorUserName.isError}
          errorMessage={errorUserName.message}
          inputStyles={{ borderRadius: 10 }}
          inputStylesContainer={{ paddingTop: heightPercentage(5) }}
        >
          <FontAwesome5
            name="user-alt"
            size={24}
            color={Gray}
            style={{ width: widthPercentage(6) }}
          />
        </InputField>

        {/* email */}
        <InputField
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setErrorEmail({});
          }}
          placeholder={"e-mail..."}
          error={errorEmail.isError}
          errorMessage={errorEmail.message}
          inputStyles={{ borderRadius: 10 }}
        >
          <Entypo name="email" size={24} color={Gray} />
        </InputField>

        {/* password */}
        <InputField
          error={errorPassword.isError}
          errorMessage={errorPassword.message}
          value={password}
          inputScure={showPassword}
          showPaswordIcon={true}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onChangeText={(value) => {
            setPassword(value);
            setErrorPassword({});
          }}
          placeholder={"password..."}
          inputStyles={{ borderRadius: 10 }}
        >
          <Feather name="lock" size={24} color={Gray} />
        </InputField>
        <InputField
          error={errorPassword.isError}
          errorMessage={errorPassword.message}
          value={confirmPassword}
          inputScure={showPassword}
          showPaswordIcon={true}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onChangeText={(value) => {
            setConfirmPassword(value);
            setErrorPassword({});
          }}
          placeholder={"confirm password..."}
          inputStyles={{ borderRadius: 10 }}
        >
          <Feather name="lock" size={24} color={Gray} />
        </InputField>

        {/* age */}
        <Wrapper wrapperStyle={{ justifyContent: "flex-start" }}>
          <Text>Usia : </Text>
          <InputNumber onChangeText={setSelectedAge} />
        </Wrapper>

        {/* sellec gender */}
        <Wrapper>
          <Text>Gender : </Text>
          <RadioButtom
            label={"laki-laki"}
            checked={selectedGender}
            value={"male"}
            onSelect={(value) => {
              setSelectedGender(value);
              setSelectedGenderIsEmpty(false);
            }}
            error={selectedGenderIsEmpty}
          />
          <RadioButtom
            label={"Prempuan"}
            checked={selectedGender}
            value={"female"}
            onSelect={(value) => {
              setSelectedGender(value);
              setSelectedGenderIsEmpty(false);
            }}
            error={selectedGenderIsEmpty}
          />
        </Wrapper>

        {/* upload images */}
        <Wrapper wrapperStyle={{ justifyContent: "flex-start" }}>
          <Text style={{ paddingRight: widthPercentage(2) }}>Image:</Text>
          <ButtonPrimary title={"Choice Image"} onPress={uploaImage} />
        </Wrapper>

        {userImages.length !== 0 && (
          <>
            <Text style={{ color: Red }}>max 2 image</Text>
            <View style={styles.imageContainer}>
              {userImages.map((value, index) => (
                <View key={index}>
                  <TouchableOpacity onPress={() => deleteImages(value)}>
                    <Entypo name="circle-with-cross" size={25} color={Red} />
                  </TouchableOpacity>
                  <Image
                    source={{ uri: value.imageUri }}
                    style={styles.imageStyles}
                  />
                </View>
              ))}
            </View>
          </>
        )}

        {/* button submit */}
        <ButtonSecondary
          style={{ marginTop: heightPercentage(4) }}
          onPress={onSubmit}
        >
          Sign In
        </ButtonSecondary>

        {/* text bottom */}
        <View style={styles.textBottom}>
          <TextSmall style={{ fontSize: 16 }}>Sudah Punya Akun?</TextSmall>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: Primary }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentage(3),
  },
  textBottom: {
    height: heightPercentage(15),
    marginVertical: heightPercentage(5),
    flexDirection: "row",
    justifyContent: "center",
  },
  userProfile: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    borderWidth: 1,
    borderColor: "#f3f3f3",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  inputStyles: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: widthPercentage(3),
    marginVertical: heightPercentage(2),
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    paddingHorizontal: widthPercentage(1),
    paddingVertical: heightPercentage(2),
    borderRadius: 20,
  },
  imageStyles: {
    width: widthPercentage(45),
    height: heightPercentage(30),
    borderRadius: 10,
  },
});

export default SignInScreen;
