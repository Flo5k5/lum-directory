import { ICoordinates } from './ICoordinates';
import { ITimeZone } from './ITimeZone';

export interface ILocation {
  street: string;
  city: string;
  state: string;
  postcode: string;
  coordinates: ICoordinates;
  timezone: ITimeZone;
}
