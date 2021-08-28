import React from 'react';
import {
  Keyboard,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { AppColors } from '../utils/CommonStyles';

export default function Container({
  children,
  style,
  scrollable = false,
  onRefresh,
  refreshing = null,
}) {
  return (
    <SafeAreaView style={styles.outerContainer}>
      <StatusBar
        backgroundColor={AppColors.secondary}
        barStyle="light-content"
      />
      {scrollable ? (
        <ScrollView
          refreshControl={
            refreshing !== null && (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            )
          }
          keyboardShouldPersistTaps={'handled'}
          persistentScrollbar
          style={[styles.innerContainer]}
          contentContainerStyle={style}>
          {children}
        </ScrollView>
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={[styles.innerContainer, style]}>{children}</View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: { backgroundColor: AppColors.secondary, flex: 1 },
  innerContainer: { backgroundColor: AppColors.white, flex: 1 },
});
