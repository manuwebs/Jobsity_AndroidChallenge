import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function ShowsList({
  loading,
  numberOfColumns = 3,
  margin = 10,
  onEndReached,
  shows,
}) {
  //getting device's screen width
  const { width } = Dimensions.get('screen');
  // margin * 2 because margin applies on sides
  const imageWidth = width / numberOfColumns - margin * 2;
  const ratio = 1.4;

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={{
        width: imageWidth,
        margin: margin,
      }}>
      <Image
        resizeMode={'contain'}
        style={{
          backgroundColor: 'green',
          height: imageWidth * ratio,
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
