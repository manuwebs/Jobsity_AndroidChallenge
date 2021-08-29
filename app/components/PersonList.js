import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { AppColors, AppStyles } from '../utils/CommonStyles';
import Utilities from '../utils/Utilities';
import AppIcon from './AppIcon';
import AppRoundButton from './AppRoundButton';
import AppText from './AppText';
import EmptyPlaceholder from './EmptyPlaceholder';
import LoadingIndicator from './LoadingIndicator';
import PosterPlaceholder from './PosterPlaceholder';

export default function PersonList({
  loading = false,
  numberOfColumns = 3,
  margin = 10,
  onEndReached,
  onShowPress,
  data,
}) {
  // margin * 2 because margin applies on sides
  const imageWidth = Utilities.dimensions.width / numberOfColumns - margin * 2;

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  let flatList = useRef(null);

  // scrolls to top everytime shows change (on serach, on cancel)
  useEffect(() => flatList?.current?.scrollToOffset(0), [data]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onShowPress(item)}
      style={{
        width: imageWidth,
        margin: margin,
      }}>
      {item.image ? (
        <Image
          resizeMode={'cover'}
          style={[
            {
              borderRadius: imageWidth / 2,
              height: imageWidth,
            },
            styles.image,
          ]}
          source={{ uri: item.image.medium }}
        />
      ) : (
        <PosterPlaceholder
          size={35}
          icon={'account-off-outline'}
          message={'Picture not available'}
          style={[
            {
              borderRadius: imageWidth / 2,
              height: imageWidth,
            },
            styles.image,
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
          onPress={() => flatList?.current?.scrollToOffset(0)}
          size={40}
          containerStyles={styles.floatingButton}
        />
      )}
      <FlatList
        ref={flatList}
        persistentScrollbar
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
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
        ListHeaderComponent={() => (loading ? <LoadingIndicator /> : null)}
        numColumns={numberOfColumns}
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
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
