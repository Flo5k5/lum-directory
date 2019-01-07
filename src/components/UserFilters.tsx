import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'src/themes/styled-components';
import { FILTER_GENDER, NAME_FILTER } from './UsersDirectory';

const FlexDiv: any = styled.div``;
const NameFilterInput: any = styled.input``;
const Button: any = styled.button``;

interface IPropsUserFilters {
  genderFilter: FILTER_GENDER;
  nameFilter: NAME_FILTER;
  textFilter: string;
  handleFilter: (
    genderFilterParameter?: FILTER_GENDER,
    textFilterParameter?: string,
    nameFilterParameter?: NAME_FILTER
  ) => void;
}

class UserFilters extends React.Component<IPropsUserFilters, {}> {
  constructor(props: IPropsUserFilters) {
    super(props);
    this.onChangeNameFilterInput = this.onChangeNameFilterInput.bind(this);
    this.onClickNameButtons = this.onClickNameButtons.bind(this);
    this.onClickGenderButtons = this.onClickGenderButtons.bind(this);
  }

  public onChangeNameFilterInput(
    event: React.ChangeEvent<HTMLInputElement>
  ): void {
    this.props.handleFilter(
      undefined,
      event.target.value,
      this.props.nameFilter
    );
  }

  public onClickNameButtons(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    this.props.handleFilter(undefined, this.props.textFilter, event
      .currentTarget.value as NAME_FILTER);
  }

  public onClickGenderButtons(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    this.props.handleFilter(
      event.currentTarget.value as FILTER_GENDER,
      undefined,
      undefined
    );
  }

  public render(): React.ReactNode {
    return (
      <FlexDiv>
        <NameFilterInput
          value={this.props.textFilter}
          onChange={this.onChangeNameFilterInput}
        />
        <Button
          disabled={this.props.nameFilter === 'BOTH'}
          onClick={this.onClickNameButtons}
          value='BOTH'>
          Both
        </Button>
        <Button
          disabled={this.props.nameFilter === 'FIRST_NAME'}
          onClick={this.onClickNameButtons}
          value='FIRST_NAME'>
          First name
        </Button>
        <Button
          disabled={this.props.nameFilter === 'LAST_NAME'}
          onClick={this.onClickNameButtons}
          value='LAST_NAME'>
          Last name
        </Button>
        &nbsp;
        <Button
          disabled={this.props.genderFilter === 'ALL'}
          onClick={this.onClickGenderButtons}
          value='ALL'>
          <FontAwesomeIcon icon='venus-mars' />
        </Button>
        <Button
          disabled={this.props.genderFilter === 'FEMALE'}
          onClick={this.onClickGenderButtons}
          value='FEMALE'>
          <FontAwesomeIcon icon='venus' />
        </Button>
        <Button
          disabled={this.props.genderFilter === 'MALE'}
          onClick={this.onClickGenderButtons}
          value='MALE'>
          <FontAwesomeIcon icon='mars' />
        </Button>
      </FlexDiv>
    );
  }
}

export default UserFilters;
