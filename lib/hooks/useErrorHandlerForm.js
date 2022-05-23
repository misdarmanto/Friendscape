import { useState } from "react";

export const useErrorHandlerForm = ({
  imageProfileUrl,
  userName,
  email,
  password,
  confirmPassword,
  userDescriptions,
  selectedGender,
}) => {
  const [errorUserName, setErrorUserName] = useState({});
  const [errorEmail, setErrorEmail] = useState({});
  const [errorPassword, setErrorPassword] = useState({});
  const [userDescriptionsError, setUserDescriptionsError] = useState({});
  const [selectedGenderIsEmpty, setSelectedGenderIsEmpty] = useState(false);

  const errorHandlerfunction = () => {
    setErrorUserName({});
    setErrorEmail({});
    setErrorPassword({});

    const errorHandler = {}

    if (imageProfileUrl === null) {
      alert("profile can't empty");
      errorHandler.message = "profile can't empty"
      errorHandler.error = true
      return;
    }

    if (userName === "") {
      errorHandler.message = "profile can't empty"
      errorHandler.error = true
      return;
    }
    if (userName.length < 3 || userName.length > 20) {
      setErrorUserName({
        message: "user name harus lebih dari 2 dan kurang dari 20 karakter ",
        isError: true,
      });
      return;
    }
    if (email === "") {
      setErrorEmail({ message: "email tidak boleh kosong", isError: true });
      return;
    }
    if (password === "") {
      setErrorPassword({
        message: "password tidak boleh kosong",
        isError: true,
      });
      return;
    }
    if (password !== confirmPassword) {
      setErrorPassword({ message: "Pasword tidak sama", isError: true });
      return;
    }

    if (userDescriptions === "") {
      setUserDescriptionsError({
        isError: true,
        message: "deskripsi tidak boleh kosong",
      });
      return;
    }
    if (selectedGender === "") {
      setSelectedGenderIsEmpty(true);
      return;
    }
  };

  const errorUserCredential = (error) => {
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
  };
  return {
    errorHandlerfunction,
    errorUserCredential,
    errorUserName,
    errorEmail,
    errorPassword,
    userDescriptionsError,
    selectedGenderIsEmpty,
  };
};
