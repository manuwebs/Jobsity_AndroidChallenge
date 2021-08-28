import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AppColors, AppStyles } from '../utils/CommonStyles';

export default function AppInput({
  placeholder,
  value,
  onChangeText,
  containerStyle,
  style,
  keyboardType = 'default',
  maxLength,
  textAlign = 'left',
  password = false,
}) {
  return (
    <View style={containerStyle}>
      <TextInput
        style={[AppStyles.borderRadius, styles.textInput, style]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={maxLength}
        textAlign={textAlign}
        secureTextEntry={password}
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
