import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppColors } from '../utils/CommonStyles';
import AppIcon from './AppIcon';
import AppText from './AppText';

export default function PosterPlaceholder({ style, size, dark = false }) {
  return (
    <View style={[styles.container, dark ? styles.background : null, style]}>
      <AppIcon name={'television-classic'} size={size} />
      <AppText style={styles.noImageText}>
        Poster not available at the time
      </AppText>
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
