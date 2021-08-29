import React, { useMemo } from 'react';
import RenderHTML from 'react-native-render-html';
import { AppColors, AppStyles } from '../utils/CommonStyles';
import Utilities from '../utils/Utilities';

export default function AppHTMLRender({
  html,
  style,
  textAligment = 'justify',
}) {
  const tagsStyles = useMemo(
    () => ({
      body: {
        fontFamily: 'Ubuntu-Light',
        whiteSpace: 'normal',
        color: AppColors.black,
      },
      p: {
        fontFamily: 'Ubuntu-Light',
        textAlign: textAligment,
      },
      b: {
        fontFamily: 'Ubuntu-Bold',
      },
    }),
    [textAligment],
  );

  const baseStyle = useMemo(
    () => ({ ...AppStyles.marginVertical, ...style }),
    [style],
  );

  const systemFonts = useMemo(() => {
    ['Ubuntu-Light', 'Ubuntu-Bold'];
  }, []);

  return (
    <RenderHTML
      source={{ html }}
      baseStyle={baseStyle}
      tagsStyles={tagsStyles}
      contentWidth={Utilities.dimensions.width}
      systemFonts={systemFonts}
    />
  );
}
