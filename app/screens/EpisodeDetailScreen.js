import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import utilities from '../utils/utilities';

export default function EpisodeDetailScreen({ route }) {
  const { image, number, season, summary } = route.params;
  return (
    <SafeAreaView style={{ margin: 10 }}>
      <ScrollView>
        <Image
          source={{ uri: image.original }}
          style={{
            height:
              (utilities.dimensions.width - 20) * utilities.horizontalRatio,
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
