import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { AppColors } from '../utils/CommonStyles';

export default function AppButton({ title, onPress, containerStyles }) {
  return (
    <View style={[styles.buttonContainer, containerStyles]}>
      <Button title={title} onPress={onPress} color={AppColors.accent} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
  },
});
