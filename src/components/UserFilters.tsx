import * as React from 'react';
import styled from 'src/themes/styled-components';

const FlexDiv = styled.div``;
const NameFilterInput = styled.input``;
const Button = styled.button``;

class UserFilters extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.onChangeNameFilterInput = this.onChangeNameFilterInput.bind(this);
    this.onClickNameButtons = this.onClickNameButtons.bind(this);
    this.onClickGenderButtons = this.onClickGenderButtons.bind(this);
  }

  public onChangeNameFilterInput(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.handleFilter(null, event.target.value, this.props.nameFilter);
  }

  public onClickNameButtons(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    this.props.handleFilter(
      null,
      this.props.textFilter,
      event.currentTarget.value
    );
  }

  public onClickGenderButtons(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    this.props.handleFilter(event.currentTarget.value, null, null);
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
          Both
        </Button>
        <Button
          disabled={this.props.genderFilter === 'FEMALE'}
          onClick={this.onClickGenderButtons}
          value='FEMALE'>
          Female
        </Button>
        <Button
          disabled={this.props.genderFilter === 'MALE'}
          onClick={this.onClickGenderButtons}
          value='MALE'>
          Male
        </Button>
      </FlexDiv>
    );
  }
}

export default UserFilters;
