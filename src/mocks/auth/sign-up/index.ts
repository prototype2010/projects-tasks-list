import { Route } from '../../Route';
import RouteParser from 'route-parser';

export const singUp = new Route('post', new RouteParser('/auth/signup'), () => [200, {}]);
