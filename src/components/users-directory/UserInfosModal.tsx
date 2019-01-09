import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import styled from 'src/themes/StyledComponents';

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
  position: relative;
  background-color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorBackground};
  margin: auto;
  padding: 0;
  border: ${// tslint:disable-next-line: typedef
    (props: any) =>
      props.theme.borderSize} ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.borderStyle} #888;
  width: 80%;
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
  padding: 2px 16px;
  background-color: #5cb85c;
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorBackground};
`;

const ModalRight: any = styled.div`
  padding: 2px 16px;
`;

const CloseButton: any = styled.span`
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorBackground};
  float: right;
  font-size: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.fontLarge};
  font-weight: bold;

  &:hover,
  &:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
  }
`;

interface IPropsUserInfosModal {
  closeModal: () => void;
  userInfos: IUser | undefined;
}

class UserInfosModal extends React.Component<IPropsUserInfosModal, {}> {
  constructor(props: IPropsUserInfosModal) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  public render(): JSX.Element | null {
    const userInfos: IUser | undefined = this.props.userInfos;
    if (!!userInfos) {
      return (
        <ModalOverlay isActive={!!userInfos}>
          <Modal>
            <CloseButton onClick={this.closeModal}>&times;</CloseButton>
            <ModalLeft>
              {/* <UserImageContainer>
                <UserImage src={infos.largePicture} />
              </UserImageContainer> */}
            </ModalLeft>
            <ModalRight>
              <p>{userInfos.email}</p>
              <p>Some other text...</p>
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

export default UserInfosModal;
