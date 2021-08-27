import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { AppColors } from '../utils/CommonStyles';

export default function Container({ children, style, scrollable = false }) {
  return (
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar
        backgroundColor={AppColors.secondary}
        barStyle="light-content"
      />
      {scrollable ? (
        <ScrollView
          persistentScrollbar
          style={[styles.innerContainer]}
          contentContainerStyle={style}>
          {children}
        </ScrollView>
      ) : (
        <View style={styles.innerContainer}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: { backgroundColor: AppColors.secondary, flex: 1 },
  innerContainer: { backgroundColor: AppColors.white, flex: 1 },
});
