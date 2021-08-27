import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppHTMLRender from '../components/AppHTMLRender';
import AppText from '../components/AppText';
import Container from '../components/Container';
import PosterPlaceholder from '../components/PosterPlaceholder';
import { AppStyles } from '../utils/CommonStyles';
import Utilities from '../utils/Utilities';

export default function EpisodeDetailScreen({ route }) {
  const { image, number, season, summary } = route.params.episode;
  return (
    <Container scrollable>
      {image ? (
        <Image
          source={{ uri: image.original }}
          style={styles.poster}
          resizeMode={'contain'}
        />
      ) : (
        <PosterPlaceholder style={styles.poster} size={100} dark />
      )}

      <View style={AppStyles.marginHorizontal}>
        <AppText
          style={AppStyles.marginHorizontal}>{`Season: ${season}`}</AppText>

        <AppText
          style={AppStyles.marginHorizontal}>{`Episode: #${number}`}</AppText>

        {summary ? (
          <AppHTMLRender html={summary} style={AppStyles.marginHorizontal} />
        ) : null}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  poster: {
    height: (Utilities.dimensions.width - 20) * Utilities.horizontalRatio,
  },
});
