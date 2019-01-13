import styled from 'src/themes/StyledComponents';
import { Button } from './Button';
import { TextInput } from './TextInput';

/** Styled component to format a group of Buttons */
export const GroupButton: any = styled.div`
  display: inline-block;
  margin-right: 0 ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.gutterLarge};

  ${Button}, ${TextInput} {
    border-left: none;
  }

  ${Button}:first-child {
    border-left: ${// tslint:disable-next-line: typedef
      (props: any) =>
        props.theme.borderSize} ${// tslint:disable-next-line: typedef
      (props: any) =>
        props.theme.borderStyle} ${// tslint:disable-next-line: typedef
      (props: any) => props.theme.color.primary};
  }
`;
