import './../helpers';
import { ILocation } from './ILocation';
import { ILogin } from './ILogin';
import { IRegistration } from './IRegistration';

/**
 * Interface used to describe user informations from randomuser.me API.
 *
 * @export
 * @interface IUser
 */
export interface IUser {
  age: number;
  cell: string;
  dob: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  largePicture: string;
  lastName: string;
  location: ILocation;
  login: ILogin;
  nat: string;
  phone: string;
  registration: IRegistration;
  title: string;
}

/**
 * Helper function to map the response object from randomuser.me API to
 * an array of IUser.
 *
 * @export
 * @param {*} jsonResponse
 * @returns {IUser[]}
 */
export function MapApiResponseToUsers(jsonResponse: any): IUser[] {
  return jsonResponse.results.map(
    (user: any): IUser => ({
      age: user.dob.age,
      cell: user.cell,
      dob: new Date(user.dob.date).toLocaleDateString(),
      email: user.email,
      firstName: (user.name.first as string).capitalizeFirstLetter(),
      gender: user.gender,
      id: user.login.uuid,
      largePicture: user.picture.large,
      lastName: (user.name.last as string).toLocaleUpperCase(),
      location: {
        ...user.location,
        city: (user.location.city as string).capitalizeFirstLetter(),
        state: (user.location.state as string).capitalizeFirstLetter(),
      },
      login: user.login,
      nat: user.nat,
      phone: user.phone,
      registration: {
        age: user.registered.age,
        date: new Date(user.registered.date).toLocaleDateString(),
      },
      title: (user.name.title as string).capitalizeFirstLetter(),
    })
  );
}
