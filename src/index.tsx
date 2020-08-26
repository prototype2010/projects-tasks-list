import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import MaterialThemeProvider from '@material-ui/styles/ThemeProvider';
import { ThemeProvider } from 'styled-components/macro';
import { StylesProvider } from '@material-ui/core/styles';
import 'fontsource-roboto';

import App from './App';

import theme, { classNamesGenerator, GlobalStyles, materialTheme } from 'theme';
import { store } from './store/store';
import { BrowserRouter } from 'react-router-dom';

export const renderHMRApp = (Component: React.FC) => {
  /* eslint-disable-next-line */
  return ReactDOM.render(
    <Provider store={store}>
      <StylesProvider generateClassName={classNamesGenerator}>
        <MaterialThemeProvider theme={materialTheme}>
          <BrowserRouter>
            <ThemeProvider theme={theme}>
              <Component />
              <GlobalStyles />
            </ThemeProvider>
          </BrowserRouter>
        </MaterialThemeProvider>
      </StylesProvider>
    </Provider>,
    document.getElementById('root'),
  );
};

renderHMRApp(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    renderHMRApp(NextApp);
  });
}
