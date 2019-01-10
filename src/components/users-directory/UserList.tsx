import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import styled from 'styled-components';
import UserCard from './UserCard';
import UserInfosModal from './UserInfosModal';
import UserListFilters from './UserListFilters';
import UserListPagination from './UserListPagination';

const USERS_PER_PAGE: number = 10;
export type FILTER_GENDER = 'ALL' | 'MALE' | 'FEMALE';
export type NAME_FILTER = 'FIRST_NAME' | 'LAST_NAME';
// export enum EnumFilter {
//   FILTER_GENDER,
//   NAME_FILTER,
//   string,
// }

const UserListFlex: any = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
`;

const UserListResults: any = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: center;
  padding: 0;
  min-height: 100px;
`;

/**
 * Interface that represents the properties object passed to the UserList component.
 *
 * @interface IUserListProps
 */
interface IUserListProps {
  users: IUser[];
}

/**
 * Interface that represents the state object of the UserList component.
 *
 * @interface IUserListState
 */
interface IUserListState {
  currentPage: number;
  filteredUsers: IUser[];
  genderFilter: FILTER_GENDER;
  maxPage: number;
  nameFilter: NAME_FILTER;
  textFilter: string;
  userInfosModal?: IUser;
  usersPerPage: number;
}

/**
 * UserList class is a React's component class used to render the users list results,
 * filters (by name or by genre), and pagination.
 * This class use a state to store and route parameters to others sub components.
 *
 * @class UserList
 * @extends {React.Component<IUserListProps, IUserListState>}
 */
