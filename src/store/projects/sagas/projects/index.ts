import { takeEvery, call, put } from 'redux-saga/effects';
import { Axios } from 'lib/http/HttpClient';
import { createProjectAction, deleteProjectAction, editProjectAction, fetchProjectsAction } from '../../reducer';
import { serializeErrors } from '../../../auth/sagas';
import { AnyPayload } from 'lib/actions';

function* getProjects() {
  try {
    const response = yield call(() => Axios.get('/projects'));

    yield put({
      type: fetchProjectsAction.success,
      payload: response.data,
    });
  } catch (e) {
    const errors = serializeErrors(e);
    yield put({
      type: fetchProjectsAction.failure,
      payload: errors,
    });
  }
}

function* createProject({ payload }: AnyPayload) {
  try {
    const response = yield call(() => Axios.post('/projects', payload));

    yield put({
      type: createProjectAction.success,
      payload: response.data,
    });
  } catch (e) {
    const errors = serializeErrors(e);
    yield put({
      type: createProjectAction.failure,
      payload: errors,
    });
  }
}

function* editProject({ payload }: AnyPayload) {
  try {
    const { id } = payload;

    const response = yield call(() => Axios.put(`/projects/${id}`, payload));

    yield put({
      type: editProjectAction.success,
      payload: response.data,
    });
  } catch (e) {
    const errors = serializeErrors(e);
    yield put({
      type: editProjectAction.failure,
      payload: errors,
    });
  }
}

function* deleteProject({ payload }: AnyPayload) {
  try {
    const { id } = payload;

    yield call(() => Axios.delete(`/projects/${id}`));

    yield put({
      type: deleteProjectAction.success,
      payload,
    });
  } catch (e) {
    const errors = serializeErrors(e);
    yield put({
      type: deleteProjectAction.failure,
      payload: errors,
    });
  }
}

export default function* () {
  yield takeEvery(fetchProjectsAction.request, getProjects);
  yield takeEvery(editProjectAction.request, editProject);
  yield takeEvery(createProjectAction.request, createProject);
  yield takeEvery(deleteProjectAction.request, deleteProject);
}
