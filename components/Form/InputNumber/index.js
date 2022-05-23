import React from "react";
import { Gray } from "../../../global/Colors";
import { heightPercentage, widthPercentage } from "../../../global/Dimensions";
import SelectDropdown from "react-native-select-dropdown";

const InputNumber = ({ onChangeText, value }) => {
  const numberArray = () => {
    const num = [];
    for (let i = 10; i <= 60; i++) {
      num.push(i.toString());
    }
    return num;
  };

  return (
    <SelectDropdown
      buttonStyle={{ backgroundColor: "#FFF", width: widthPercentage(15) }}
      data={numberArray()}
      defaultValue={value || 18}
      dropdownStyle={{
        height: heightPercentage(15),
        width: widthPercentage(20),
      }}
      buttonTextStyle={{ color: Gray }}
      onSelect={(selectedItem) => onChangeText(selectedItem)}
      buttonTextAfterSelection={(selectedItem) => selectedItem}
      rowTextForSelection={(item) => item}
    />
  );
};

export default InputNumber;
