import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchAPI from '../api/SearchAPI';
import useAPI from '../hooks/useAPI';
import useDebounce from '../hooks/useDebounce';
import AppButton from './AppButton';
import AppInput from './AppInput';

export default function SearchBar({ searchResults, onError, onLoading }) {
  const [searchCriteria, setSearchCriteria] = useState('');
  // using useDebounce allows to wait for the user to finish typing the criteria
  const searchDebounced = useDebounce(searchCriteria, 500);
  const {
    data,
    setData,
    error,
    loading,
    request: searchShows,
  } = useAPI(SearchAPI.shows);

  const handleSearch = text => {
    setSearchCriteria(text);
  };

  const handleCancel = () => {
    setSearchCriteria('');
    setData(null);
  };

  // if there is a criteria, tries to search otherwise set default values
  useEffect(() => {
    if (searchCriteria) {
      searchShows(searchCriteria);
    } else {
      setData(null);
    }
  }, [searchDebounced]);

  // sends the fetched data to parent component
  useEffect(() => {
    searchResults(data ? data.map(d => d.show) : null);
  }, [data]);

  // if an error is thrown, sends it to parent component
  useEffect(() => {
    onError(error);
  }, [error]);

  // if request is loading, sends it to parent component
  useEffect(() => {
    onLoading(loading);
  }, [loading]);

  return (
    <View style={styles.container}>
      <AppInput
        style={styles.textInput}
        containerStyle={styles.textInputContainer}
        value={searchCriteria}
        onChangeText={handleSearch}
        placeholder="Ex. The Good Doctor"
      />
      {data && (
        <AppButton
          title="Cancel"
          onPress={handleCancel}
          containerStyles={styles.button}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 10,
  },
  container: {
    height: 50,
    flexDirection: 'row',
  },
  textInputContainer: { flex: 4, marginVertical: 5 },
});
