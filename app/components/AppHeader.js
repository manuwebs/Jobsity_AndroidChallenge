import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { AppColors, AppStyles } from '../utils/CommonStyles';

export default function AppHeader() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <Image
          style={[AppStyles.alignCenter, styles.logo]}
          source={require('../assets/images/logo.png')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: AppColors.gray + '40',
    borderBottomWidth: 0.5,
  },
  logo: {
    resizeMode: 'contain',
    height: 25,
  },
  mainContainer: {
    backgroundColor: AppColors.secondary,
  },
});
