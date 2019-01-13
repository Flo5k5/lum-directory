/**
 * Class used to abstract the storage layer. Currently it stores items in
 * the local storage.
 *
 * @export
 * @class CacheService
 * @template T
 */
export default class CacheService<T> {
  /**
   * String used as a key to differentiate stored items in the local storage.
   *
   * @private
   * @type {string}
   * @memberof CacheService
   */
  private cacheKey: string;

  /**
   * Creates an instance of CacheService.
   * @param {string} cacheKey
   * @memberof CacheService
   */
  constructor(cacheKey: string) {
    this.cacheKey = cacheKey;
  }

  /**
   * Gets items stored in the local storage.
   *
   * @returns {T[]}
   * @memberof CacheService
   */
  public getItems(): T[] {
    const storedItems: string | null = localStorage.getItem(this.cacheKey);
    if (!!storedItems) {
      // tslint:disable-next-line: no-console
      console.info(
        `[info]CacheService.getItems: get ${this.cacheKey} from cache.`
      );
      return JSON.parse(storedItems);
    } else {
      return [];
    }
  }

  /**
   * Stores items in the local storage.
   *
   * @param {T[]} items
   * @memberof CacheService
   */
  public setItems(items: T[]): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(items));
  }
}
