import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import styled from 'src/themes/StyledComponents';
import { Span } from '../layout/Span';
import UserProfilePicture from './UserProfilePicture';

/** Styled component that contains all the others component.
 * Main goal is to use this to create a fixed minimum white margin
 * around user's card and position it against other cards.
 */
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

/** Styled component that styles borders of the user's card. */
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

/** Styled components that hosts and formats textual informations of a user.  */
const UserCardContent: any = styled.div`
  white-space: pre-line;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterSmall};
  text-align: center;
  margin: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterMedium};
`;

/**
 * Represents the properties object of the UserCard component.
 *
 * @interface IUserCardProps
 */
interface IUserCardProps {
  key: string;
  infos: IUser;
  clickHandler: (userInfos: IUser) => void;
}

/**
 * Represents the state object of the UserCard component.
 *
 * @interface IUserCardState
 */
interface IUserCardState {
  currentUser: IUser;
}

/**
 * React's component class that renders a card showing basic informations of a
 * user and its profile picture.
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
          <UserProfilePicture pictureUrl={infos.largePicture} />
          <UserCardContent>
            <Span bold={true} color={'secondary'}>
              {infos.lastName} {infos.firstName}
            </Span>
            <Span fontSize={'small'}>{infos.email}</Span>
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
}
