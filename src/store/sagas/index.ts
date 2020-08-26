import { all, fork } from 'redux-saga/effects';

import auth from '../auth/sagas';
import projects from '../projects/sagas/projects';
import tasks from '../projects/sagas/tasks';

export function* rootSaga() {
  yield all([fork(tasks), fork(auth), fork(projects)]);
}
