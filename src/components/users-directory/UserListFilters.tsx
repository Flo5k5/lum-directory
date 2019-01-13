import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'src/themes/StyledComponents';
import { Button } from '../layout/Button';
import { GroupButton } from '../layout/GroupButtons';
import { Span } from '../layout/Span';
import { TextInput } from '../layout/TextInput';
import { FILTER_GENDER, NAME_FILTER } from './UserList';

/** Styled component that contains all the others component. */
const WrapperDiv: any = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterLarge};
`;

/**
 * Represents the properties object of the UserListFilters component.
 *
 * @interface IUserListFiltersProps
 */
interface IUserListFiltersProps {
  genderFilter: FILTER_GENDER;
  nameFilter: NAME_FILTER;
  textFilter: string;
  handleFilter: (
    genderFilterParameter?: FILTER_GENDER,
    textFilterParameter?: string,
    nameFilterParameter?: NAME_FILTER
  ) => void;
}

/**
 * UserListFilters class is a React component class used to render the users list filters (by name or by genre).
 *
 * @class UserListFilters
 * @extends {React.Component<IUserListFiltersProps, {}>}
 */
export default class UserListFilters extends React.Component<
  IUserListFiltersProps,
  {}
> {
  /**
   * Creates an instance of UserListFilters.
   * @param {IUserListFiltersProps} props
   * @memberof UserListFilters
   */
  constructor(props: IUserListFiltersProps) {
    super(props);
    this.onChangeNameFilterInput = this.onChangeNameFilterInput.bind(this);
    this.onClickNameButtons = this.onClickNameButtons.bind(this);
    this.onClickGenderButtons = this.onClickGenderButtons.bind(this);
  }

  /**
   * Renders the users list filters (by name or by genre).
   *
   * @returns {React.ReactNode}
   * @memberof UserListFilters
   */
  public render(): React.ReactNode {
    return (
      <WrapperDiv>
        <Span bold={true} color={'secondary'} fontSize='large'>
          Filters
        </Span>
        <GroupButton>
          <Button
            adaptiveWidth={true}
            disabled={this.props.nameFilter === 'FIRST_NAME'}
            onClick={this.onClickNameButtons}
            value='FIRST_NAME'>
            First name
          </Button>
          <Button
            adaptiveWidth={true}
            disabled={this.props.nameFilter === 'LAST_NAME'}
            onClick={this.onClickNameButtons}
            value='LAST_NAME'>
            Last name
          </Button>
          <TextInput
            value={this.props.textFilter}
            onChange={this.onChangeNameFilterInput}
          />
        </GroupButton>
        <GroupButton>
          <Button
            disabled={this.props.genderFilter === 'ALL'}
            onClick={this.onClickGenderButtons}
            title='All'
            value='ALL'>
            <FontAwesomeIcon icon='venus-mars' />
          </Button>
          <Button
            disabled={this.props.genderFilter === 'FEMALE'}
            onClick={this.onClickGenderButtons}
            title='Women'
            value='FEMALE'>
            <FontAwesomeIcon icon='venus' />
          </Button>
          <Button
            disabled={this.props.genderFilter === 'MALE'}
            onClick={this.onClickGenderButtons}
            title='Men'
            value='MALE'>
            <FontAwesomeIcon icon='mars' />
          </Button>
        </GroupButton>
      </WrapperDiv>
    );
  }

  /**
   * Handles changes on the name filter input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event
   * @memberof UserListFilters
   */
  private onChangeNameFilterInput(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    this.props.handleFilter(
      undefined,
      event.target.value,
      this.props.nameFilter
    );
  }

  /**
   * Handles clicks on the name buttons to change the filter.
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   * @memberof UserListFilters
   */
  private onClickNameButtons(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    this.props.handleFilter(undefined, this.props.textFilter, event
      .currentTarget.value as NAME_FILTER);
  }

  /**
   * Handles clicks on the 'gender' buttons to filter by gender.
   *
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} event
   * @memberof UserListFilters
   */
  private onClickGenderButtons(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    this.props.handleFilter(
      event.currentTarget.value as FILTER_GENDER,
      undefined,
      undefined
    );
  }
}
