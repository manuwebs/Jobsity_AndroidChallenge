import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Utilities from '../utils/Utilities';
import LoadingIndicator from './LoadingIndicator';

export default function ShowsList({
  loading,
  numberOfColumns = 3,
  margin = 10,
  onEndReached,
  onShowPress,
  shows,
}) {
  // margin * 2 because margin applies on sides
  const imageWidth = Utilities.dimensions.width / numberOfColumns - margin * 2;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => onShowPress(item)}
      style={{
        width: imageWidth,
        margin: margin,
      }}>
      <Image
        resizeMode={'contain'}
        style={{
          backgroundColor: 'green',
          height: imageWidth * Utilities.verticalRatio,
        }}
        source={{ uri: item.image?.medium }}
      />
      <Text numberOfLines={2} style={{ textAlign: 'center' }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={shows}
      keyExtractor={item => item.id}
      ListEmptyComponent={() =>
        !loading ? <Text>No hay elementos para mostrar</Text> : null
      }
      onEndReached={onEndReached}
      renderItem={renderItem}
      ListFooterComponent={() => (loading ? <LoadingIndicator /> : null)}
      numColumns={numberOfColumns}
    />
  );
}

const styles = StyleSheet.create({});
