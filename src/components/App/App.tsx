import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import { UserService } from 'src/services/UserService';
import './App.css';

class App extends React.Component<any, { users: IUser[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: [],
    };
  }

  public componentWillMount(): void {
    UserService.fetchAll().then((users) => {
      this.setState({
        users: [...users],
      });
    });
  }

  public render() {
    return (
      <div className='App'>
        <header className='App-header'>My header</header>
        <div className='App-body'>
          There {this.state.users.length ? 'are some users' : 'is no user'}
        </div>
      </div>
    );
  }
}

export default App;
