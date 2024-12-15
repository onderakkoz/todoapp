import AsyncStorage from '@react-native-async-storage/async-storage';

export const setItem = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('setItem', error);
  }
};

export const getItem = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    return JSON.parse(value);
  } catch (error) {
    console.error('getItem', error);
  }
};

export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('removeItem', error);
  }
};
