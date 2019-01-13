import * as React from 'react';
import IThemeInterface from 'src/interfaces/IThemeInterface';
import fontAwesome from 'src/themes/IconLibrary';
import styled, {
  createGlobalStyle,
  theme,
  ThemeProvider,
} from 'src/themes/StyledComponents';
import { GlobalStyleComponent } from 'styled-components';
import UsersDirectory from './users-directory/UsersDirectory';

/** Load fontAwesome Library. */
fontAwesome.init();

/** Contains global style for parent's element. */
const GlobalStyle: GlobalStyleComponent<
  {},
  IThemeInterface
> = createGlobalStyle`
  html, body, .root {
    background-color: ${
      // tslint:disable-next-line: typedef
      (props: any) => props.theme.colorBackground
    };
    font-family: ${
      // tslint:disable-next-line: typedef
      (props: any) => props.theme.fontFamily
    };
    margin: 0;
  }
`;

/** Styled component that hosts others React components. */
const AppContainer: any = styled.div``;

/**
 * Loads current styled component theme and global style for parent's elements.
 * Contains the child components like UsersDirectory.
 *
 * @class App
 * @extends {React.Component<{}, {}>}
 */
class App extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <GlobalStyle />
          <UsersDirectory />
        </AppContainer>
      </ThemeProvider>
    );
  }
}

export default App;
