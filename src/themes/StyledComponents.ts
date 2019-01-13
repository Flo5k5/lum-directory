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

/** Stores all variables used to theme the UI of this application. */
export const theme: IThemeInterface = {
  borderSize: '1px',
  borderStyle: 'solid',
  color: {
    ['primary']: 'darkgray',
    ['secondary']: 'black',
    ['danger']: 'red',
  },
  colorBackground: 'white',
  fontFamily: 'sans-serif',
  fontSize: {
    ['veryLarge']: '30px',
    ['large']: '20px',
    ['medium']: '13px',
    ['small']: '12px',
  },
  gutterLarge: '20px',
  gutterMedium: '10px',
  gutterSmall: '5px',
};

export { css, createGlobalStyle, keyframes, ThemeProvider };
export default styled;
