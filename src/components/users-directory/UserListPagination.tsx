import * as React from 'react';
import styled from 'src/themes/StyledComponents';
import { BiggerBoldText } from '../layout/BiggerBoldText';
import { Button } from '../layout/Button';

const BUTTONS_TO_SHOW: number = 7;
const WrapperDiv: any = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterLarge};
`;

const UserCountSpan: any = styled.span`
  display: flex;
  align-items: center;
`;
const PaginationBar: any = styled.div``;
const Spacer: any = styled.div``;

const ColoredSpan: any = styled.span`
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorFontPrimary};
`;

interface IUserListPaginationProps {
  currentPage: number;
  maxPage: number;
  totalUsers: number;
  changeCurrentPage: (n: number) => void;
}

class UserListPagination extends React.Component<IUserListPaginationProps, {}> {
  constructor(props: IUserListPaginationProps) {
    super(props);
    this.clickChangeCurrentPage = this.clickChangeCurrentPage.bind(this);
  }

  public clickChangeCurrentPage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    this.props.changeCurrentPage(+event.currentTarget.value);
  }

  public render(): JSX.Element {
    const paginationBar: JSX.Element[] = this.renderPaginationBar();
    return (
      <WrapperDiv>
        <Spacer>&nbsp;</Spacer>
        <PaginationBar>{paginationBar}</PaginationBar>
        <UserCountSpan>
          <BiggerBoldText>{this.props.totalUsers}</BiggerBoldText>{' '}
          <ColoredSpan>users</ColoredSpan>
        </UserCountSpan>
      </WrapperDiv>
    );
  }

  private renderPaginationBar(): JSX.Element[] {
    return this.caclulatePaginationBarElements().map((element: string) =>
      this.createPaginationButton(element)
    );
  }

  private caclulatePaginationBarElements(): string[] {
    let paginationBar: string[] = [];
    let restToDisplay: number = 0;
    const offsetleft: number = this.props.currentPage - 1;
    const offsetRight: number = this.props.maxPage - this.props.currentPage;

    if (offsetleft <= 3 && offsetRight <= 3) {
      restToDisplay =
        this.props.maxPage < BUTTONS_TO_SHOW
          ? this.props.maxPage
          : BUTTONS_TO_SHOW;

      for (let i: number = 1; i <= restToDisplay; i++) {
        paginationBar.push(i.toString());
      }
    } else if (offsetleft <= 3) {
      const tempArray: string[] = [];
      // -2 beacause there are two static elements in this bar ('>' and maxPage)
      restToDisplay = BUTTONS_TO_SHOW - 2;
      for (let i: number = 1; i <= restToDisplay; i++) {
        tempArray.push(i.toString());
      }
      paginationBar = [...tempArray, '>', this.props.maxPage.toString()];
    } else if (offsetRight <= 3) {
      const tempArray: string[] = [];
      // +2 beacause there are two static elements in this bar (1 and '>')
      restToDisplay = this.props.maxPage - BUTTONS_TO_SHOW + 2;
      for (let i: number = this.props.maxPage; i > restToDisplay; i--) {
        tempArray.push(i.toString());
      }
      paginationBar = ['1', '<', ...tempArray.reverse()];
    } else {
      paginationBar = [
        '1',
        '<',
        (+this.props.currentPage - 1).toString(),
        this.props.currentPage.toString(),
        (+this.props.currentPage + 1).toString(),
        '>',
        this.props.maxPage.toString(),
      ];
    }

    return paginationBar;
  }

  private createPaginationButton(value: string): JSX.Element {
    switch (value) {
      case this.props.currentPage.toString():
        return (
          <Button key={value} disabled={true}>
            {this.props.currentPage}
          </Button>
        );

      case this.props.maxPage.toString():
        return (
          <Button
            key={value}
            disabled={this.props.currentPage >= this.props.maxPage}
            onClick={this.clickChangeCurrentPage}
            value={this.props.maxPage}>
            {this.props.maxPage}
          </Button>
        );

      case '<':
        return (
          <Button
            key={value}
            onClick={this.clickChangeCurrentPage}
            value={+this.props.currentPage - 2}>
            {'<'}
          </Button>
        );

      case '>':
        return (
          <Button
            key={value}
            onClick={this.clickChangeCurrentPage}
            value={+this.props.currentPage + 2}>
            {'>'}
          </Button>
        );

      default:
        return (
          <Button
            key={value}
            disabled={this.props.currentPage === +value}
            onClick={this.clickChangeCurrentPage}
            value={+value}>
            {value}
          </Button>
        );
    }
  }
}

export default UserListPagination;
