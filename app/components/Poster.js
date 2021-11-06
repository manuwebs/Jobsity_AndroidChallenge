import { useNavigation } from '@react-navigation/core';
import React, { useContext } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FavoriteContext } from '../contexts/FavoriteContext';
import routes from '../navigation/routes';
import { AppColors, AppStyles } from '../utils/CommonStyles';
import Utilities from '../utils/Utilities';
import AppIcon from './AppIcon';
import AppText from './AppText';
import PosterPlaceholder from './PosterPlaceholder';

export default function Poster({ imageWidth, item, margin }) {
  const { isFavorite, updateFavorites } = useContext(FavoriteContext);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(routes.SHOW_DETAILS, item)}
      onLongPress={() => updateFavorites(item)}
      style={{
        width: imageWidth,
        margin: margin,
      }}>
      {isFavorite(item) ? (
        <AppIcon
          name={'star'}
          color={AppColors.gold}
          size={(imageWidth * Utilities.verticalRatio) / 6}
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
    zIndex: 1,
    top: -10,
    right: 0,
  },
});
