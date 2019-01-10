import * as styledComponents from 'styled-components';
import { ThemedStyledComponentsModule } from 'styled-components';

import IThemeInterface from '../interfaces/IThemeInterface';

// tslint:disable-next-line: typedef
const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as ThemedStyledComponentsModule<IThemeInterface>;

export const theme: IThemeInterface = {
  borderSize: '1px',
  borderStyle: 'solid',
  colorBackground: 'white',
  colorFontDanger: 'red',
  colorFontPrimary: 'darkgray',
  colorFontSecondary: 'black',
  fontFamily: 'sans-serif',
  fontLarge: '20px',
  fontMedium: '13px',
  fontSmall: '12px',
  fontVeryLarge: '30px',
  gutterLarge: '20px',
  gutterMedium: '10px',
  gutterSmall: '5px',
};

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
