import AsyncStorage from "@react-native-async-storage/async-storage";

export const getObjectFromLocalStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.log(e);
  }
};

export const storeObjectToLocalStorage = async (key, data) => {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getValueFromLocalStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) return value;
  } catch (e) {
    console.log(e);
  }
};

export const storeValueToLocalStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value + "");
  } catch (e) {
    console.log(e);
  }
};

export const clearAllDataLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.log(e);
  }
  console.log("clear succsess");
};
