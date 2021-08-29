import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppText from '../components/AppText';
import { AppStyles } from '../utils/CommonStyles';
import utilities from '../utils/Utilities';

export default function EmptyPlaceholder({ message }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode={'contain'}
        source={require('../assets/images/not-found.png')}
      />
      <AppText style={[AppStyles.textCenter, styles.text]}>{message}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  image: {
    width: utilities.dimensions.width,
    height: 200,
  },
  text: {
    fontSize: 20,
  },
});
