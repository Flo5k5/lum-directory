import styled from 'src/themes/styled-components';

export const Button: any = styled('button')<{
  bgColor: string | undefined;
  adaptiveWidth: boolean;
}>`
  border: 1px solid lightgray;
  height: 35px;
  text-align: center;
  cursor: pointer;
  background-color: white;
  color: lightgray;
  ${// tslint:disable-next-line: typedef
  (props: any): string => {
    if (props.adaptiveWidth) {
      return 'padding: 0 5px;';
    } else {
      return 'width: 35px; padding: 0;';
    }
  }}

  :focus {
    outline: none;
  }

  &:disabled {
    color: white;
    background-color: lightgray;
  }
`;
