import { ColorType } from './ColorType';
import { FontSizeType } from './FontSizeType';

/**
 * Interface used to describe theme object used in styled-components.
 *
 * @export
 * @interface IThemeInterface
 */
export default interface IThemeInterface {
  borderSize: string;
  borderStyle: string;
  color: ColorType;
  colorBackground: string;
  fontFamily: string;
  fontSize: FontSizeType;
  gutterLarge: string;
  gutterMedium: string;
  gutterSmall: string;
}
