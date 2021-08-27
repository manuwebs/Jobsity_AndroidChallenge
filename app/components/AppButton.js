import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors, AppStyles } from '../utils/CommonStyles';
import AppText from './AppText';

export default function AppButton({ title, onPress, containerStyles }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[AppStyles.borderRadius, styles.buttonContainer, containerStyles]}>
      <AppText style={[AppStyles.textCenter, styles.label]}>{title}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: AppColors.accent,
    paddingHorizontal: 20,
    height: 35,
  },
  label: {
    color: AppColors.white,
  },
});
