import React from 'react';
import { ActivityIndicator } from 'react-native';
import { AppColors } from '../utils/CommonStyles';

export default function LoadingIndicator() {
  return <ActivityIndicator size={'large'} color={AppColors.primary} />;
}
