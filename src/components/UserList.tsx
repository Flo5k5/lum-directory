import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import styled from 'styled-components';
import UserCard from './UserCard';

const StyledDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

class UserList extends React.Component<any, any> {
  public render() {
    const userCards = this.props.users.map((user: IUser) => (
      <UserCard key={user.id} infos={user} />
    ));

    return <StyledDiv>{userCards}</StyledDiv>;
  }
}

export default UserList;
