import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import UserService from 'src/services/UserService';
import styled from 'styled-components';
import { Loading } from '../layout/Loading';
import { Span } from '../layout/Span';
import UserList from './UserList';

/** Style component that host position sub components. */
const UserListContainer: any = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

/**
 * Represents the state object of the UsersDirectory component.
 *
 * @interface IUsersDirectoryState
 */
interface IUsersDirectoryState {
  isInError: boolean;
  isLoading: boolean;
  users: IUser[];
}

/**
 * Fetches an user list from an API, displays loading, errors and the users list.
 *
 * @class UsersDirectory
 * @extends {React.Component<{}, IUsersDirectoryState>}
 */
export default class UsersDirectory extends React.Component<
  {},
  IUsersDirectoryState
> {
  /**
   * Instance of the UserService
   *
   * @private
   * @type {UserService}
   * @memberof UsersDirectory
   */
  private userService: UserService;

  /**
   * Creates an instance of UsersDirectory.
   * @param {{}} props
   * @memberof UsersDirectory
   */
  constructor(props: {}) {
    super(props);
    this.userService = new UserService();
    this.state = {
      isInError: false,
      isLoading: true,
      users: [],
    };
  }

  /**
   * Fetches users list from API before component will be rendered.
   *
   * @memberof UsersDirectory
   */
  public componentWillMount(): void {
    this.userService
      .fetchAll()
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

  /**
   * Displays loading, errors and the users list.
   *
   * @returns {React.ReactNode}
   * @memberof UsersDirectory
   */
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
        <Loading show={this.state.isLoading} />
        <Span show={isEmptyUserList}>No user available</Span>
        <Span show={!!this.state.isInError}>Something is broken!</Span>
      </UserListContainer>
    );
  }
}
