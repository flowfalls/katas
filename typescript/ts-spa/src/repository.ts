interface Item {
  key: string,
  value?: any;
}

export class Repository {

  browserStorageAvailable: boolean = false;
  private static instance: Repository;

  private constructor() {
  }

  public static getInstance(): Repository {
    if (!Repository.instance) {
      Repository.instance = new Repository();
      Repository.instance.browserStorageAvailable = typeof window !== "undefined" && window.localStorage !== undefined;
    }
    return Repository.instance;
  }

  private items: Item[] = [];

  public persistData(key: string, value: any): void {
    if (this.browserStorageAvailable) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  public getData(key: string): any {
    const item = this.items.find(item => item.key === key);
    return item ? item.value : null;
  }

  public purgeData(key: string): void {
    const item = this.items.find(item => item.key === key);
    if (item) {
      this.items.splice(this.items.indexOf(item), 1);
    }
  }


}
