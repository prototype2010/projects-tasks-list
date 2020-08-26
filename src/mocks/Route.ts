import { AxiosRequestConfig, Method } from 'axios';

import { RouteMatchPair } from './Router';

interface ObjectWithParams {
  [key: string]: string | number | ObjectWithParams;
}

type Response = [number, any, any?];

type Responder = (parsedParams: ObjectWithParams, requestData?: ObjectWithParams) => Response;

interface RouteParserI {
  match(url: string): ObjectWithParams | boolean;
}

export class Route {
  constructor(
    private readonly method: Method,
    private readonly route: RouteParserI,
    private readonly responder: Responder,
  ) {}

  matchesByMethod(method: Method) {
    return new RegExp(`${this.method}`, 'i').test(method);
  }

  matchesByEndpoint(url: string): boolean {
    return !!this.route.match(url);
  }

  isMatches({ method, url }: RouteMatchPair) {
    return this.matchesByEndpoint(url) && this.matchesByMethod(method);
  }

  respond(request: AxiosRequestConfig): Response {
    const { data, url } = request;

    const params = this.route.match(url as string) as ObjectWithParams;

    return this.responder(params, data);
  }
}
