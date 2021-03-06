import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import useAPI from '../hooks/useAPI';
import useDebounce from '../hooks/useDebounce';
import AppButton from './AppButton';
import AppInput from './AppInput';

export default function SearchBar({
  searchResults,
  onError,
  onLoading,
  API,
  placeholder,
}) {
  const [searchCriteria, setSearchCriteria] = useState('');
  // using useDebounce allows to wait for the user to finish typing the criteria
  const searchDebounced = useDebounce(searchCriteria, 500);
  const { data, error, loading, request: searchShows } = useAPI(API);

  const handleSearch = text => {
    setSearchCriteria(text);
  };

  const handleCancel = () => {
    setSearchCriteria('');
    searchResults(null);
  };

  // if there is a criteria, tries to search otherwise set default values
  useEffect(() => {
    if (searchDebounced) {
      searchShows(searchDebounced);
    } else {
      searchResults(null);
    }
  }, [searchDebounced]);

  // sends the fetched data to parent component
  useEffect(() => {
    searchResults(data);
  }, [data]);

  // if an error is thrown, sends it to parent component
  useEffect(() => {
    if (error) {
      onError(error);
    }
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
        placeholder={placeholder}
      />
      {searchDebounced !== '' && (
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
