import { ILocation } from './ILocation';

export interface IUser {
  id: string;
  gender: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  location: ILocation;
}

export function MapApiResponseToUsers(jsonResponse: any): Promise<IUser[]> {
  return jsonResponse.results.map(
    (user: any): IUser => ({
      email: user.email,
      firstName: user.name.first,
      gender: user.gender,
      id: user.login.uuid,
      lastName: user.name.last,
      location: { ...user.location },
      title: user.name.title,
    })
  );
}
