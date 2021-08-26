import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import utilities from '../utils/utilities';

export default function ShowsList({
  loading,
  numberOfColumns = 3,
  margin = 10,
  onEndReached,
  onShowPress,
  shows,
}) {
  // margin * 2 because margin applies on sides
  const imageWidth = utilities.dimensions.width / numberOfColumns - margin * 2;

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
          height: imageWidth * utilities.verticalRatio,
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
      ListFooterComponent={() => (loading ? <ActivityIndicator /> : null)}
      numColumns={numberOfColumns}
    />
  );
}

const styles = StyleSheet.create({});
