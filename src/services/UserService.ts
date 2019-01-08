import { IUser, MapApiResponseToUsers } from 'src/interfaces/IUser';

const USERS_API_URL: string =
  'https://randomuser.me/api/?results=5000&seed=lumapps';

export class UserService {
  public static fetchAll = (): Promise<IUser[]> => {
    return fetch(USERS_API_URL)
      .then((response: Response) => {
        if (response.status === 200) {
          return response
            .json()
            .then((results: IUser[]) => MapApiResponseToUsers(results));
        } else {
          throw new Error(
            `[Error]UserService.fetchAll : ${response.status} - ${
              response.statusText
            }`
          );
        }
      })
      .catch((error: any) => {
        throw new Error(`[Error]UserService.fetchAll : ${error}`);
      });
  };
}
