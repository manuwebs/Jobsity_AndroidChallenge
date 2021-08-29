import { Alert } from 'react-native';

export const YesNoAlert = (title, message, callback) => {
  return Alert.alert(title, message, [
    {
      text: 'No',
    },
    { text: 'Yes', onPress: () => callback() },
  ]);
};
