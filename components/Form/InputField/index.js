import React, { memo } from "react";
import { TextInput, View, Text } from "react-native";
import { heightPercentage, widthPercentage } from "../../../global/Dimensions";
import { Gray, Red } from "../../../global/Colors";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./InputFieldStyles";

const InputField = ({
  children,
  onChangeText,
  value,
  placeholder,
  error,
  inputScure,
  showPassword,
  setShowPassword,
  showPaswordIcon,
  errorMessage,
  inputStyles,
  inputStylesContainer,
}) => {
  return (
    <View
      style={[{ marginVertical: heightPercentage(0.5) }, inputStylesContainer]}
    >
      <View
        style={[
          styles.inputContainer,
          { borderColor: error ? Red : "#f3f3f3" },
          inputStyles,
        ]}
      >
        {children}
        <TextInput
          style={styles.input}
          onPressIn={() => null}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={inputScure}
        />
        {showPaswordIcon ? (
          showPassword ? (
            <Ionicons
              style={{ position: "absolute", right: widthPercentage(5) }}
              name="md-eye-off"
              size={24}
              color={Gray}
              onPress={() => setShowPassword(!showPassword)}
            />
          ) : (
            <Ionicons
              style={{ position: "absolute", right: widthPercentage(5) }}
              name="md-eye"
              size={24}
              color={Gray}
              onPress={() => setShowPassword(!showPassword)}
            />
          )
        ) : null}
      </View>
      {error && (
        <Text style={{ color: Red, paddingLeft: widthPercentage(5) }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default memo(InputField);
