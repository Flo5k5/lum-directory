import { IUser, MapApiResponseToUsers } from 'src/interfaces/IUser';
import CacheService from './CacheService';

const USERS_API_URL: string =
  'https://randomuser.me/api/?results=5000&seed=lumapps';
const USERSERVICE_CACHE_KEY: string = 'users';

export default class UserService {
  private cacheService: CacheService<IUser>;
  constructor() {
    this.cacheService = new CacheService(USERSERVICE_CACHE_KEY);
  }
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
        return this.cacheService.items;
      }
    } catch (error) {
      throw new Error(`[Error]UserService.fetchAll : ${error}`);
    }
  };
}
