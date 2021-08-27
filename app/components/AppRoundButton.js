import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors, AppStyles } from '../utils/CommonStyles';
import AppText from './AppText';

export default function AppRoundButton({
  title,
  onPress,
  containerStyles,
  size,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        AppStyles.borderRadius,
        styles.buttonContainer,
        containerStyles,
        { width: size, height: size, borderRadius: size / 2 },
      ]}>
      <AppText style={[AppStyles.textCenter, styles.label]}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.accent,
  },
  label: {
    color: AppColors.white,
  },
});
