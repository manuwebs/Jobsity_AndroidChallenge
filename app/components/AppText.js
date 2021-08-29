import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { AppColors } from '../utils/CommonStyles';

export default function AppText({ children, style, numberOfLines }) {
  return (
    <Text numberOfLines={numberOfLines} style={[styles.text, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    color: AppColors.black,
    fontFamily: 'Ubuntu-Light',
  },
});
