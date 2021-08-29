import React, { useMemo } from 'react';
import RenderHTML from 'react-native-render-html';
import { AppStyles } from '../utils/CommonStyles';
import Utilities from '../utils/Utilities';

export default function AppHTMLRender({
  html,
  style,
  textAligment = 'justify',
}) {
  const tagsStyles = useMemo(
    () => ({
      p: { textAlign: textAligment },
      b: { fontWeight: 'bold' },
    }),
    [textAligment],
  );

  const baseStyle = useMemo(
    () => ({ ...AppStyles.marginVertical, ...style }),
    [style],
  );

  return (
    <RenderHTML
      source={{ html }}
      baseStyle={baseStyle}
      tagsStyles={tagsStyles}
      contentWidth={Utilities.dimensions.width}
    />
  );
}
