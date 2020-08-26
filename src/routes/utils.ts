import { routes } from './routes';

export const getUrl = (key: string): string => {
  const allRoutes = [...routes.auth, ...routes.app];

  const desiredRoute = allRoutes.find((route) => route.key === key);

  if (!desiredRoute) {
    throw new Error(`Could find route : '${key}'`);
  }

  return desiredRoute.path;
};
