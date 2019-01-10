/**
 *
 *
 * @export
 * @class CacheService
 * @template T
 */
export default class CacheService<T> {
  /**
   *
   *
   * @type {T[]}
   * @memberof CacheService
   */
  public items: T[];

  /**
   *
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
    this.items = this.getItems();
  }

  /**
   *
   *
   * @returns {T[]}
   * @memberof CacheService
   */
  public getItems(): T[] {
    const storedItems: string | null = localStorage.getItem(this.cacheKey);
    if (!!storedItems) {
      return JSON.parse(storedItems);
    } else {
      return [];
    }
  }

  /**
   *
   *
   * @param {T[]} items
   * @memberof CacheService
   */
  public setItems(items: T[]): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(items));
  }

  /**
   *
   *
   * @param {T[]} items
   * @returns {T[]}
   * @memberof CacheService
   */
  public getOrUpdateItems(items: T[]): T[] {
    const storedItems: string | null = localStorage.getItem(this.cacheKey);
    if (!!storedItems) {
      return JSON.parse(storedItems);
    } else {
      localStorage.setItem(this.cacheKey, JSON.stringify(items));
      return items;
    }
  }
}
