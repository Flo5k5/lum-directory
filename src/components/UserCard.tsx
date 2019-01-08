import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import styled from 'src/themes/styled-components';
// import fallbackUserPicture from './../assets/fallbackUserPicture.png';

const UserCardContainer: any = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  overflow-wrap: break-word
  margin: 10px 1%;
  border: none;
  background-color: white;
  box-shadow: rgba(0,0,0,0.2) 0 1px 5px 0px;
  text-align: center;
  min-width: 140px;
  width: 18%;
`;

const UserImageContainer: any = styled.div`
  padding: 10px;
`;

const UserImage: any = styled.img`
  max-width: 100px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0px 20px 0px;
`;

const UserCardContent: any = styled.div`
  padding: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.smallMargin};
  text-align: center;
  margin: 10px;
`;

const UserCardName: any = styled.span`
  display: block;
  font-weight: bold;
  font-size: ${// tslint:disable-next-line: typedef
  (props) => props.theme.mediumFontSize};
`;

const UserCardMail: any = styled.span`
  color: darkgray;
  font-size: 10px;
`;

interface IPropsUserCard {
  key: string;
  infos: IUser;
  clickHandler: (userInfos: IUser) => void;
}

interface IStateUserCard {
  currentUser: IUser;
}

class UserCard extends React.Component<IPropsUserCard, IStateUserCard> {
  constructor(props: IPropsUserCard) {
    super(props);
    this.state = {
      currentUser: this.props.infos,
    };
    this.onCardClick = this.onCardClick.bind(this);
  }

  public onCardClick(): void {
    this.props.clickHandler(this.state.currentUser);
  }

  public render(): JSX.Element {
    const infos: IUser = this.state.currentUser;
    return (
      <UserCardContainer onClick={this.onCardClick}>
        <UserImageContainer>
          <UserImage src={infos.largePicture} />
        </UserImageContainer>

        <UserCardContent>
          <UserCardName>
            {infos.lastName} {infos.firstName}
          </UserCardName>
          <UserCardMail>{infos.email}</UserCardMail>
        </UserCardContent>
      </UserCardContainer>
    );
  }
}

export default UserCard;
