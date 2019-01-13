import { COLOR } from 'src/interfaces/ColorType';
import { FONT_SIZE } from 'src/interfaces/FontSizeType';
import styled from 'src/themes/StyledComponents';

/**
 * Represents the properties object of the Span component.
 *
 * @interface ISpanProps
 */
interface ISpanProps {
  bold: boolean;
  color: COLOR;
  fontSize: FONT_SIZE;
  show: boolean;
}

/** Style component to format and display text in a span. Renderd text will be
 * bigger and bolder than normal text.
 */
export const Span: any = styled('span')<ISpanProps>`
  display: ${
    // tslint:disable-next-line: typedef
    (props: any) => (props.show ? 'block' : 'none')
  };
  color: ${
    // tslint:disable-next-line: typedef
    (props: any) => props.theme.color[props.color]
  };
  ${
    // tslint:disable-next-line: typedef
    (props: any) => (props.bold ? 'font-weight: bold;' : '')
  }
  font-size: ${
    // tslint:disable-next-line: typedef
    (props: any) => props.theme.fontSize[props.fontSize]
  };

  & a {
    color: ${
      // tslint:disable-next-line: typedef
      (props: any) => props.theme.color[props.color]
    };
  }
`;

/** Load a default property if it's ommited in the parent component. */
Span.defaultProps = {
  bold: false,
  color: 'primary',
  fontSize: 'medium',
  show: true,
};
