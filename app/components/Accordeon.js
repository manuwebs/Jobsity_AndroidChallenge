import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppColors, AppStyles } from '../utils/CommonStyles';
import AppIcon from './AppIcon';
import AppText from './AppText';

export default function Accordeon({ title, children, containerStyle }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        style={[AppStyles.borderRadius, styles.header]}
        onPress={() => setExpanded(!expanded)}>
        <AppText style={styles.title}>{title}</AppText>
        <AppIcon name={expanded ? 'chevron-up' : 'chevron-down'} />
      </TouchableOpacity>

      <View style={[styles.children, { display: expanded ? 'flex' : 'none' }]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: AppColors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: AppColors.white,
  },
  children: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: AppColors.black,
  },
});
