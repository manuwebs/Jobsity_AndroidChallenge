import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppColors } from '../utils/CommonStyles';
import AppIcon from './AppIcon';
import AppText from './AppText';

export default function PosterPlaceholder({
  style,
  size,
  dark = false,
  icon = 'television-classic-off',
  message = 'Poster not available at the time',
}) {
  return (
    <View
      style={[
        styles.container,
        dark ? styles.background : { backgroundColor: AppColors.black },
        style,
      ]}>
      <AppIcon name={icon} size={size} />
      <AppText style={styles.noImageText}>{message}</AppText>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    color: AppColors.white,
    textAlign: 'center',
  },
  background: {
    backgroundColor: AppColors.accent,
  },
});
