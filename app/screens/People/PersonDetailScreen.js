import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, View } from 'react-native';
import PersonAPI from '../../api/PersonAPI';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import EmptyPlaceholder from '../../components/EmptyPlaceholder';
import LoadingIndicator from '../../components/LoadingIndicator';
import Poster from '../../components/Poster';
import PosterPlaceholder from '../../components/PosterPlaceholder';
import useAPI from '../../hooks/useAPI';
import routes from '../../navigation/routes';
import { AppColors, AppStyles } from '../../utils/CommonStyles';
import Utilities from '../../utils/Utilities';

export default function PersonDetailScreen({ navigation, route }) {
  const { id, image } = route.params;
  const [shows, setShows] = useState(null);

  const {
    data: person,
    request: getPersonById,
    error,
    loading,
  } = useAPI(PersonAPI.getById);

  useEffect(() => {
    getPersonById(id);
  }, []);

  useEffect(() => {
    if (person) {
      setShows(person.map(p => p._embedded.show));
    }
  }, [person]);

  return (
    <Container
      scrollable
      refreshing={loading}
      onRefresh={() => {
        getPersonById(id);
      }}
      style={styles.container}>
      {image ? (
        <Image
          source={{ uri: image.original }}
          style={styles.image}
          resizeMode={'contain'}
        />
      ) : (
        <PosterPlaceholder
          icon={'account-off-outline'}
          message={'Picture not available'}
          style={styles.image}
          size={100}
          me
        />
      )}

      <View style={[AppStyles.marginVertical, styles.contentContainer]}>
        <AppText style={AppStyles.mainHeading}>Series</AppText>
        <FlatList
          persistentScrollbar
          contentContainerStyle={{ flexGrow: 1 }}
          data={shows}
          keyExtractor={item => item.id}
          ListEmptyComponent={() =>
            !loading && (
              <EmptyPlaceholder message="Ups!, We have not found any show" />
            )
          }
          horizontal
          renderItem={({ item }) => (
            <Poster
              item={item}
              margin={10}
              onPress={() => navigation.navigate(routes.SHOW_DETAILS, item)}
              imageWidth={110}
            />
          )}
          ListHeaderComponent={() => (loading ? <LoadingIndicator /> : null)}
          numColumns={1}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  contentContainer: { marginHorizontal: 20 },
  image: {
    padding: 5,
    backgroundColor: AppColors.black,
    height: (Utilities.dimensions.width - 100) * Utilities.verticalRatio,
    justifyContent: 'center',
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: AppColors.white,
    marginVertical: 5,
    paddingBottom: 10,
    paddingLeft: 10,
    color: AppColors.white,
  },
});
