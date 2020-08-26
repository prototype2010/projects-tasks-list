import { EnvVars } from 'lib/env/Env';

enum ClientStorageTypes {
  localStorage = 'localStorage',
  sessionStorage = 'sessionStorage',
}

export type ClientStorageItems = 'token';

class ClientStorage {
  readonly storage: Storage | null = null;

  private constructor(private readonly storageType = process.env[EnvVars.STORAGE_TYPE]) {
    if (storageType === ClientStorageTypes.localStorage) {
      this.storage = localStorage;
    } else if (storageType === ClientStorageTypes.sessionStorage) {
      this.storage = sessionStorage;
    } else {
      throw new Error(
        `Storage type should be one of ${ClientStorageTypes.sessionStorage}, ${ClientStorageTypes.localStorage}, but ${storageType} provided`,
      );
    }
  }

  public static getInstance() {
    return new ClientStorage();
  }

  getItem(key: ClientStorageItems): string | null | undefined {
    return this.storage?.getItem(key);
  }

  setItem(key: ClientStorageItems, value: string): void {
    if (!value || value === 'null' || value === 'undefined') {
      return this.removeItem(key);
    }

    return this.storage?.setItem(key, value);
  }

  removeItem(key: ClientStorageItems): void {
    return this.storage?.removeItem(key);
  }

  clear = () => {
    this.storage?.clear();
  };
}

const instance = ClientStorage.getInstance();

export { instance as ClientStorage };
