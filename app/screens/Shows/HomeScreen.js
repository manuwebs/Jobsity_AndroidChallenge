import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchAPI from '../../api/SearchAPI';
import ShowsAPI from '../../api/ShowsAPI';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import ErrorPlaceholder from '../../components/ErrorPlaceholder';
import SearchBar from '../../components/SearchBar';
import ShowsList from '../../components/ShowsList';
import useAPI from '../../hooks/useAPI';
import { AppColors, AppStyles } from '../../utils/CommonStyles';

export default function HomeScreen({ navigation }) {
  const { data, error, loading, request: getShows } = useAPI(ShowsAPI.get);
  const [page, setPage] = useState(0);
  const [shows, setShows] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // fetch shows everytime page number changes
  useEffect(() => {
    getShows(page);
  }, [page, getShows]);

  // updating shows variable everytime data is fetched
  useEffect(() => {
    if (page === 0) {
      setShows([]);
    }
    if (data) {
      setShows(_shows => [..._shows, ...data]);
    }
  }, [data]);

  if (error) {
    return (
      <Container scrollable onRefresh={() => setPage(0)} refreshing={loading}>
        <ErrorPlaceholder message={'Error fetching data'} />
      </Container>
    );
  } else {
    return (
      <Container>
        <View style={styles.searchBarContainer}>
          <SearchBar
            searchResults={res => setSearchResults(res?.map(r => r.show))}
            onLoading={setSearchLoading}
            onError={err => console.log(err)}
            API={SearchAPI.shows}
            placeholder={'Ex. The Good Doctor'}
          />
        </View>
        <AppText
          style={[
            AppStyles.alignCenter,
            AppStyles.marginVertical,
            AppStyles.mainHeading,
          ]}>
          {searchResults ? 'Search results' : 'TV Shows'}
        </AppText>
        <ShowsList
          shows={searchResults ?? shows}
          onEndReached={() =>
            !searchResults && !loading ? setPage(page + 1) : null
          }
          loading={loading || searchLoading}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  searchBarContainer: {
    height: 65,
    paddingHorizontal: 10,
    backgroundColor: AppColors.secondary,
    justifyContent: 'center',
  },
});
