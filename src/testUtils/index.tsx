import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render as rtlRender, RenderResult, act } from '@testing-library/react';
import { waitFor, fireEvent } from '@testing-library/react';

import { ThemeProvider } from 'styled-components/macro';
import MaterialThemeProvider from '@material-ui/styles/ThemeProvider';
import { StylesProvider } from '@material-ui/core/styles';
import App from '../App';

import theme, { classNamesGenerator, GlobalStyles, materialTheme } from '../theme';
import { createStore } from '../store/store';
import { testCredentials } from './users';

function render(ui = App as any) {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  function Wrapper({ children: Children }: any) {
    return (
      <Router history={history}>
        <Provider store={createStore()}>
          <StylesProvider generateClassName={classNamesGenerator}>
            <MaterialThemeProvider theme={materialTheme}>
              <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Children />
              </ThemeProvider>
            </MaterialThemeProvider>
          </StylesProvider>
        </Provider>
      </Router>
    );
  }
  return {
    ...rtlRender(ui, { wrapper: Wrapper }),
    history,
  };
}

// re-export everything
export * from '@testing-library/react';

const clickElement = async (selector: any) => {
  await waitFor(() => selector);

  fireEvent.click(selector, { target: { button: 0 } });
};

const navigateViaSideMenu = async (app: RenderResult, path: Array<string>) => {
  for await (const menuPath of path) {
    await clickElement(app.getByTestId(menuPath));
  }
};

const makeInput = (selector: any, value: string) => {
  fireEvent.change(selector, { target: { value } });
};

const waitForAppToLoad = async ({ container }: RenderResult) => {
  return waitFor(() => null, { container });
};

const loginAs = async (app: RenderResult, { email, password }: testCredentials) => {
  const { getByText, getByLabelText, getByTestId } = app;

  await waitForAppToLoad(app);

  makeInput(getByLabelText('Email'), email);
  makeInput(getByLabelText('Password'), password);

  await clickElement(getByTestId('sign-in'));

  await waitForAppToLoad(app);

  await waitFor(() => getByText('SIMPLE TODO LISTS'));
};

export {
  render, // override render method
  clickElement,
  loginAs,
  makeInput,
  navigateViaSideMenu,
  waitForAppToLoad,
};
