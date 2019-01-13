import styled from 'src/themes/StyledComponents';

/** Style component to display a generic button that you can customize based
 * on the styled component theme.
 */
export const Button: any = styled('button')<{
  bgColor: string | undefined;
  adaptiveWidth: boolean;
}>`
  border: ${// tslint:disable-next-line: typedef
    (props: any) =>
      props.theme.borderSize} ${// tslint:disable-next-line: typedef
    (props: any) =>
      props.theme.borderStyle} ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.color.primary};
  height: 35px;
  text-align: center;
  cursor: pointer;
  background-color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorBackground};
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.color.primary};
  ${// tslint:disable-next-line: typedef
  (props: any): string => {
    if (props.adaptiveWidth) {
      return `padding: 0 ${props.theme.gutterSmall};`;
    } else {
      return 'width: 35px; padding: 0;';
    }
  }}

  :focus {
    outline: none;
  }

  &:disabled {
    color: ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.colorBackground};
    background-color: ${// tslint:disable-next-line: typedef
    (props: any) => props.theme.color.primary};
  }
`;
