import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Accordeon({ title, children, style }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={style}>
      <TouchableOpacity onPress={() => setExpanded(!expanded)}>
        <Text
          style={{
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
      </TouchableOpacity>

      <View style={{ flex: 1, display: expanded ? 'flex' : 'none' }}>
        {children}
      </View>
    </View>
  );
}
