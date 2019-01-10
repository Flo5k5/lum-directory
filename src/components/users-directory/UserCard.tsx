import * as React from 'react';
import fallbackUserPicture from 'src/assets/fallbackUserPicture.png';
import { IUser } from 'src/interfaces/IUser';
import styled from 'src/themes/StyledComponents';

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

export const UserImageContainer: any = styled.div`
  padding: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterMedium};
`;

export const UserImage: any = styled.img`
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

/**
 *
 *
 * @interface IUserCardProps
 */
interface IUserCardProps {
  key: string;
  infos: IUser;
  clickHandler: (userInfos: IUser) => void;
}

/**
 *
 *
 * @interface IUserCardState
 */
interface IUserCardState {
  currentUser: IUser;
}

/**
 *
 *
 * @export
 * @class UserCard
 * @extends {React.Component<IUserCardProps, IUserCardState>}
 */
export default class UserCard extends React.Component<
  IUserCardProps,
  IUserCardState
> {
  /**
   * Creates an instance of UserCard.
   * @param {IUserCardProps} props
   * @memberof UserCard
   */
  constructor(props: IUserCardProps) {
    super(props);
    this.state = {
      currentUser: this.props.infos,
    };
    this.onCardClick = this.onCardClick.bind(this);
    this.addFallbackImageSrc = this.addFallbackImageSrc.bind(this);
  }

  /**
   * React's render function. In this case, it renders the basic informations of a user and his profile picture.
   * Click on this card will open a modal with more detailed informations about the user.
   *
   * @returns {JSX.Element}
   * @memberof UserCard
   */
  public render(): JSX.Element {
    const infos: IUser = this.state.currentUser;
    return (
      <WrapperDiv>
        <UserCardContainer onClick={this.onCardClick}>
          <UserImageContainer>
            <UserImage
              src={infos.largePicture + 1}
              onError={this.addFallbackImageSrc}
            />
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

  /**
   * Handle the click action on a user card and call parent component's function
   * to open a modal showing all infos of the selected user.
   */
  public onCardClick(): void {
    this.props.clickHandler(this.state.currentUser);
  }

  /**
   * Adds fallback picture to an image with a broken src.
   *
   * @param {*} event
   * @memberof UserCard
   */
  public addFallbackImageSrc(event: any): void {
    event.target.src = fallbackUserPicture;
  }
}
