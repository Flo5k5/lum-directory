import * as React from 'react';
import styled from 'src/themes/StyledComponents';
import { Button } from '../layout/Button';
import { Span } from '../layout/Span';

/** Number of buttons to display in the pagination toolbar */
const BUTTONS_TO_SHOW: number = 7;

/** Styled component used to position all the UserListPagination sub components  */
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

/** Styled component used to display the total number of users */
const UserCountSpan: any = styled.span`
  display: flex;
  align-items: center;
`;

/** Styled component that contains pagination toolbar and its button components */
const PaginationBar: any = styled.div``;

/** Styled component used as spacer to position correctly users counter and pagination toolbar */
const Spacer: any = styled.div``;

/**
 * Represents the properties object of the UserListPagination component.
 *
 * @interface IUserListPaginationProps
 */
interface IUserListPaginationProps {
  currentPage: number;
  maxPage: number;
  totalUsers: number;
  changeCurrentPage: (n: number) => void;
}

/**
 * UserListPagination is a React component class that handle the rendering of the pagination
 * toolbar and its button components. It displays a counter of the currently displayed users.
 *
 * @class UserListPagination
 * @extends {React.Component<IUserListPaginationProps, {}>}
 */
export default class UserListPagination extends React.Component<
  IUserListPaginationProps,
  {}
> {
  constructor(props: IUserListPaginationProps) {
    super(props);
    this.clickChangeCurrentPage = this.clickChangeCurrentPage.bind(this);
  }

  /**
   * React's render function to render all components of the users list
   *
   * @returns {JSX.Element}
   * @memberof UserListPagination
   */
  public render(): JSX.Element {
    const paginationBar: JSX.Element[] = this.renderPaginationBar(
      this.props.currentPage,
      this.props.maxPage
    );
    return (
      <WrapperDiv>
        <Spacer>&nbsp;</Spacer>
        <PaginationBar>{paginationBar}</PaginationBar>
        <UserCountSpan>
          <Span bold={true} color={'secondary'} fontSize='large'>
            {this.props.totalUsers}
          </Span>
          <Span>&nbsp;users</Span>
        </UserCountSpan>
      </WrapperDiv>
    );
  }

  /**
   * Handle the click event to change the current page of users
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   * @memberof UserListPagination
   */
  public clickChangeCurrentPage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    this.props.changeCurrentPage(+event.currentTarget.value);
  }

  /**
   * Renders the pagination toolbar (an array of button components).
   *
   * @private
   * @param {number} [currentPage=1] - Value of the current page
   * @param {number} [maxPage=1] - Value of the last page
   * @returns {JSX.Element[]} - Array of button components
   * @memberof UserListPagination
   */
  private renderPaginationBar(
    currentPage: number = 1,
    maxPage: number = 1
  ): JSX.Element[] {
    return this.caclulatePaginationBarElements(currentPage, maxPage).map(
      (element: string) =>
        this.createPaginationButton(element, currentPage, maxPage)
    );
  }

  /**
   * Handle all the logic to generate the pagination toolbar.
   *
   * @private
   * @param {number} [currentPage=1] - Value of the current page
   * @param {number} [maxPage=1] - Value of the last page
   * @returns {string[]} - Array of value that will be displayed in button components
   * @memberof UserListPagination
   */
  private caclulatePaginationBarElements(
    currentPage: number = 1,
    maxPage: number = 1
  ): string[] {
    let paginationBar: string[] = [];
    let restToDisplay: number = 0;
    const offsetleft: number = currentPage - 1;
    const offsetRight: number = maxPage - currentPage;

    if (offsetleft <= 3 && offsetRight <= 3) {
      restToDisplay = maxPage < BUTTONS_TO_SHOW ? maxPage : BUTTONS_TO_SHOW;

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
      paginationBar = [...tempArray, '>', maxPage.toString()];
    } else if (offsetRight <= 3) {
      const tempArray: string[] = [];
      // +2 beacause there are two static elements in this bar (1 and '>')
      restToDisplay = maxPage - BUTTONS_TO_SHOW + 2;
      for (let i: number = maxPage; i > restToDisplay; i--) {
        tempArray.push(i.toString());
      }
      paginationBar = ['1', '<', ...tempArray.reverse()];
    } else {
      paginationBar = [
        '1',
        '<',
        (+currentPage - 1).toString(),
        currentPage.toString(),
        (+currentPage + 1).toString(),
        '>',
        maxPage.toString(),
      ];
    }

    return paginationBar;
  }

  /**
   * Create a button component for pagination based on the value passed as argument.
   *
   * @private
   * @param {string} value - Value to display in returned button component
   * @param {number} [currentPage=1] - Value of the current page
   * @param {number} [maxPage=1] - Value of the last page
   * @returns {JSX.Element} - Button component
   * @memberof UserListPagination
   */
  private createPaginationButton(
    value: string,
    currentPage: number = 1,
    maxPage: number = 1
  ): JSX.Element {
    switch (value) {
      case currentPage.toString():
        return (
          <Button key={value} disabled={true}>
            {currentPage}
          </Button>
        );

      case maxPage.toString():
        return (
          <Button
            key={value}
            disabled={currentPage >= maxPage}
            onClick={this.clickChangeCurrentPage}
            value={maxPage}>
            {maxPage}
          </Button>
        );

      case '<':
        return (
          <Button
            key={value}
            onClick={this.clickChangeCurrentPage}
            value={+currentPage - 2}>
            {'<'}
          </Button>
        );

      case '>':
        return (
          <Button
            key={value}
            onClick={this.clickChangeCurrentPage}
            value={+currentPage + 2}>
            {'>'}
          </Button>
        );

      default:
        return (
          <Button
            key={value}
            disabled={currentPage === +value}
            onClick={this.clickChangeCurrentPage}
            value={+value}>
            {value}
          </Button>
        );
    }
  }
}
