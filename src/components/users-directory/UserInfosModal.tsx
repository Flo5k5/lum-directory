import * as React from 'react';
import { ICoordinates } from 'src/interfaces/ICoordinates';
import { ILocation } from 'src/interfaces/ILocation';
import { IUser } from 'src/interfaces/IUser';
import styled from 'src/themes/StyledComponents';
import { UserImage, UserImageContainer } from './UserCard';
import UserMap from './UserMap';

const ModalOverlay: any = styled('div')<{ isActive: boolean }>`
  display: ${// tslint:disable-next-line: typedef
  (props: any) => (props.isActive ? 'block' : 'none')};
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

const Modal: any = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorBackground};
  padding: 0;
  width: 80%;
  max-height: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px ${// tslint:disable-next-line: typedef
      (props: any) => props.theme.gutterLarge} 0 rgba(0, 0, 0, 0.19);
  animation-name: animationTop;
  animation-duration: 0.4s;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

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

const ModalLeft: any = styled.div`
  background-color: blue;
  width: 30%;
`;

const ModalRight: any = styled.div`
  background-color: yellow;
  width: 70%;
`;

const CloseButton: any = styled.span`
  position: absolute;
  top: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterSmall};
  right: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterMedium};
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorFontDanger};
  font-size: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.fontVeryLarge};
  font-weight: bold;

  &:hover,
  &:focus {
    cursor: pointer;
    color: ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.colorFontPrimary};
    text-decoration: none;
  }
`;

const UserInfos: any = styled.p``;

interface IPropsUserInfosModal {
  closeModal: () => void;
  userInfos: IUser | undefined;
}

export default class UserInfosModal extends React.Component<
  IPropsUserInfosModal,
  {}
> {
  constructor(props: IPropsUserInfosModal) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  public render(): JSX.Element | null {
    const userInfos: IUser | undefined = this.props.userInfos;
    if (!!userInfos) {
      const location: ILocation = userInfos.location;
      const address: string = `${location.street} ${location.postcode} ${
        location.city
      }`;
      const coordinates: ICoordinates = location.coordinates;
      return (
        <ModalOverlay isActive={!!userInfos}>
          <Modal>
            <CloseButton onClick={this.closeModal}>&times;</CloseButton>
            <ModalLeft>
              <UserImageContainer>
                <UserImage src={userInfos.largePicture} />
              </UserImageContainer>
              <UserInfos>
                {userInfos.email}
                <br />
              </UserInfos>
            </ModalLeft>
            <ModalRight>
              <p>{userInfos.email}</p>
              <p>Some other text...</p>
              <UserMap
                address={address}
                latitude={+coordinates.latitude}
                longitude={+coordinates.longitude}
              />
            </ModalRight>
          </Modal>
        </ModalOverlay>
      );
    } else {
      return null;
    }
  }

  public closeModal(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void {
    this.props.closeModal();
  }
}
