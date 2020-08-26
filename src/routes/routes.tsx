import { lazy } from 'react';

const SignIn = lazy(() => import('pages/auth/signIn/SignIn'));
const SignUp = lazy(() => import('pages/auth/signUp/SignUp'));
const Projects = lazy(() => import('pages/projects'));

export const routes = {
  app: [
    {
      path: '/my-projects',
      key: 'my-projects',
      component: Projects,
    },
  ],
  auth: [
    {
      path: '/sign-in',
      key: 'signIn',
      component: SignIn,
    },
    {
      path: '/sign-up',
      key: 'signUp',
      component: SignUp,
    },
  ],
};
