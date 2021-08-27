import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AppColors, AppStyles } from '../utils/CommonStyles';

export default function AppInput({
  placeholder,
  value,
  onChangeText,
  containerStyle,
  style,
}) {
  return (
    <View style={containerStyle}>
      <TextInput
        style={[AppStyles.borderRadius, styles.textInput, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: AppColors.gray,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
});
