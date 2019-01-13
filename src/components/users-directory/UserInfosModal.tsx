import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { ILocation } from 'src/interfaces/ILocation';
import { IUser } from 'src/interfaces/IUser';
import styled from 'src/themes/StyledComponents';
import { Paragraph } from '../layout/Paragraph';
import { Span } from '../layout/Span';
import { UserMap } from './UserMap';
import UserProfilePicture from './UserProfilePicture';

/** Styled component that displays overlay behind modal. */
const ModalOverlay: any = styled('div')<{ show: boolean }>`
  display: ${// tslint:disable-next-line: typedef
  (props: any) => (props.show ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

/** Styled component that centers and positions the modal over main content. */
const Modal: any = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorBackground};
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.color.primary};
  word-break: break-word;
  overflow: auto;
  padding: 0;
  width: 80%;
  min-height: 80%;
  max-height: 90%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px ${// tslint:disable-next-line: typedef
      (props: any) => props.theme.gutterLarge} 0 rgba(0, 0, 0, 0.19);
  animation-name: animationTop;
  animation-duration: 0.4s;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;

  @keyframes animationTop {
    from {
      top: -300px;
      opacity: 0;
    }
    to {
      top: 0;
      opacity: 1;
    }
  }
`;

/** Styled component that handles the position of the left part of the modal. */
const ModalLeft: any = styled.div`
  box-sizing: border-box;
  padding: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterLarge};
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 350px;
  overflow: hidden;
`;

/** Styled component that handles the position of the right part of the modal. */
const ModalRight: any = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 350px;
  overflow: hidden;
`;

/** Styled component that handles the position of the close button of the modal. */
const CloseButton: any = styled.span`
  position: absolute;
  top: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterSmall};
  right: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterMedium};
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.color.danger};
  font-size: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.fontSize.veryLarge};
  font-weight: bold;

  &:hover,
  &:focus {
    cursor: pointer;
    color: ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.color.primary};
    text-decoration: none;
  }
`;

/**
 * Represents the properties object of the UserInfosModal component.
 *
 * @interface IPropsUserInfosModal
 */
interface IPropsUserInfosModal {
  closeModal: () => void;
  userInfos: IUser | undefined;
}

/**
 * UserInfosModal renders all the user informations into a modal.
 *
 * @export
 * @class UserInfosModal
 * @extends {React.Component<IPropsUserInfosModal, {}>}
 */
export default class UserInfosModal extends React.Component<
  IPropsUserInfosModal,
  {}
> {
  /**
   * Creates an instance of UserInfosModal.
   * @param {IPropsUserInfosModal} props
   * @memberof UserInfosModal
   */
  constructor(props: IPropsUserInfosModal) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  /**
   * React's render function. In this case, it renders the overlay, the modal.
   * Inside the modal, you have the user informations and the map.
   *
   * @returns {(JSX.Element | null)}
   * @memberof UserInfosModal
   */
  public render(): JSX.Element | null {
    const userInfos: IUser | undefined = this.props.userInfos;
    if (!!userInfos) {
      const location: ILocation = userInfos.location;
      return (
        <ModalOverlay show={!!userInfos}>
          <Modal>
            <CloseButton onClick={this.closeModal}>&times;</CloseButton>
            <ModalLeft>
              <UserProfilePicture pictureUrl={userInfos.largePicture} />
              <Paragraph>
                <br />
                <Span bold={true} color={'secondary'} fontSize='large'>
                  {userInfos.title} {userInfos.lastName} {userInfos.firstName}{' '}
                  <FontAwesomeIcon
                    icon={userInfos.gender === 'female' ? 'venus' : 'mars'}
                  />
                </Span>
                <br />
                <Span>
                  <a href={`mailto:${userInfos.email}`}>
                    <FontAwesomeIcon icon='envelope' />
                    &nbsp;{userInfos.email}
                  </a>
                </Span>
                <br />
                <Span>
                  <a href={`tel:${userInfos.phone}`}>
                    <FontAwesomeIcon icon='phone' />
                    &nbsp;{userInfos.phone}
                  </a>
                </Span>
                <br />
                <Span>
                  <a href={`tel:${userInfos.cell}`}>
                    <FontAwesomeIcon icon='mobile' />
                    &nbsp;{userInfos.cell}
                  </a>
                </Span>
                <br />
                <Span>
                  <FontAwesomeIcon icon='birthday-cake' />
                  &nbsp;
                  {userInfos.dob} | {userInfos.age} years
                </Span>
                <br />
                <Span>
                  <FontAwesomeIcon icon='globe-europe' />
                  &nbsp;Nationality: {userInfos.nat}
                </Span>
                <br />
                <Span>
                  Registered since: {userInfos.registration.date} |&nbsp;
                  {userInfos.registration.age} year(s)
                </Span>
                <br />
              </Paragraph>
            </ModalLeft>
            <ModalRight>
              <Paragraph>
                <Span bold={true} color={'secondary'} fontSize='large'>
                  Login informations
                </Span>
                <br />
                <Span>Uuid: {userInfos.login.uuid}</Span>
                <br />
                <Span>Login: {userInfos.login.username}</Span>
                <br />
                <Span>Password: {userInfos.login.password}</Span>
                <br />
                <Span>Salt: {userInfos.login.salt}</Span>
                <br />
                <Span>MD5: {userInfos.login.md5}</Span>
                <br />
                <Span>SHA1: {userInfos.login.sha1}</Span>
                <br />
                <Span>SHA256: {userInfos.login.sha256}</Span>
                <br />
              </Paragraph>
              <Span bold={true} color={'secondary'} fontSize='large'>
                Location
              </Span>
              <br />
              <UserMap location={location} />
            </ModalRight>
          </Modal>
        </ModalOverlay>
      );
    } else {
      return null;
    }
  }

  /**
   * Handles the click event on the close button and call parent's function to close the modal.
   *
   * @param {React.MouseEvent<HTMLDivElement, MouseEvent>} event
   * @memberof UserInfosModal
   */
  private closeModal(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void {
    this.props.closeModal();
  }
}
