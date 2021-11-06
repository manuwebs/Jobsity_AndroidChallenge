import React, { useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { AppColors } from '../utils/CommonStyles';
import AppIcon from './AppIcon';
import AppRoundButton from './AppRoundButton';
import EmptyPlaceholder from './EmptyPlaceholder';
import LoadingIndicator from './LoadingIndicator';

function AppList(
  {
    contentContainerStyle,
    data,
    emptyMessage,
    keyExtractor,
    loading,
    numberOfColumns,
    onEndReached,
    renderItem,
    showScrollToTopIndicator = true,
    scrollToTopIndicatorPosition = {
      top: null,
      right: 10,
      bottom: 10,
      left: null,
    },
    viewabilityConfigCallbackPairs,
    ...props
  },
  ref,
) {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  return (
    <>
      {showScrollToTopIndicator && showScrollToTop && (
        <AppRoundButton
          title={
            <AppIcon
              name={'arrow-up-thick'}
              size={20}
              color={AppColors.white}
            />
          }
          onPress={() => ref.current?.scrollToOffset(0)}
          size={40}
          containerStyles={[
            styles.floatingButton,
            {
              bottom: scrollToTopIndicatorPosition.bottom,
              right: scrollToTopIndicatorPosition.right,
              top: scrollToTopIndicatorPosition.top,
              left: scrollToTopIndicatorPosition.left,
            },
          ]}
        />
      )}
      <FlatList
        ref={ref}
        // persistentScrollbar
        data={data}
        keyExtractor={keyExtractor}
        ListEmptyComponent={() =>
          !loading && <EmptyPlaceholder message={emptyMessage} />
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
        ListFooterComponent={() => (loading ? <LoadingIndicator /> : null)}
        numColumns={numberOfColumns}
        contentContainerStyle={contentContainerStyle}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs}
        {...props}
      />
    </>
  );
}

export default React.forwardRef(AppList);

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    zIndex: 1,
  },
});
