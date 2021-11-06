import React from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
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
        <View style={[styles.innerContainer, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  outerContainer: { backgroundColor: AppColors.secondary, flex: 1 },
  innerContainer: { backgroundColor: AppColors.white, flex: 1 },
});
