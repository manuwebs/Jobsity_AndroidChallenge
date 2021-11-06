import React, { useMemo, useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AppColors, AppStyles } from '../utils/CommonStyles';
import AppList from './AppList';
import AppText from './AppText';
import EmptyPlaceholder from './EmptyPlaceholder';
import Poster from './Poster';

export default function AlphabeticalShowList({ loading = false, shows }) {
  const [sectionActiveIndex, setSectionActiveIndex] = useState([]);

  const flatList = useRef();

  // obtaining existing distinct first letters shows name[0]
  const sections = useMemo(() => {
    var seen = {};
    return shows
      .map(s => s.name[0])
      .filter(item => (seen.hasOwnProperty(item) ? false : (seen[item] = true)))
      .sort()
      .map(s => {
        return {
          title: s,
          shows: shows.filter(show => show.name.startsWith(s)),
        };
      });
  }, [shows]);

  return (
    <View style={styles.mainContainer}>
      <AppList
        ref={flatList}
        scrollToTopIndicatorPosition={{ right: 35, bottom: 10 }}
        data={sections}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
          <>
            <AppText style={[AppStyles.marginHorizontal, styles.header]}>
              {item.title}
            </AppText>
            <FlatList
              fadingEdgeLength={25}
              horizontal
              data={item.shows}
              keyExtractor={itm => itm.id}
              ListEmptyComponent={() => (
                <EmptyPlaceholder message="Ups!, We have not found anything with your search term" />
              )}
              renderItem={({ item: show }) => (
                <Poster item={show} margin={10} imageWidth={130} />
              )}
            />
          </>
        )}
      />
      <RenderNavigationLetter
        sections={sections}
        sectionActiveIndex={sectionActiveIndex}
        onPress={(_, index) => flatList.current?.scrollToIndex({ index })}
      />
    </View>
  );
}

const RenderNavigationLetter = ({ sections, onPress, sectionActiveIndex }) => {
  return (
    <AppList
      fadingEdgeLength={250}
      style={styles.navigationLettersMainContainer}
      data={sections}
      contentContainerStyle={styles.navigationLettersContainer}
      showScrollToTopIndicator={false}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => onPress(item, index)}
          style={styles.letterContainer}>
          <AppText
            style={[
              AppStyles.marginHorizontal,
              styles.navigationLetters,
              sectionActiveIndex.includes(index)
                ? styles.activeNavigationLetter
                : null,
            ]}>
            {item.title}
          </AppText>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: AppColors.accent,
  },
  activeNavigationLetter: {
    fontSize: 18,
    fontWeight: 'bold',
    color: AppColors.primary,
  },
  letterContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  mainContainer: { flex: 1, flexDirection: 'row' },
  navigationLetters: {
    fontSize: 14,
    color: AppColors.secondary,
  },
  navigationLettersContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexGrow: 1,
  },
  navigationLettersMainContainer: {
    width: 40,
  },
});
