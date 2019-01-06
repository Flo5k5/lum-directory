import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import styled from 'styled-components';
import UserCard from './UserCard';
import UserFilters from './UserFilters';
import UserPagination from './UserPagination';

const USERS_PER_PAGE = 10;
type FILTER_GENDER = 'ALL' | 'MALE' | 'FEMALE';
type NAME_FILTER = 'BOTH' | 'FIRST_NAME' | 'LAST_NAME';

const UserListContainer = styled.div``;
const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

class UsersDirectory extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentPage: 1,
      genderFilter: 'ALL',
      maxPage: Math.ceil(this.props.users.length / USERS_PER_PAGE),
      nameFilter: 'BOTH',
      textFilter: '',
      usersPerPage: USERS_PER_PAGE,
      usersToDisplay: this.props.users || [],
    };
    this.applyFilters = this.applyFilters.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  public render() {
    const userCards = this.renderUserCards();
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
      </UserListContainer>
    );
  }

  public changeCurrentPage(newPage: number) {
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
  ) {
    this.setState((prevState: any, props: any) => {
      const genderFilter = genderFilterParameter || prevState.genderFilter;
      const textFilter =
        !textFilterParameter && !nameFilterParameter
          ? prevState.textFilter
          : textFilterParameter;
      const nameFilter =
        !textFilterParameter && !nameFilterParameter
          ? prevState.nameFilter
          : nameFilterParameter;

      let users: IUser[] = this.filterUsersByGender(props.users, genderFilter);
      users = this.filterUsersByName(users, textFilter, nameFilter);

      const maxPage = Math.ceil(users.length / USERS_PER_PAGE);

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

  public openModal(userInfos: IUser) {
    // tslint:disable-next-line: no-console
    console.log('Open modal', userInfos);
  }

  private filterUsersByGender(users: IUser[], genderFilter: FILTER_GENDER) {
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

  private paginateUsers(users: IUser[], currentPage = 1): IUser[] {
    const start = (currentPage - 1) * USERS_PER_PAGE;
    return users.slice(start, start + USERS_PER_PAGE);
  }

  private renderUserCards(): any[] {
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
