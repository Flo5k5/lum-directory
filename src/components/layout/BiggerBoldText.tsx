import styled from 'src/themes/StyledComponents';

export const BiggerBoldText: any = styled.span`
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.colorFontSecondary};
  font-weight: bold;
  font-size: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.fontLarge};
  padding: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.gutterSmall};
`;
