import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import styled from 'src/themes/StyledComponents';
import { Span } from './Span';

/** Contains loading animation and text.  */
const Loader: any = styled('div')<ILoadingProps>`
  display: ${// tslint:disable-next-line: typedef
  (props: any) => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 50%;
  left: 50%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  text-align: center;
  color: ${// tslint:disable-next-line: typedef
  (props: any) => props.theme.color.primary};
`;

/**
 * Represents the properties object of the Loading component.
 *
 * @interface ILoadingProps
 */
interface ILoadingProps {
  show?: boolean;
}

/**
 * Displays a loader if 'show' parameter is true.
 *
 * @param {ILoadingProps} props
 * @returns {JSX.Element}
 */
export const Loading: React.SFC<ILoadingProps> = (
  props: ILoadingProps
): JSX.Element => (
  <Loader show={props.show}>
    <FontAwesomeIcon icon='circle-notch' size='3x' spin={true} />
    <br />
    <br />
    <Span bold={true} fontSize={'large'}>
      Loading...
    </Span>
  </Loader>
);

/** Load a default property if it's ommited in the parent component. */
Loading.defaultProps = {
  show: false,
};
