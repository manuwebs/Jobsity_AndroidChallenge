import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import SearchAPI from '../../api/SearchAPI';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import PersonList from '../../components/PersonList';
import SearchBar from '../../components/SearchBar';
import SearchPlaceholder from '../../components/SearchPlaceholder';
import routes from '../../navigation/routes';
import { AppColors, AppStyles } from '../../utils/CommonStyles';

export default function PeopleSearchScreen({ navigation }) {
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!searchResults) {
    return (
      <Container>
        <Search
          searchResults={res => setSearchResults(res?.map(r => r.person))}
          onLoading={setLoading}
        />
        <SearchPlaceholder message={'Type a name to begin our search!'} />
      </Container>
    );
  } else {
    return (
      <Container>
        <Search
          searchResults={res => setSearchResults(res?.map(r => r.person))}
          onLoading={setLoading}
        />

        <AppText
          style={[
            AppStyles.alignCenter,
            AppStyles.marginVertical,
            AppStyles.mainHeading,
          ]}>
          Search results
        </AppText>
        <PersonList
          icon={'account-off-outline'}
          message={'Picture not available'}
          data={searchResults}
          loading={loading}
          onShowPress={item => navigation.navigate(routes.PERSON_DETAILS, item)}
        />
      </Container>
    );
  }
}

const Search = ({ searchResults, onLoading }) => (
  <View style={styles.searchBarContainer}>
    <SearchBar
      searchResults={searchResults}
      onLoading={onLoading}
      onError={err => console.log(err)}
      API={SearchAPI.people}
      placeholder={'Ex. Grant Gustin'}
    />
  </View>
);

const styles = StyleSheet.create({
  searchBarContainer: {
    height: 65,
    paddingHorizontal: 10,
    backgroundColor: AppColors.secondary,
    justifyContent: 'center',
  },
});
