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

describe('Tasks', () => {
  it('Can be created', async () => {
    const { getByTestId, getByPlaceholderText } = app;

    const taskName = 'GREAT_TASK_#';
    await makeInput(getByPlaceholderText('Start typing here to create a new task...'), taskName);

    await clickElement(getByTestId('add-task-for-project-94'));

    await waitFor(() => getByTestId(`delete-task-${taskName}`));

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
});
