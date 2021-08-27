import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import ShowsAPI from '../api/ShowsAPI';
import AppText from '../components/AppText';
import Container from '../components/Container';
import SearchBar from '../components/SearchBar';
import ShowsList from '../components/ShowsList';
import useAPI from '../hooks/useAPI';
import routes from '../navigation/routes';
import { AppColors, AppStyles } from '../utils/CommonStyles';

export default function HomeScreen({ navigation }) {
  const { data, error, loading, request: getShows } = useAPI(ShowsAPI.get);
  const [page, setPage] = useState(0);
  const [shows, setShows] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);

  // fetch shows everytime page number changes
  useEffect(() => {
    getShows(page);
  }, [page]);

  // updating shows variable everytime data is fetched
  useEffect(() => {
    if (data) setShows([...shows, ...data]);
  }, [data]);

  if (!data && error) {
    return (
      <Container>
        <AppText style={AppStyles.textCenter}>Error fetching data</AppText>
      </Container>
    );
  } else {
    return (
      <Container>
        <View style={styles.searchBarContainer}>
          <SearchBar
            searchResults={setSearchResults}
            onLoading={setSearchLoading}
            onError={err => console.log(err)}
          />
        </View>
        <AppText
          style={[
            AppStyles.heading1,
            AppStyles.alignCenter,
            styles.mainHeading,
          ]}>
          TV Shows
        </AppText>
        <ShowsList
          shows={searchResults ?? shows}
          onEndReached={() => (!searchResults ? setPage(page + 1) : null)}
          onShowPress={item => navigation.navigate(routes.SHOW_DETAILS, item)}
          loading={loading || searchLoading}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  mainHeading: {
    fontWeight: 'bold',
    marginVertical: 15,
    borderBottomColor: AppColors.accent,
    borderBottomWidth: 4,
    textDecorationColor: AppColors.accent,
    textDecorationLine: Platform.OS === 'ios' ? 'underline' : null,
  },
  searchBarContainer: {
    height: 65,
    paddingHorizontal: 10,
    backgroundColor: AppColors.secondary,
    justifyContent: 'center',
  },
});
