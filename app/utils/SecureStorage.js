import EncryptedStorage from 'react-native-encrypted-storage';

const save = async (key, data) => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
};

const get = async key => {
  try {
    const data = await EncryptedStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {
    return '';
  }
};

const remove = async key => {
  try {
    await EncryptedStorage.removeItem(key);
    return true;
  } catch (error) {
    return false;
  }
};

const clearStorage = async () => {
  try {
    await EncryptedStorage.clear();
    return true;
  } catch (error) {
    return false;
  }
};

export default { save, get, remove, clearStorage };
