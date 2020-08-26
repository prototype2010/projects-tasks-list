import { render, cleanup, loginAs, clickElement, waitForAppToLoad, makeInput, waitFor } from '../../../testUtils';
import { RenderResult } from '@testing-library/react';
import { generalUserCredentials } from '../../../testUtils/users';

let app: RenderResult;

beforeEach(() => {
  app = render();
});

afterEach(cleanup);

describe('Auth tests', () => {
  it('can login', async () => {
    await loginAs(app, generalUserCredentials);

    expect(app).toMatchSnapshot();
  });

  it('can sign up', async () => {
    const { getByTestId, getByText, getByLabelText } = app;

    await clickElement(getByTestId('to-sing-up'));

    await waitForAppToLoad(app);

    const email = 'alex.zakorko2222@gmail.com';
    const password = 'alex.zakorko';

    makeInput(getByLabelText('Email'), email);
    makeInput(getByLabelText('Password'), password);
    makeInput(getByLabelText('Confirm password'), password);

    await clickElement(getByTestId('sign-up'));

    await waitForAppToLoad(app);

    await waitFor(() => getByText('Sign In'));

    expect(app).toMatchSnapshot();
  });
});
