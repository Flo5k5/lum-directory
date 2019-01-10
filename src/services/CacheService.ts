export default class CacheService<T> {
  public items: T[];
  private cacheKey: string;

  constructor(cacheKey: string) {
    this.cacheKey = cacheKey;
    this.items = this.getItems();
  }

  public getItems(): T[] {
    const storedItems: string | null = localStorage.getItem(this.cacheKey);
    if (!!storedItems) {
      return JSON.parse(storedItems);
    } else {
      return [];
    }
  }

  public setItems(items: T[]): void {
    localStorage.setItem(this.cacheKey, JSON.stringify(items));
  }

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
