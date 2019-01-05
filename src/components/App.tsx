import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import { UserService } from 'src/services/UserService';
import styled, {
  createGlobalStyle,
  theme,
  ThemeProvider,
} from 'src/themes/styled-components';
import UserList from './UserList';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${(props) => props.theme.backgroundColor};
    font-family: ${(props) => props.theme.fontFamily};
    margin: 0;
    padding: 0;
  }
`;

const AppContainer = styled.div`
  max-width: 1100px;
  margin: ${(props) => props.theme.largeMargin} auto;
`;

const AppContent = styled.div``;

const Loader = styled.div``;

class App extends React.Component<any, { users: IUser[]; loading: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      users: [],
    };
  }

  public componentWillMount(): void {
    UserService.fetchAll().then((users) => {
      this.setState({
        loading: false,
        users: [...users],
      });
    });
  }

  public render() {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer>
          <GlobalStyle />
          <AppContent>
            {this.state.users.length ? (
              <UserList users={[...this.state.users]} />
            ) : (
              'No user available'
            )}
            {this.state.loading && <Loader>Loading</Loader>}
          </AppContent>
        </AppContainer>
      </ThemeProvider>
    );
  }
}

export default App;
