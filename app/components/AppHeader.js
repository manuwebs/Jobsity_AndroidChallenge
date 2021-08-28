import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { AppColors, AppStyles } from '../utils/CommonStyles';

export default function AppHeader() {
  return (
    <View style={styles.container}>
      <Image
        style={[AppStyles.alignCenter, styles.logo]}
        source={require('../assets/images/logo.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    borderBottomColor: AppColors.black + '80',
    borderBottomWidth: 0.5,
    backgroundColor: AppColors.secondary,
  },
  logo: {
    resizeMode: 'contain',
    height: 25,
  },
});
