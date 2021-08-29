import React, { useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FavoriteContext } from '../contexts/FavoriteContext';
import { AppColors, AppStyles } from '../utils/CommonStyles';
import Utilities from '../utils/Utilities';
import AppIcon from './AppIcon';
import AppText from './AppText';
import PosterPlaceholder from './PosterPlaceholder';

export default function Poster({ imageWidth, item, margin, onPress }) {
  const { isFavorite } = useContext(FavoriteContext);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: imageWidth,
        margin: margin,
      }}>
      {isFavorite(item) ? (
        <AppIcon
          name={'star'}
          color={AppColors.gold}
          size={30}
          style={styles.favIcon}
        />
      ) : null}

      {item.image ? (
        <Image
          resizeMode={'contain'}
          style={[
            {
              height: imageWidth * Utilities.verticalRatio,
            },
            AppStyles.borderRadius,
          ]}
          source={{ uri: item.image.medium }}
        />
      ) : (
        <PosterPlaceholder
          size={50}
          icon={'television-classic-off'}
          message={'Poster not available at the time'}
          dark
          style={[
            {
              height: imageWidth * Utilities.verticalRatio,
            },
            AppStyles.borderRadius,
            AppStyles.alignCenter,
          ]}
        />
      )}

      <AppText numberOfLines={3} style={[AppStyles.textCenter, styles.label]}>
        {item.name}
      </AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Bold',
  },
  favIcon: {
    position: 'absolute',
    top: -13,
    left: 88,
    zIndex: 1,
  },
});
