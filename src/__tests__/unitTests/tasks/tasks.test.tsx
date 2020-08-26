import { render, cleanup, loginAs, waitForAppToLoad, clickElement, makeInput } from '../../../testUtils';
import { RenderResult, waitFor } from '@testing-library/react';
import { generalUserCredentials } from '../../../testUtils/users';

let app: RenderResult;

beforeEach(async () => {
  app = render();
  await loginAs(app, generalUserCredentials);
  await waitForAppToLoad(app);
});

afterEach(cleanup);

describe('projects', () => {
  it('Can be created', async () => {
    const { getByTestId, getByText, getByLabelText } = app;

    await clickElement(getByTestId('create-project'));

    const projectName = 'AWESOME PROJECT';

    await waitFor(() => getByText('Create new project'));
    await makeInput(getByLabelText('Project name'), projectName);
    await clickElement(getByTestId('proceed'));

    await waitFor(() => getByText(projectName));

    expect(app).toMatchSnapshot();
  });

  it('Can be deleted', async () => {
    const { getByTestId } = app;

    await clickElement(getByTestId('delete-project-94'));
    await clickElement(getByTestId('proceed-delete'));

    expect(app).toMatchSnapshot();
  });

  it('Can be edited', async () => {
    const { getByTestId, getByText, getByLabelText } = app;

    const newProjectName = 'NEW AWESOME NAME';

    await clickElement(getByTestId('edit-project-94'));
    await makeInput(getByLabelText('Project name'), newProjectName);
    await clickElement(getByTestId('proceed'));

    await waitFor(() => getByText(newProjectName));

    expect(app).toMatchSnapshot();
  });

  it('Can be prioritized', async () => {
    const { getByTestId } = app;

    await clickElement(getByTestId('add-priority-for-task-2'));
    expect(app).toMatchSnapshot();
  });
});
