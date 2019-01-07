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
  backgroundColor: '#f0f0f0',
  borderRadius: '5%',
  cardBackground: '#fefff9',
  fontFamily: 'sans-serif',
  largeMargin: '20px',
  mediumFontSize: '13px',
  mediumMargin: '10px',
  primaryColor: '#e9e9eb',
  secondaryColor: '#2db7f5',
  smallMargin: '5px',
};

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
