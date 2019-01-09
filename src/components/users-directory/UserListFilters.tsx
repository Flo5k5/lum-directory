import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'src/themes/StyledComponents';
import { BiggerBoldText } from '../layout/BiggerBoldText';
import { Button } from '../layout/Button';
import { FILTER_GENDER, NAME_FILTER } from './UserList';

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
const NameFilterInput: any = styled.input`
  height: 35px;
  box-sizing: border-box;
  border: ${// tslint:disable-next-line: typedef
    (props: any) =>
      props.theme.borderSize} ${// tslint:disable-next-line: typedef
    (props: any) =>
      props.theme.borderStyle} ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.colorFontPrimary};
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorFontPrimary};
  padding: 0 ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.gutterSmall};
  :focus {
    outline: none;
  }
`;
const GroupButton: any = styled.div`
  display: inline-block;
  margin-right: 0 ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.gutterLarge};

  ${Button}, ${NameFilterInput} {
    border-left: none;
  }

  ${Button}:first-child {
    border-left: ${// tslint:disable-next-line: typedef
      (props: any) =>
        props.theme.borderSize} ${// tslint:disable-next-line: typedef
      (props: any) =>
        props.theme.borderStyle} ${// tslint:disable-next-line: typedef
      (props: any) => props.theme.colorFontPrimary};
  }
`;

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

class UserListFilters extends React.Component<IUserListFiltersProps, {}> {
  constructor(props: IUserListFiltersProps) {
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
      <WrapperDiv>
        <BiggerBoldText>Filters</BiggerBoldText>
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
          <NameFilterInput
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
}

export default UserListFilters;
