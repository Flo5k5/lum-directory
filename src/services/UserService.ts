import { IUser, MapApiResponseToUsers } from 'src/interfaces/IUser';
import CacheService from './CacheService';

/** Url of the current api used to generate random users for this application. */
const USERS_API_URL: string =
  'https://randomuser.me/api/?results=5000&seed=lumapps';

/** String used as a key in the CacheService to store or query items in the
 * local storage.
 */
const USERSERVICE_CACHE_KEY: string = 'users';

/**
 * Class used to handle users
 *
 * @export
 * @class UserService
 */
export default class UserService {
  private cacheService: CacheService<IUser>;
  /**
   * Creates an instance of UserService.
   * @memberof UserService
   */
  constructor() {
    this.cacheService = new CacheService(USERSERVICE_CACHE_KEY);
  }

  /**
   * Fetches all users from the api passed as argument if online, else
   * it will get users stored in the local storage.
   *
   * @memberof UserService
   */
  public fetchAll = async (): Promise<IUser[]> => {
    let results: any;

    try {
      if (navigator.onLine) {
        const response: Response = await fetch(USERS_API_URL);
        results = await response.json();
        const users: IUser[] = MapApiResponseToUsers(results);
        this.cacheService.setItems(users);
        return users;
      } else {
        // Fallback to cache if there is no network
        return this.cacheService.getItems();
      }
    } catch (error) {
      const users: IUser[] = this.cacheService.getItems();
      if (!!users) {
        return users;
      } else {
        throw new Error(`[Error]UserService.fetchAll : ${error}`);
      }
    }
  };
}
