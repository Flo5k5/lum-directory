import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import styled from 'src/themes/styled-components';
import fallbackUserPicture from './../assets/fallbackUserPicture.png';

const UserCardContainer = styled.div`
  cursor: pointer;
  width: 200px;
  height: 150px;
  box-sizing: border-box;
  overflow-wrap: break-word
  border-radius: ${(props) => props.theme.borderRadius};
  margin-bottom: ${(props) => props.theme.largeMargin};
  border: none;
  background-color: ${(props) => props.theme.cardBackground};
  box-shadow: rgba(0, 0, 0, 0.19) 0 0 8px 0;

  &:hover, &:focus {
    background: white;
    box-shadow: rgba(0, 0, 0, 0.45) 0px 0px 20px 0px;
  }
`;

const BackgroundImage = styled('div')<{ url: string }>`
  background-image: url(${(props) => props.url || fallbackUserPicture});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-color: rgba(255, 255, 255, 0.15);
  background-blend-mode: overlay;
  border-radius: ${(props) => props.theme.borderRadius}
    ${(props) => props.theme.borderRadius} 0 0;
  position: relative;
  height: 110px;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0);
  }
`;

const UserCardContent = styled.div`
  padding: ${(props) => props.theme.smallMargin};
  text-align: center;
  font-size: ${(props) => props.theme.mediumFontSize};
`;

const UserCardName = styled.span`
  display: block;
`;

const LinkMail = styled.a`
  color: ${(props) => props.theme.secondaryColor};
  text-decoration: none;
`;

class UserCard extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.onCardClick = this.onCardClick.bind(this);
  }

  public onCardClick(): void {
    // tslint:disable-next-line: no-console
    console.log(this.props.infos);
  }

  public render() {
    const infos: IUser = this.props.infos;
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
