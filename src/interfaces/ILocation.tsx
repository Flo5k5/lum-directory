import { ICoordinates } from './ICoordinates';
import { ITimeZone } from './ITimeZone';

/**
 * Interface used to describe location informations found in user informations from randomuser.me API.
 *
 * @export
 * @interface ILocation
 */
export interface ILocation {
  street: string;
  city: string;
  state: string;
  postcode: string;
  coordinates: ICoordinates;
  timezone: ITimeZone;
}
