import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AppColors } from '../utils/CommonStyles';

export default function AppIcon({
  name,
  size = 20,
  color = AppColors.white,
  style,
}) {
  return <Icon name={name} size={size} color={color} style={style} />;
}
