import Textarea from "react-native-textarea";
import React from "react";
import { Text } from "react-native";
import { Red } from "../../../global/Colors";
import { styles } from "./TextAreaStyles";

const TextAreaStyles = ({
  value,
  onChangeText,
  placeholder,
  error,
  errorMessage,
  styleTextArea,
}) => {
  return (
    <>
      <Textarea
        containerStyle={[
          styles.textareaContainer,
          { borderColor: error ? Red : "#f3f3f3" },
          styleTextArea,
        ]}
        style={styles.textarea}
        onChangeText={onChangeText}
        defaultValue={value}
        maxLength={80}
        placeholder={placeholder}
        placeholderTextColor={"#c7c7c7"}
        underlineColorAndroid={"transparent"}
      />
      {error && <Text style={{ color: Red }}>{errorMessage}</Text>}
    </>
  );
};

export default TextAreaStyles;
