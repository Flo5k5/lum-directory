import * as React from 'react';
import styled from 'src/themes/styled-components';

const BUTTONS_TO_SHOW = 7;
const FlexDiv = styled.div``;
const ButtonPagination = styled.button``;

class UserPagination extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.clickChangeCurrentPage = this.clickChangeCurrentPage.bind(this);
  }

  public clickChangeCurrentPage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    this.props.changeCurrentPage(event.currentTarget.value);
  }

  public render() {
    const paginationBar = this.renderPaginationBar();
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

  private renderPaginationBar() {
    return this.caclulatePaginationBarElements().map((element) =>
      this.createPaginationButton(element)
    );
  }

  private caclulatePaginationBarElements(): any[] {
    let paginationBar = [];
    let restToDisplay = 0;
    const offsetleft = this.props.currentPage - 1;
    const offsetRight = this.props.maxPage - this.props.currentPage;

    if (offsetleft <= 3 && offsetRight <= 3) {
      restToDisplay =
        this.props.maxPage < BUTTONS_TO_SHOW
          ? this.props.maxPage
          : BUTTONS_TO_SHOW;

      for (let i = 1; i <= restToDisplay; i++) {
        paginationBar.push(i.toString());
      }
    } else if (offsetleft <= 3) {
      const tempArray = [];
      // -2 beacause there are two static elements in this bar ('>' and maxPage)
      restToDisplay = BUTTONS_TO_SHOW - 2;
      for (let i = 1; i <= restToDisplay; i++) {
        tempArray.push(i.toString());
      }
      paginationBar = [...tempArray, '>', this.props.maxPage.toString()];
    } else if (offsetRight <= 3) {
      const tempArray = [];
      // +2 beacause there are two static elements in this bar (1 and '>')
      restToDisplay = this.props.maxPage - BUTTONS_TO_SHOW + 2;
      for (let i = this.props.maxPage; i > restToDisplay; i--) {
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

  private createPaginationButton(value: string) {
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
