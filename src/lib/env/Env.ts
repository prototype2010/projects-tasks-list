export enum EnvVars {
  API_URL = 'REACT_APP_API_URL',
  STORAGE_TYPE = 'REACT_APP_STORAGE_TYPE',
  MODE = 'REACT_APP_MODE',
}

export enum AppMode {
  DEV = 'development',
  TEST = 'testing',
  PROD = 'production',
}

class Env {
  /* eslint-disable */
  private constructor() {}
  /* eslint-enable */

  static getInstance() {
    return new Env();
  }

  getItem(key: EnvVars) {
    return process.env[key];
  }
}

const instance = Env.getInstance();

export { instance as Env };
