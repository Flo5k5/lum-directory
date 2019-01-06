import { IUser, MapApiResponseToUsers } from 'src/interfaces/IUser';

const USERS_API_URL = 'https://randomuser.me/api/?results=1000&seed=lumapps';

export class UserService {
  public static fetchAll = (): Promise<IUser[]> => {
    return fetch(USERS_API_URL)
      .then((response) => {
        if (response.status === 200) {
          return response
            .json()
            .then((results) => MapApiResponseToUsers(results));
        } else {
          throw new Error(
            `[Error]UserService.fetchAll : ${response.status} - ${
              response.statusText
            }`
          );
        }
      })
      .catch((error) => {
        throw new Error(`[Error]UserService.fetchAll : ${error}`);
      });
  };
}
