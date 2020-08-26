import { Route } from './Route';
import { AxiosRequestConfig, Method } from 'axios';

const validTokens: Array<string> = [];

export interface RouteMatchPair {
  method: Method;
  url: string;
}

export class Router {
  constructor(private readonly publicRoutes: Array<Route>, private readonly protectedRoutes: Array<Route>) {}

  isAuthorized(authToken: string) {
    return validTokens.includes(authToken);
  }

  getAllowedRoutesScope(authToken: string): Array<Route> {
    if (this.isAuthorized(authToken)) {
      return [...this.protectedRoutes, ...this.publicRoutes];
    } else {
      return this.publicRoutes;
    }
  }

  proceedRequest(request: AxiosRequestConfig) {
    const { headers, method, url } = request;
    const { Authorization: authToken } = headers;

    const allowedRoutes = this.getAllowedRoutesScope(authToken);

    const matchedRoute = allowedRoutes.find((route) => route.isMatches({ method, url } as RouteMatchPair));

    if (matchedRoute) {
      return matchedRoute.respond(request);
    } else {
      console.warn(`You are ${this.isAuthorized(authToken) ? 'authorized' : 'not authorized'}`);
      console.error(`No matched routes found by request info`);
      console.dir(request);

      return [500, 'No matched route found, see console for more details'];
    }
  }
}
