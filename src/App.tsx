import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import MainLayout from 'components/Layout/MainLayout';
import { Loader } from 'components/loader/ScreenLoader';
import { useSelector } from 'react-redux';
import { authIsAuthorizedSelector } from './store/auth/reducer';
import { getUrl } from './routes/utils';
import SignIn from './pages/auth/signIn/SignIn';
import SignUp from './pages/auth/signUp/SignUp';
import DataPage from './pages/projects';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

export const App = () => {
  const isAuthorized = useSelector(authIsAuthorizedSelector);

  return (
    <>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <MainLayout>
          <Suspense
            fallback={
              <Suspense fallback={<div />}>
                <Loader />
              </Suspense>
            }
          >
            <Switch>
              {isAuthorized && (
                <>
                  <Route path={'/my-projects'} key={'my-projects'} component={DataPage} />
                  <Redirect
                    to={{
                      pathname: getUrl('my-projects'),
                    }}
                  />
                </>
              )}

              <Route path={'/sign-up'} key={'sign-up'} component={SignUp} />
              <Route path={'/sign-in'} key={'sign-in'} component={SignIn} />
              <Redirect
                to={{
                  pathname: getUrl('signIn'),
                }}
              />
            </Switch>
          </Suspense>
        </MainLayout>
      </MuiPickersUtilsProvider>
    </>
  );
};

export default App;
