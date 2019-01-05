import './../helpers';
import { ILocation } from './ILocation';

export interface IUser {
  email: string;
  firstName: string;
  gender: string;
  id: string;
  largePicture: string;
  lastName: string;
  location: ILocation;
  title: string;
}

export function MapApiResponseToUsers(jsonResponse: any): Promise<IUser[]> {
  return jsonResponse.results.map(
    (user: any): IUser => ({
      email: user.email,
      firstName: (user.name.first as string).capitalizeFirstLetter(),
      gender: user.gender,
      id: user.login.uuid,
      largePicture: user.picture.large,
      lastName: (user.name.last as string).toLocaleUpperCase(),
      location: { ...user.location },
      title: (user.name.title as string).capitalizeFirstLetter(),
    })
  );
}
