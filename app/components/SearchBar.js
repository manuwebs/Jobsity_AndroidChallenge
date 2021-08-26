import React, { useState } from 'react';
import { useEffect } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import SearchAPI from '../api/SearchAPI';
import useAPI from '../hooks/useAPI';
import useDebounce from '../hooks/useDebounce';

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

  // if an error is thrown, sends error to parent component
  useEffect(() => {
    onError(error);
  }, [error]);

  // if request is loading, sends status to parent component
  useEffect(() => {
    onLoading(loading);
  }, [loading]);

  return (
    <View
      style={{
        backgroundColor: 'grey',
        flex: 1,
        flexDirection: 'row',
        height: 50,
      }}>
      <TextInput
        style={{ flex: 4, backgroundColor: 'white', margin: 5 }}
        value={searchCriteria}
        onChangeText={handleSearch}
        placeholder="Ex. The Good Doctor"
      />
      {data && <Button title="Cancel" onPress={handleCancel} />}
    </View>
  );
}

const styles = StyleSheet.create({});
