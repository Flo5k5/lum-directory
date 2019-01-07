import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import styled from 'src/themes/styled-components';
import fallbackUserPicture from './../assets/fallbackUserPicture.png';

const UserCardContainer: any = styled.div`
  cursor: pointer;
  width: 200px;
  height: 150px;
  box-sizing: border-box;
  overflow-wrap: break-word
  border-radius: ${
    // tslint:disable-next-line: typedef
    (props: any) => props.theme.borderRadius
  };
  margin-bottom: ${
    // tslint:disable-next-line: typedef
    (props: any) => props.theme.largeMargin
  };
  border: none;
  background-color: ${
    // tslint:disable-next-line: typedef
    (props: any) => props.theme.cardBackground
  };
  box-shadow: rgba(0, 0, 0, 0.19) 0 0 8px 0;

  &:hover, &:focus {
    background: white;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 20px 0px;
  }
`;

const BackgroundImage: any = styled('div')<{ url: string }>`
  background-image: url(${// tslint:disable-next-line: typedef
  (props: any) => props.url || fallbackUserPicture});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba(255, 255, 255, 0.15);
  background-blend-mode: overlay;
  border-radius: ${// tslint:disable-next-line: typedef
    (props: any) =>
      props.theme.borderRadius} ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.borderRadius} 0 0;
  position: relative;
  height: 110px;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0);
  }
`;

const UserCardContent: any = styled.div`
  padding: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.smallMargin};
  text-align: center;
  font-size: ${// tslint:disable-next-line: typedef
  (props) => props.theme.mediumFontSize};
`;

const UserCardName: any = styled.span`
  display: block;
`;

const LinkMail: any = styled.a`
  color: ${// tslint:disable-next-line: typedef
  (props) => props.theme.secondaryColor};
  text-decoration: none;
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
        <BackgroundImage url={infos.largePicture} />
        <UserCardContent>
          <UserCardName>
            {infos.lastName} {infos.firstName}
          </UserCardName>
          <LinkMail>{infos.email}</LinkMail>
        </UserCardContent>
      </UserCardContainer>
    );
  }
}

export default UserCard;
