import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import styled from 'styled-components';
import UserCard from './UserCard';
import UserFilters from './UserFilters';
import UserInfosModal from './UserInfosModal';
import UserPagination from './UserPagination';

const USERS_PER_PAGE: number = 10;
export type FILTER_GENDER = 'ALL' | 'MALE' | 'FEMALE';
export type NAME_FILTER = 'BOTH' | 'FIRST_NAME' | 'LAST_NAME';

const UserListContainer: any = styled.div``;
const UserList: any = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

interface IPropsUsersDirectory {
  users: IUser[];
}

interface IStateUsersDirectory {
  currentPage: number;
  genderFilter: FILTER_GENDER;
  maxPage: number;
  nameFilter: NAME_FILTER;
  textFilter: string;
  userInfosModal?: IUser;
  usersPerPage: number;
  usersToDisplay: IUser[];
}

class UsersDirectory extends React.Component<
  IPropsUsersDirectory,
  IStateUsersDirectory
> {
  constructor(props: IPropsUsersDirectory) {
    super(props);
    this.state = {
      currentPage: 1,
      genderFilter: 'ALL',
      maxPage: Math.ceil(this.props.users.length / USERS_PER_PAGE),
      nameFilter: 'BOTH',
      textFilter: '',
      userInfosModal: undefined,
      usersPerPage: USERS_PER_PAGE,
      usersToDisplay: this.props.users || [],
    };
    this.applyFilters = this.applyFilters.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  public render(): React.ReactNode {
    const userCards: JSX.Element[] = this.renderUserCards();
    return (
      <UserListContainer>
        <UserFilters
          genderFilter={this.state.genderFilter}
          nameFilter={this.state.nameFilter}
          textFilter={this.state.textFilter}
          handleFilter={this.applyFilters}
        />
        <UserList>{userCards}</UserList>
        <UserPagination
          currentPage={this.state.currentPage}
          usersPerPage={USERS_PER_PAGE}
          maxPage={this.state.maxPage}
          totalUsers={this.state.usersToDisplay.length}
          changeCurrentPage={this.changeCurrentPage}
        />
        <UserInfosModal
          closeModal={this.closeModal}
          userInfos={this.state.userInfosModal}
        />
      </UserListContainer>
    );
  }

  public changeCurrentPage(newPage: number): void {
    if (newPage > this.state.maxPage) {
      newPage = this.state.maxPage;
    }

    if (newPage < 1) {
      newPage = 1;
    }

    this.setState((prevState: any, props: any) => {
      return {
        currentPage: newPage,
      };
    });
  }

  public applyFilters(
    genderFilterParameter?: FILTER_GENDER,
    textFilterParameter?: string,
    nameFilterParameter?: NAME_FILTER
  ): void {
    this.setState((prevState: any, props: any) => {
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

      return {
        currentPage: 1,
        genderFilter,
        maxPage,
        nameFilter,
        textFilter,
        usersToDisplay: users,
      };
    });
  }

  public openModal(userInfos: IUser): void {
    this.setState({
      userInfosModal: userInfos,
    });
  }

  public closeModal(): void {
    this.setState({
      userInfosModal: undefined,
    });
  }

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

  private filterUsersByName(
    users: IUser[],
    textFilter: string,
    nameFilter: NAME_FILTER
  ): IUser[] {
    textFilter = textFilter.toLocaleLowerCase();

    switch (nameFilter) {
      case 'BOTH':
        users = users.filter(
          (user: IUser) =>
            user.firstName.toLocaleLowerCase().indexOf(textFilter) !== -1 ||
            user.lastName.toLocaleLowerCase().indexOf(textFilter) !== -1
        );
        break;
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

  private paginateUsers(users: IUser[], currentPage: number = 1): IUser[] {
    const start: number = (currentPage - 1) * USERS_PER_PAGE;
    return users.slice(start, start + USERS_PER_PAGE);
  }

  private renderUserCards(): JSX.Element[] {
    const paginatedUsers: IUser[] = this.paginateUsers(
      this.state.usersToDisplay,
      this.state.currentPage
    );
    return paginatedUsers.map((user: IUser) => (
      <UserCard key={user.id} infos={user} clickHandler={this.openModal} />
    ));
  }
}

export default UsersDirectory;
