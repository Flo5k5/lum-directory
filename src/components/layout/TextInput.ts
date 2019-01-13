import styled from 'src/themes/StyledComponents';

/** StyledComponents to create a styled input text. */
export const TextInput: any = styled.input`
  height: 35px;
  box-sizing: border-box;
  border: ${// tslint:disable-next-line: typedef
    (props: any) =>
      props.theme.borderSize} ${// tslint:disable-next-line: typedef
    (props: any) =>
      props.theme.borderStyle} ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.color.primary};
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.color.primary};
  padding: 0 ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.gutterSmall};
  :focus {
    outline: none;
  }
`;
