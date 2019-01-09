import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import styled from 'src/themes/StyledComponents';
// import fallbackUserPicture from './../assets/fallbackUserPicture.png';

const WrapperDiv: any = styled.div`
  box-sizing: border-box;
  margin: 0;
  padding: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterMedium};
  border: none;
  background-color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorBackground};
  min-width: 150px;
  max-height: 250px;
  width: 20%;
  // cards take all the resting space around! Microsoft style
  flex: 1 0 auto;
`;

const UserCardContainer: any = styled.div`
  cursor: pointer;
  box-sizing: border-box;
  overflow-wrap: normal;
  height: 100%;
  border: none;
  background-color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorBackground};
  box-shadow: rgba(0, 0, 0, 0.2) 0 1px 5px 0px;
  text-align: center;
`;

const UserImageContainer: any = styled.div`
  padding: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterMedium};
`;

const UserImage: any = styled.img`
  max-width: 100px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0px 20px 0px;
`;

const UserCardContent: any = styled.div`
  overflow: hidden;
  padding: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterSmall};
  text-align: center;
  margin: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterMedium};
`;

const UserCardName: any = styled.span`
  display: block;
  font-weight: bold;
  font-size: ${// tslint:disable-next-line: typedef
  (props) => props.theme.fontMedium};
`;

const UserCardMail: any = styled.span`
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorFontPrimary};
  font-size: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.fontSmall};
`;

interface IUserCardProps {
  key: string;
  infos: IUser;
  clickHandler: (userInfos: IUser) => void;
}

interface IUserCardState {
  currentUser: IUser;
}

class UserCard extends React.Component<IUserCardProps, IUserCardState> {
  constructor(props: IUserCardProps) {
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
      <WrapperDiv>
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
      </WrapperDiv>
    );
  }
}

export default UserCard;
