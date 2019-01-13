import * as React from 'react';
import fallbackUserPicture from 'src/assets/fallbackUserPicture.png';
import styled from 'src/themes/StyledComponents';

/** Styled component that positions users's profile picture. */
const UserImageContainer: any = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterMedium};
`;

/** Styled component that displays and styles users's profile picture. */
const UserImage: any = styled.img`
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0px 20px 0px;
`;

/**
 * Represents the properties object of the UserProfilePicture component.
 *
 * @interface IUserProfilePicture
 */
interface IUserProfilePicture {
  pictureUrl: string;
}

/**
 * Renders the user profile picture.
 *
 * @export
 * @class UserProfilePicture
 * @extends {React.Component<IUserProfilePicture, {}>}
 */
export default class UserProfilePicture extends React.Component<
  IUserProfilePicture,
  {}
> {
  /**
   * Creates an instance of UserProfilePicture.
   * @param {IUserProfilePicture} props
   * @memberof UserProfilePicture
   */
  constructor(props: IUserProfilePicture) {
    super(props);

    this.addFallbackImageSrc = this.addFallbackImageSrc.bind(this);
  }

  /**
   * Renders the user profile picture.
   *
   * @returns {JSX.Element}
   * @memberof UserProfilePicture
   */
  public render(): JSX.Element {
    return (
      <UserImageContainer>
        <UserImage
          src={this.props.pictureUrl}
          onError={this.addFallbackImageSrc}
        />
      </UserImageContainer>
    );
  }

  /**
   * Adds fallback picture to an image with a broken src.
   *
   * @param {*} event
   * @memberof UserCard
   */
  private addFallbackImageSrc(event: any): void {
    event.target.src = fallbackUserPicture;
  }
}
