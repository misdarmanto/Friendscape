import React, { useState } from "react";
import Layout from "../../layouts";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { heightPercentage, widthPercentage } from "../../global/Dimensions";
import { Entypo, Feather } from "@expo/vector-icons";
import { Gray, Primary } from "../../global/Colors";
import InputField from "../../components/Form/InputField";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ButtonSecondary from "../../components/Buttons/ButtonSecondary";
import TextTitle from "../../components/Text/TextTitle";
import Wrapper from "../../components/Wrapper";
import TextParagraph from "../../components/Text/TextParagraph";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const navigation = useNavigation();

  const submit = () => {
    setErrorMessageEmail("");
    setErrorMessagePassword("");

    if (password === "") {
      setErrorMessagePassword("Opss... tidak boleh ada yg kosong");
      setIsError(true);
      return;
    }
    if (email === "") {
      setErrorMessageEmail("Opss... tidak boleh ada yg kosong");
      setIsError(true);
      return;
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-email":
            setErrorMessageEmail("Opss... email tidak valid");
            break;
          case "auth/email-already-in-use":
            setErrorMessageEmail("Opss... email sudah digunakan");
            break;
          case "auth/user-not-found":
            setErrorMessageEmail(
              "Opss... user tidak ditemukan, silahkan buat akun"
            );
            break;
          case "auth/wrong-password":
            setErrorMessagePassword("Opss... Password salah");
            break;
        }
        setIsError(true);
      });
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.title}>
        <TextTitle TextStyles={{ fontSize: 25, color: Primary }}>Login</TextTitle>
      </View>

      {/* input fields */}
      <View>
        <InputField
          value={email}
          onChangeText={(value) => {
            setEmail(value);
            setIsError(false);
          }}
          placeholder={"E-mail..."}
          error={isError}
          errorMessage={errorMessageEmail}
        >
          <Entypo name="email" size={24} color={Gray} />
        </InputField>
        <InputField
          value={password}
          inputScure={showPassword}
          showPaswordIcon={true}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onChangeText={(value) => {
            setPassword(value);
            setIsError(false);
          }}
          placeholder={"Password..."}
          error={isError}
          errorMessage={errorMessagePassword}
        >
          <Feather name="lock" size={24} color={Gray} />
        </InputField>
        <ButtonSecondary
          onPress={submit}
          style={{ marginTop: heightPercentage(2) }}
        >
          Login
        </ButtonSecondary>
      </View>

      <Wrapper wrapperStyle={styles.textBottom}>
        <TextParagraph>Belum Punya Akun?</TextParagraph>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <TextTitle TextStyles={{ color: Primary }}>Sign In</TextTitle>
        </TouchableOpacity>
      </Wrapper>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentage(5),
    justifyContent: "space-between",
  },
  title: {
    height: heightPercentage(10),
    marginTop: heightPercentage(10),
    justifyContent: "center",
    alignItems: "center",
  },
  textBottom: {
    height: heightPercentage(15),
    paddingTop: heightPercentage(2),
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default LoginScreen;
