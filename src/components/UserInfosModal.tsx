import * as React from 'react';
import { IUser } from 'src/interfaces/IUser';
import styled from 'src/themes/styled-components';

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
  background-color: #fefefe;
  margin: auto;
  padding: 0;
  border: 1px solid #888;
  width: 80%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: animationTop;
  animation-duration: 0.4s;

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
  color: white;
`;

const ModalRight: any = styled.div`
  padding: 2px 16px;
`;

const ModalFooter: any = styled.div`
  padding: 2px 16px;
  background-color: #5cb85c;
  color: white;
`;

const CloseButton: any = styled.span`
  color: white;
  float: right;
  font-size: 28px;
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
            <ModalLeft>
              <CloseButton onClick={this.closeModal}>&times;</CloseButton>
              <h2>My header</h2>
            </ModalLeft>
            <ModalRight>
              <p>{userInfos.email}</p>
              <p>Some other text...</p>
            </ModalRight>
            <ModalFooter>
              <h3>Modal Footer</h3>
            </ModalFooter>
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
