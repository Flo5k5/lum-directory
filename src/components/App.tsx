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

// Load fontAwesome Library
fontAwesome.init();

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

const AppContainer: any = styled.div``;

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
