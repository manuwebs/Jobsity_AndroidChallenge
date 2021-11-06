import React, { useEffect, useRef } from 'react';
import Poster from '../components/Poster';
import usePrevious from '../hooks/usePrevious';
import Utilities from '../utils/Utilities';
import AppList from './AppList';

export default function ShowsList({
  loading = false,
  numberOfColumns = 3,
  margin = 10,
  onEndReached,
  shows,
}) {
  // margin * 2 because margin applies on sides
  const imageWidth = Utilities.dimensions.width / numberOfColumns - margin * 2;

  const prevShows = usePrevious(shows);
  let flatList = useRef(null);

  // scrolls to top everytime shows change (on serach, on cancel)
  useEffect(() => {
    // makes sure that the current shows doesn't contains the previous shows before scrolling
    if (
      shows.filter(s => prevShows?.indexOf(s) >= 0).length !== prevShows?.length
    ) {
      flatList.current?.scrollToOffset(0);
    }
  }, [shows, prevShows]);

  return (
    <AppList
      ref={flatList}
      data={shows}
      keyExtractor={item => item.id}
      loading={loading}
      numberOfColumns={numberOfColumns}
      onEndReached={onEndReached}
      renderItem={({ item }) => (
        <Poster item={item} margin={margin} imageWidth={imageWidth} />
      )}
    />
  );
}
