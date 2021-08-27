import React from 'react';
import RenderHTML from 'react-native-render-html';
import Utilities from '../utils/Utilities';

export default function AppHTMLRender({
  html,
  style,
  textAligment = 'justify',
}) {
  const tagsStyles = {
    p: { textAlign: textAligment },
    b: { fontWeight: 'bold' },
  };
  return (
    <RenderHTML
      source={{ html }}
      baseStyle={style}
      tagsStyles={tagsStyles}
      contentWidth={Utilities.dimensions.width}
    />
  );
}
