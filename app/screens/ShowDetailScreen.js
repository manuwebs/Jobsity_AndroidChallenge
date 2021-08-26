import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import ShowsAPI from '../api/ShowsAPI';
import Accordeon from '../components/Accordeon';
import useAPI from '../hooks/useAPI';
import utilities from '../utils/utilities';

export default function ShowDetailScreen({ route }) {
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
    <SafeAreaView style={{ margin: 20 }}>
      <ScrollView>
        <Image
          source={{ uri: image.original }}
          style={{ height: (utilities.dimensions.width - 100) * 1.4 }}
          resizeMode={'contain'}
        />
        <Text>{`${schedule.days}'s at ${schedule.time}`}</Text>
        <Text>{`${genres}`}</Text>
        <Text style={{ textAlign: 'justify' }}>{`${summary}`}</Text>
        {seasons && episodes ? (
          seasons.map(s => (
            <Accordeon
              style={{ marginVertical: 10 }}
              title={`Season ${s.number} - ${
                s.episodeOrder
                  ? s.episodeOrder === 1
                    ? 'episode'
                    : 'episodes'
                  : 'coming soon'
              }`}>
              {episodes
                .filter(e => e.season === s.number)
                .map(e => (
                  <Text key={e.id}>{e.name}</Text>
                ))}
            </Accordeon>
          ))
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
