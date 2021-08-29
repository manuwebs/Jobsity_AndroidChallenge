import React, { useContext, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Poster from '../components/Poster';
import { FavoriteContext } from '../contexts/FavoriteContext';
import usePrevious from '../hooks/usePrevious';
import { AppColors } from '../utils/CommonStyles';
import Utilities from '../utils/Utilities';
import AppIcon from './AppIcon';
import AppRoundButton from './AppRoundButton';
import EmptyPlaceholder from './EmptyPlaceholder';
import LoadingIndicator from './LoadingIndicator';

export default function ShowsList({
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
        renderItem={({ item }) => (
          <Poster
            item={item}
            margin={margin}
            onPress={() => onShowPress(item)}
            imageWidth={imageWidth}
          />
        )}
        ListFooterComponent={() => loading && <LoadingIndicator />}
        numColumns={numberOfColumns}
      />
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    right: 10,
  },
});