class UserList extends React.Component<IUserListProps, IUserListState> {
  /**
   * Creates an instance of UserList.
   * @param {IUserListProps} props
   * @memberof UserList
   */
  constructor(props: IUserListProps) {
    super(props);
    this.state = {
      currentPage: 1,
      filteredUsers: this.props.users || [], // memoize filtered users to avoid looping on this table at every state refreshing
      genderFilter: 'ALL',
      maxPage: !!this.props.users
        ? Math.ceil(this.props.users.length / USERS_PER_PAGE)
        : 0,
      nameFilter: 'FIRST_NAME',
      textFilter: '',
      userInfosModal: undefined,
      usersPerPage: USERS_PER_PAGE,
    };
    this.applyFilters = this.applyFilters.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * React's render function. In this case, it renders the filters, the users list and the pagination.
   *
   * @returns {React.ReactNode}
   * @memberof UserList
   */
  public render(): React.ReactNode {
    const userCards: JSX.Element[] = this.renderUserCards();
    return (
      <UserListFlex>
        <UserListFilters
          genderFilter={this.state.genderFilter}
          nameFilter={this.state.nameFilter}
          textFilter={this.state.textFilter}
          handleFilter={this.applyFilters}
        />
        <UserListResults>{userCards}</UserListResults>
        <UserListPagination
          currentPage={this.state.currentPage}
          maxPage={this.state.maxPage}
          totalUsers={this.state.filteredUsers.length}
          changeCurrentPage={this.changeCurrentPage}
        />
        <UserInfosModal
          closeModal={this.closeModal}
          userInfos={this.state.userInfosModal}
        />
      </UserListFlex>
    );
  }

  /**
   * Change the current page of the user list. It is a callback function of the UserListPagination component.
   *
   * @param {number} newPage - The number of the page to go to.
   * @memberof UserList
   */
  public changeCurrentPage(newPage: number): void {
    if (newPage > this.state.maxPage) {
      newPage = this.state.maxPage;
    }

    if (newPage < 1) {
      newPage = 1;
    }

    this.setState((prevState: IUserListState, props: IUserListProps) => {
      return {
        currentPage: newPage,
      };
    });
  }

  // TODO: use enum and pass one single arguments everytime
  /**
   * Applys filters on the users array and store the filtered users in the state object of the component.
   * It is a callback function of the UserListFilters component.
   *
   * @param {FILTER_GENDER} [genderFilterParameter]
   * @param {string} [textFilterParameter]
   * @param {NAME_FILTER} [nameFilterParameter]
   * @memberof UserList
   */
  public applyFilters(
    genderFilterParameter?: FILTER_GENDER,
    textFilterParameter?: string,
    nameFilterParameter?: NAME_FILTER
  ): void {
    this.setState((prevState: any, props: IUserListProps) => {
      const genderFilter: FILTER_GENDER =
        genderFilterParameter || prevState.genderFilter;
      const textFilter: string =
        !textFilterParameter && !nameFilterParameter
          ? prevState.textFilter
          : textFilterParameter;
      const nameFilter: NAME_FILTER =
        !textFilterParameter && !nameFilterParameter
          ? prevState.nameFilter
          : nameFilterParameter;

      let users: IUser[] = this.filterUsersByGender(props.users, genderFilter);
      users = this.filterUsersByName(users, textFilter, nameFilter);

      const maxPage: number = Math.ceil(users.length / USERS_PER_PAGE);
      let currentPage: number = prevState.currentPage;

      if (maxPage !== prevState.maxPage) {
        currentPage = 1;
      }

      return {
        currentPage,
        filteredUsers: users,
        genderFilter,
        maxPage,
        nameFilter,
        textFilter,
      };
    });
  }

  /**
   * Opens modal showing infos of a selected user.
   *
   * @param {IUser} userInfos - User infos displayed in the modal
   * @memberof UserList
   */
  public openModal(userInfos: IUser): void {
    // this.setState({
    //   userInfosModal: userInfos,
    // });
  }

  /**
   * Closes modal showing infos of a selected user.
   *
   * @memberof UserList
   */
  public closeModal(): void {
    this.setState({
      userInfosModal: undefined,
    });
  }

  /**
   * Filters users based on their gender.
   *
   * @private
   * @param {IUser[]} users
   * @param {FILTER_GENDER} genderFilter
   * @returns {IUser[]}
   * @memberof UserList
   */
  private filterUsersByGender(
    users: IUser[],
    genderFilter: FILTER_GENDER
  ): IUser[] {
    switch (genderFilter) {
      case 'FEMALE':
        users = users.filter((user: IUser) => user.gender === 'female');
        break;
      case 'MALE':
        users = users.filter((user: IUser) => user.gender === 'male');
      case 'ALL':
      default:
        break;
    }

    return users;
  }

  /**
   * Filters users based on their first name or last name.
   *
   * @private
   * @param {IUser[]} users
   * @param {string} textFilter
   * @param {NAME_FILTER} nameFilter
   * @returns {IUser[]}
   * @memberof UserList
   */
  private filterUsersByName(
    users: IUser[],
    textFilter: string,
    nameFilter: NAME_FILTER
  ): IUser[] {
    textFilter = textFilter.toLocaleLowerCase();

    switch (nameFilter) {
      case 'FIRST_NAME':
        users = users.filter(
          (user: IUser) =>
            user.firstName.toLocaleLowerCase().indexOf(textFilter) !== -1
        );
        break;
      case 'LAST_NAME':
        users = users.filter(
          (user: IUser) =>
            user.lastName.toLocaleLowerCase().indexOf(textFilter) !== -1
        );
        break;
      default:
        break;
    }

    return users;
  }

  /**
   * Extract a specific number of users to be displayed.
   *
   * @private
   * @param {IUser[]} users
   * @param {number} [currentPage=1]
   * @returns {IUser[]}
   * @memberof UserList
   */
  private paginateUsers(users: IUser[], currentPage: number = 1): IUser[] {
    const start: number = (currentPage - 1) * USERS_PER_PAGE;
    return users.slice(start, start + USERS_PER_PAGE);
  }

  /**
   * Call the pagination function to get a list of users and render a list of UserCard components based on them.
   *
   * @private
   * @returns {JSX.Element[]}
   * @memberof UserList
   */
  private renderUserCards(): JSX.Element[] {
    const paginatedUsers: IUser[] = this.paginateUsers(
      this.state.filteredUsers,
      this.state.currentPage
    );
    return paginatedUsers.map((user: IUser) => (
      <UserCard key={user.id} infos={user} clickHandler={this.openModal} />
    ));
  }
}

export default UserList;
