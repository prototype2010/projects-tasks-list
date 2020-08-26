import { Route } from '../../Route';
import RouteParser from 'route-parser';

export const singIn = new Route('post', new RouteParser('/auth/signin'), () => [200, { token: 'TEST_TOKEN' }, {}]);
