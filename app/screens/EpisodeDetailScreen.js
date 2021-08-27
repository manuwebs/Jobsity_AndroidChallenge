import React from 'react';
import { Image, StyleSheet } from 'react-native';
import AppHTMLRender from '../components/AppHTMLRender';
import AppText from '../components/AppText';
import Container from '../components/Container';
import { AppStyles } from '../utils/CommonStyles';
import Utilities from '../utils/Utilities';

export default function EpisodeDetailScreen({ route }) {
  const { image, number, season, summary } = route.params.episode;
  return (
    <Container scrollable>
      <Image
        source={{ uri: image.original }}
        style={{
          height: (Utilities.dimensions.width - 20) * Utilities.horizontalRatio,
        }}
        resizeMode={'contain'}
      />
      <AppText
        style={AppStyles.marginHorizontal}>{`Season: ${season}`}</AppText>
      <AppText
        style={AppStyles.marginHorizontal}>{`Episode: #${number}`}</AppText>

      <AppHTMLRender html={summary} style={AppStyles.marginHorizontal} />
    </Container>
  );
}

const styles = StyleSheet.create({});
