import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import ShowsAPI from '../api/ShowsAPI';
import Accordeon from '../components/Accordeon';
import AppHTMLRender from '../components/AppHTMLRender';
import AppText from '../components/AppText';
import Container from '../components/Container';
import LoadingIndicator from '../components/LoadingIndicator';
import useAPI from '../hooks/useAPI';
import routes from '../navigation/routes';
import { AppColors, AppStyles } from '../utils/CommonStyles';
import Utilities from '../utils/Utilities';

export default function ShowDetailScreen({ navigation, route }) {
  const { id, image, schedule, genres, summary } = route.params;
  const { data: episodes, request: getEpisodesByShowID } = useAPI(
    ShowsAPI.getEpisodesByShowID,
  );
  const { data: seasons, request: getSeasonsByShowID } = useAPI(
    ShowsAPI.getSeasonsByShowID,
  );

  useEffect(() => {
    getSeasonsByShowID(id);
    getEpisodesByShowID(id);
  }, []);

  return (
    <Container scrollable style={styles.container}>
      <Image
        source={{ uri: image.original }}
        style={{
          height: (Utilities.dimensions.width - 100) * Utilities.verticalRatio,
        }}
        resizeMode={'contain'}
      />

      <AppText
        style={[
          AppStyles.marginHorizontal,
          AppStyles.marginTop,
          AppStyles.textRight,
        ]}>
        <AppText style={AppStyles.bold}>{schedule.days}'s</AppText> at{' '}
        {schedule.time} {'\n'}
        <AppText style={AppStyles.bold}>Genres: </AppText>
        {genres}
      </AppText>

      <AppHTMLRender html={summary} style={AppStyles.marginHorizontal} />

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
      ) : (
        <LoadingIndicator />
      )}
    </Container>
  );
}
const RenderSeasons = ({ seasons, episodes, onEpisodePress }) => {
  return seasons.map(s => (
    <Accordeon key={s.number} title={`Season ${s.number}`}>
      {episodes
        .filter(e => e.season === s.number)
        .map(e => (
          <TouchableOpacity key={e.id + '_'} onPress={() => onEpisodePress(e)}>
            <AppText style={styles.listItem} key={e.id}>
              Ep.{e.number} - {e.name}
            </AppText>
          </TouchableOpacity>
        ))}
    </Accordeon>
  ));
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
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
