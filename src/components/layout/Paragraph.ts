import styled from 'src/themes/StyledComponents';

/** Styled component that wraps and styles a paragraph of text. */
export const Paragraph: any = styled.div`
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.color.primary};
`;
