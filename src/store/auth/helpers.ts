import { ClientStorage } from 'lib/storage/Storage';

export const saveAuthTokenInStorage = (token: string) => ClientStorage.setItem('token', token);

export const removeAuthToken = () => ClientStorage.removeItem('token');

export function getAuthDataFromStorage() {
  const token = ClientStorage.getItem('token');

  return {
    token,
  };
}
