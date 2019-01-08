import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import IThemeInterface from 'src/interfaces/IThemeInterface';
import { IUser } from 'src/interfaces/IUser';
import { UserService } from 'src/services/UserService';
import fontAwesome from 'src/themes/icon-library';
import styled, {
  createGlobalStyle,
  theme,
  ThemeProvider,
} from 'src/themes/styled-components';
import { GlobalStyleComponent } from 'styled-components';
import UsersDirectory from './UsersDirectory';

// Load fontAwesome Library
fontAwesome.init();

const GlobalStyle: GlobalStyleComponent<
  {},
  IThemeInterface
> = createGlobalStyle`
  html, body, .root {
    background-color: white;
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

const AppContainer: any = styled.div``;

const Loader: any = styled.div`
  position: fixed;
  top: 40%;
  left: 45%;
  text-align: center;
`;

const TextLoading: any = styled.p`
  font-weight: bold;
  font-size: 22px;
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
    const isEmptyUserList: boolean =
      !this.state.users.length && !this.state.loading;
    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <GlobalStyle />
          {!!this.state.users.length && (
            <UsersDirectory users={[...this.state.users]} />
          )}
          {this.state.loading && (
            <Loader>
              <FontAwesomeIcon icon='circle-notch' size='3x' spin={true} />
              <TextLoading>Loading...</TextLoading>
            </Loader>
          )}
          {isEmptyUserList && <h2>No user available</h2>}
        </AppContainer>
      </ThemeProvider>
    );
  }
}

export default App;
