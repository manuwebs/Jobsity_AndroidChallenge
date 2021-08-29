import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FavoriteContext } from '../contexts/FavoriteContext';
import usePrevious from '../hooks/usePrevious';
import { AppColors, AppStyles } from '../utils/CommonStyles';
import Utilities from '../utils/Utilities';
import AppIcon from './AppIcon';
import AppRoundButton from './AppRoundButton';
import AppText from './AppText';
import EmptyPlaceholder from './EmptyPlaceholder';
import LoadingIndicator from './LoadingIndicator';
import PosterPlaceholder from './PosterPlaceholder';

export default function AlphabeticalShowList({
  loading = false,
  numberOfColumns = 3,
  margin = 10,
  onEndReached,
  onShowPress,
  shows,
}) {
  // margin * 2 because margin applies on sides
  const imageWidth = Utilities.dimensions.width / numberOfColumns - margin * 2;

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const prevShows = usePrevious(shows);
  const { isFavorite, updateFavorites } = useContext(FavoriteContext);
  let flatList = useRef(null);

  // scrolls to top everytime shows change (on serach, on cancel)
  useEffect(
    () =>
      // makes sure that the current shows doesn't contains the previous shows before scrolling
      shows.filter(s => prevShows?.indexOf(s) >= 0).length !== prevShows?.length
        ? flatList.current?.scrollToOffset(0)
        : null,
    [shows],
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onShowPress(item)}
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

  return (
    <>
      {showScrollToTop && (
        <AppRoundButton
          title={
            <AppIcon
              name={'arrow-up-thick'}
              size={20}
              color={AppColors.white}
            />
          }
          onPress={() => flatList.current?.scrollToOffset(0)}
          size={40}
          containerStyles={styles.floatingButton}
        />
      )}
      <FlatList
        ref={flatList}
        persistentScrollbar
        contentContainerStyle={{ flexGrow: 1 }}
        data={shows}
        keyExtractor={item => item.id}
        ListEmptyComponent={() =>
          !loading && (
            <EmptyPlaceholder message="Ups!, We have not found anything with your search term" />
          )
        }
        onScroll={({ nativeEvent }) =>
          // if y scroll is greather than 10 px then show floating button
          nativeEvent.contentOffset.y > 10
            ? !showScrollToTop
              ? setShowScrollToTop(true)
              : null
            : setShowScrollToTop(false)
        }
        onEndReached={onEndReached}
        renderItem={renderItem}
        ListFooterComponent={() => loading && <LoadingIndicator />}
        numColumns={numberOfColumns}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontWeight: '500',
  },
  floatingButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    right: 10,
  },
  favIcon: {
    position: 'absolute',
    top: -13,
    left: 88,
    zIndex: 1,
  },
});
