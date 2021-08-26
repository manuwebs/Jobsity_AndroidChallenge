import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Utilities from '../utils/Utilities';

export default function EpisodeDetailScreen({ route }) {
  const { image, number, season, summary } = route.params;
  return (
    <SafeAreaView style={{ margin: 10 }}>
      <ScrollView>
        <Image
          source={{ uri: image.original }}
          style={{
            height:
              (Utilities.dimensions.width - 20) * Utilities.horizontalRatio,
          }}
          resizeMode={'contain'}
        />
        <Text>{`Season: ${season}`}</Text>
        <Text>{`Episode: #${number}`}</Text>
        <Text style={{ textAlign: 'justify' }}>{`${summary}`}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
