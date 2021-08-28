import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ShowsAPI from '../../api/ShowsAPI';
import Accordeon from '../../components/Accordeon';
import AppHTMLRender from '../../components/AppHTMLRender';
import AppText from '../../components/AppText';
import Container from '../../components/Container';
import ErrorPlaceholder from '../../components/ErrorPlaceholder';
import LoadingIndicator from '../../components/LoadingIndicator';
import PosterPlaceholder from '../../components/PosterPlaceholder';
import useAPI from '../../hooks/useAPI';
import routes from '../../navigation/routes';
import { AppColors, AppStyles } from '../../utils/CommonStyles';
import Utilities from '../../utils/Utilities';

export default function ShowDetailScreen({ navigation, route }) {
  const { id, image, schedule, genres, summary } = route.params;
  const {
    data: episodes,
    request: getEpisodesByShowID,
    error: episodesError,
    loading: episodesLoading,
  } = useAPI(ShowsAPI.getEpisodesByShowID);
  const {
    data: seasons,
    request: getSeasonsByShowID,
    error: seasonsError,
    loading: seasonsLoading,
  } = useAPI(ShowsAPI.getSeasonsByShowID);

  useEffect(() => {
    getSeasonsByShowID(id);
    getEpisodesByShowID(id);
  }, []);

  return (
    <Container
      scrollable
      refreshing={episodesLoading || seasonsLoading}
      onRefresh={() => {
        getSeasonsByShowID(id);
        getEpisodesByShowID(id);
      }}
      style={styles.container}>
      {image ? (
        <Image
          source={{ uri: image.original }}
          style={styles.image}
          resizeMode={'contain'}
        />
      ) : (
        <PosterPlaceholder style={styles.image} size={100} />
      )}

      <View style={[AppStyles.marginVertical, styles.contentContainer]}>
        <AppText style={[AppStyles.marginHorizontal, AppStyles.textRight]}>
          <AppText style={AppStyles.bold}>
            {schedule.days.map(schedule => schedule + "'s")}
          </AppText>
          {schedule.time && ' at ' + schedule.time}
        </AppText>

        {genres?.length > 0 && (
          <AppText style={[AppStyles.marginHorizontal, AppStyles.textRight]}>
            <AppText style={AppStyles.bold}>Genres: </AppText>
            {genres.map(g =>
              genres.indexOf(g) !== genres.length - 1 ? g + ', ' : g,
            )}
          </AppText>
        )}

        {summary ? (
          <AppHTMLRender html={summary} style={AppStyles.marginHorizontal} />
        ) : null}

        {seasons && episodes ? (
          <RenderSeasons
            seasons={seasons}
            episodes={episodes}
            onEpisodePress={episode =>
              navigation.navigate(routes.EPISODE_DETAILS, {
                showName: route.params.name,
                episode,
              })
            }
          />
        ) : !seasonsError && !episodesError ? (
          <LoadingIndicator />
        ) : (
          <ErrorPlaceholder message={'Error while loading seasons'} />
        )}
      </View>
    </Container>
  );
}
const RenderSeasons = ({ seasons, episodes, onEpisodePress }) => {
  return seasons.map(s => (
    <Accordeon key={s.number} title={`Season ${s.number}`}>
      {episodes.length > 0 ? (
        episodes
          .filter(e => e.season === s.number)
          .map(e => (
            <TouchableOpacity
              key={e.id + '_'}
              onPress={() => onEpisodePress(e)}>
              <AppText style={styles.listItem} key={e.id}>
                Ep.{e.number} - {e.name}
              </AppText>
            </TouchableOpacity>
          ))
      ) : (
        <AppText style={styles.listItem}>No episodes available</AppText>
      )}
    </Accordeon>
  ));
};

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
