import { takeEvery, call, put, select } from 'redux-saga/effects';
import { AnyPayload } from 'lib/actions';
import { Axios } from 'lib/http/HttpClient';
import {
  createTaskAction,
  deleteTaskAction,
  editTaskAction,
  prioritizeTaskAction,
  projectsSelector,
} from '../../reducer';
import { serializeErrors } from '../../../auth/sagas';
import { ProjectI } from 'pages/projects/components/project/Project';
import { TaskI } from '../../../../pages/projects/components/task/Task';

function* createTask({ payload }: AnyPayload) {
  try {
    const { projectId, name } = payload;

    const response = yield call(() => Axios.post(`/tasks/projects/${projectId}`, { name }));

    yield put({
      type: createTaskAction.success,
      payload: response.data,
    });
  } catch (e) {
    const errors = serializeErrors(e);

    yield put({
      type: createTaskAction.failure,
      payload: errors,
    });
  }
}

function* editProject({ payload }: AnyPayload) {
  try {
    const { id, projectId } = payload;

    const response = yield call(() => Axios.put(`/tasks/${id}/projects/${projectId}`, payload));

    yield put({
      type: editTaskAction.success,
      payload: response.data,
    });
  } catch (e) {
    const errors = serializeErrors(e);
    yield put({
      type: editTaskAction.failure,
      payload: errors,
    });
  }
}

function* deleteTask({ payload }: AnyPayload) {
  try {
    const { id, projectId } = payload;

    yield call(() => Axios.delete(`/tasks/${id}/projects/${projectId}`));
    yield put({
      type: deleteTaskAction.success,
      payload,
    });
  } catch (e) {
    const errors = serializeErrors(e);
    yield put({
      type: deleteTaskAction.failure,
      payload: errors,
    });
  }
}

function* prioritizeTask({ payload }: AnyPayload) {
  try {
    const { projectId, task, priorityDirection } = payload;
    const { id: taskId } = task;

    const projects: Array<ProjectI> = yield select(projectsSelector);
    const project: ProjectI = projects.find(({ id }) => id === projectId)!;
    const tasks: Array<TaskI> = project.tasks.slice();
    const taskToChangePosition: TaskI = tasks.find(({ id }) => id === taskId)!;
    const currentTaskIndex: number = tasks.findIndex((task) => task === taskToChangePosition);
    const nextTaskIndex: number = currentTaskIndex + priorityDirection;
    const taskToBeReplaced: TaskI = tasks[nextTaskIndex];

    if (
      tasks.length - 1 >= nextTaskIndex &&
      //
      nextTaskIndex >= 0
    ) {
      tasks[nextTaskIndex] = task;
      tasks[currentTaskIndex] = taskToBeReplaced;

      const tasksWithOrder: Array<TaskI> = tasks.map((item, index, array) => {
        return {
          ...item,
          order: array.length - index,
        };
      });

      const response = yield call(() =>
        Axios.put(`/tasks/projects/${projectId}`, {
          tasks: tasksWithOrder,
        }),
      );

      yield put({
        type: prioritizeTaskAction.success,
        payload: {
          tasks: response.data,
          projectId,
        },
      });
    } else {
      yield put({
        type: prioritizeTaskAction.failure,
      });
    }
  } catch (e) {
    console.error(e);

    yield put({
      type: prioritizeTaskAction.failure,
    });
  }
}

export default function* () {
  yield takeEvery(deleteTaskAction.request, deleteTask);
  yield takeEvery(createTaskAction.request, createTask);
  yield takeEvery(editTaskAction.request, editProject);
  yield takeEvery(prioritizeTaskAction.request, prioritizeTask);
}
