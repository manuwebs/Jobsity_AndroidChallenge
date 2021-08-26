import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import ShowsAPI from '../api/ShowsAPI';
import SearchBar from '../components/SearchBar';
import ShowsList from '../components/ShowsList';
import useAPI from '../hooks/useAPI';
import routes from '../navigation/routes';

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
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Error fetching data</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ height: 50 }}>
          <SearchBar
            searchResults={setSearchResults}
            onLoading={setSearchLoading}
            onError={error => console.log(error)}
          />
        </View>
        <ShowsList
          shows={searchResults ?? shows}
          onEndReached={() => (!searchResults ? setPage(page + 1) : null)}
          onShowPress={item => navigation.navigate(routes.SHOW_DETAILS, item)}
          loading={loading || searchLoading}
        />
      </SafeAreaView>
    );
  }
}
