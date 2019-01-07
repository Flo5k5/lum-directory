import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import IThemeInterface from 'src/interfaces/IThemeInterface';
import { IUser } from 'src/interfaces/IUser';
import { UserService } from 'src/services/UserService';
import styled, {
  createGlobalStyle,
  theme,
  ThemeProvider,
} from 'src/themes/styled-components';
import { GlobalStyleComponent } from 'styled-components';
import UsersDirectory from './UsersDirectory';

const GlobalStyle: GlobalStyleComponent<
  {},
  IThemeInterface
> = createGlobalStyle`
  html, body, .root {
    background-color: ${
      // tslint:disable-next-line: typedef
      (props: any) => props.theme.backgroundColor
    };
    font-family: ${
      // tslint:disable-next-line: typedef
      (props: any) => props.theme.fontFamily
    };
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
`;

const AppContainer: any = styled.div`
  max-width: 1100px;
  height: 100%;
  padding: ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.largeMargin} auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Loader: any = styled.div`
  position: fixed;
`;

interface IStateApp {
  users: IUser[];
  loading: boolean;
}

class App extends React.Component<{}, IStateApp> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loading: true,
      users: [],
    };
  }

  public componentWillMount(): void {
    UserService.fetchAll()
      .then((users: IUser[]) => {
        this.setState({
          loading: false,
          users: [...users],
        });
      })
      .catch((error: any) => {
        this.setState({
          loading: false,
        });
      });
  }

  public render(): JSX.Element {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <GlobalStyle />
          {this.state.users.length ? (
            <UsersDirectory users={[...this.state.users]} />
          ) : (
            <h2>
              No user available <FontAwesomeIcon icon='spinner' />
              <FontAwesomeIcon icon='venus-mars' />
            </h2>
          )}
          {this.state.loading && (
            <Loader>
              <FontAwesomeIcon icon='spinner' />
            </Loader>
          )}
        </AppContainer>
      </ThemeProvider>
    );
  }
}

export default App;
