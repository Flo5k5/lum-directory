import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import { UserService } from 'src/services/UserService';
import styled from 'styled-components';
import { BiggerBoldText } from '../layout/BiggerBoldText';
import UserList from './UserList';

const UserListContainer: any = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Loader: any = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  text-align: center;
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorFontPrimary};
`;

const TextLoading: any = styled.p`
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorFontPrimary};
  font-weight: bold;
  font-size: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.fontLarge};
`;

interface IUsersDirectoryState {
  isInError: boolean;
  isLoading: boolean;
  users: IUser[];
}

class UsersDirectory extends React.Component<{}, IUsersDirectoryState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isInError: false,
      isLoading: true,
      users: [],
    };
  }

  public componentWillMount(): void {
    UserService.fetchAll()
      .then((users: IUser[]) => {
        this.setState({
          isInError: false,
          isLoading: false,
          users: [...users],
        });
      })
      .catch(() => {
        this.setState({
          isInError: true,
          isLoading: false,
        });
      });
  }

  public render(): React.ReactNode {
    const isEmptyUserList: boolean =
      !this.state.users.length && !this.state.isLoading;
    const isReadyToListUsers: boolean =
      !!this.state.users.length &&
      !this.state.isInError &&
      !this.state.isLoading;
    return (
      <UserListContainer>
        {isReadyToListUsers && <UserList users={this.state.users} />}
        {this.state.isLoading && (
          <Loader>
            <FontAwesomeIcon icon='circle-notch' size='3x' spin={true} />
            <TextLoading>Loading...</TextLoading>
          </Loader>
        )}
        {isEmptyUserList && <BiggerBoldText>No user available</BiggerBoldText>}
        {!!this.state.isInError && (
          <BiggerBoldText>Something is broken!</BiggerBoldText>
        )}
      </UserListContainer>
    );
  }
}

export default UsersDirectory;
