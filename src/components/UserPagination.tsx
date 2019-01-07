import * as React from 'react';
import styled from 'src/themes/styled-components';

const BUTTONS_TO_SHOW: number = 7;
const FlexDiv: any = styled.div``;
const ButtonPagination: any = styled.button``;

interface IPropsUserPagination {
  currentPage: number;
  usersPerPage: number;
  maxPage: number;
  totalUsers: number;
  changeCurrentPage: (n: number) => void;
}

class UserPagination extends React.Component<IPropsUserPagination, {}> {
  constructor(props: IPropsUserPagination) {
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
      <FlexDiv>
        <span>
          {(this.props.currentPage - 1) * this.props.usersPerPage + 1} -{' '}
          {this.props.usersPerPage * this.props.currentPage} of{' '}
          {this.props.totalUsers} users
        </span>
        {paginationBar}
      </FlexDiv>
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
          <ButtonPagination key={value} disabled={true}>
            {this.props.currentPage}
          </ButtonPagination>
        );

      case this.props.maxPage.toString():
        return (
          <ButtonPagination
            key={value}
            disabled={this.props.currentPage >= this.props.maxPage}
            onClick={this.clickChangeCurrentPage}
            value={this.props.maxPage}>
            {this.props.maxPage}
          </ButtonPagination>
        );

      case '<':
        return (
          <ButtonPagination
            key={value}
            onClick={this.clickChangeCurrentPage}
            value={+this.props.currentPage - 2}>
            {'<'}
          </ButtonPagination>
        );

      case '>':
        return (
          <ButtonPagination
            key={value}
            onClick={this.clickChangeCurrentPage}
            value={+this.props.currentPage + 2}>
            {'>'}
          </ButtonPagination>
        );

      default:
        return (
          <ButtonPagination
            key={value}
            disabled={this.props.currentPage === +value}
            onClick={this.clickChangeCurrentPage}
            value={+value}>
            {value}
          </ButtonPagination>
        );
    }
  }
}

export default UserPagination;
