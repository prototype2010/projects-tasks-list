import { createReducer } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from '../store';
import { asyncAction } from 'lib/actions';
import { ProjectI } from '../../pages/projects/components/project/Project';

const initialState = {
  isLoading: false,
  projects: new Array<ProjectI>(),
};

export const fetchProjectsAction = asyncAction('projects/FETCH_PROJECT_ACTION');
export const createProjectAction = asyncAction('projects/CREATE_PROJECT_ACTION');
export const editProjectAction = asyncAction('projects/EDIT_PROJECT_ACTION');
export const deleteProjectAction = asyncAction('projects/DELETE_PROJECT_ACTION');
export const createTaskAction = asyncAction('tasks/CREATE_TASK');
export const editTaskAction = asyncAction('tasks/EDIT_TASK');
export const deleteTaskAction = asyncAction('tasks/DELETE_TASK');
export const prioritizeTaskAction = asyncAction('tasks/PRIORITIZE');

export const reducer = createReducer(initialState, {
  [fetchProjectsAction.request]: (draft) => {
    draft.isLoading = true;
  },

  [fetchProjectsAction.success]: (draft, { payload }) => {
    draft.isLoading = false;
    draft.projects = payload;
  },

  [fetchProjectsAction.failure]: (draft) => {
    draft.isLoading = false;
    draft.projects = initialState.projects;
  },
  [createProjectAction.request]: (draft) => {
    draft.isLoading = true;
  },
  [createProjectAction.success]: (draft, { payload }) => {
    draft.isLoading = false;
    draft.projects = [...draft.projects, payload];
  },
  [createProjectAction.failure]: (draft, { payload }) => {
    draft.isLoading = false;
    console.error(payload);
  },
  [editProjectAction.request]: (draft) => {
    draft.isLoading = true;
  },
  [editProjectAction.success]: (draft, { payload }) => {
    const newProjectsArray = draft.projects.slice();
    const indexOfProject = newProjectsArray.findIndex(({ id }) => id === payload.id);
    newProjectsArray[indexOfProject] = payload;

    draft.projects = newProjectsArray;
    draft.isLoading = false;
  },
  [editProjectAction.failure]: (draft, { payload }) => {
    draft.isLoading = false;
    console.error(payload);
  },
  [deleteProjectAction.request]: (draft) => {
    draft.isLoading = true;
  },
  [deleteProjectAction.success]: (draft, { payload }) => {
    draft.projects = draft.projects.filter(({ id }) => id !== payload.id);
    draft.isLoading = false;
  },
  [deleteProjectAction.failure]: (draft, { payload }) => {
    draft.isLoading = false;
    console.error(payload);
  },
  ////////////////////////////////////////////////////////////
  [createTaskAction.request]: (draft) => {
    draft.isLoading = true;
  },
  [createTaskAction.success]: (draft, { payload }) => {
    const { projectId } = payload;
    const project: ProjectI = draft.projects.find(({ id }) => id === projectId) as ProjectI;

    project.tasks = [...(project.tasks || []), payload];
    draft.isLoading = false;
  },
  [createTaskAction.failure]: (draft, { payload }) => {
    draft.isLoading = false;
    console.error(payload);
  },
  ////////////////////////////////////////////////////////////
  [editTaskAction.request]: (draft) => {
    draft.isLoading = true;
  },
  [editTaskAction.success]: (draft, { payload }) => {
    const { projectId, id: taskId } = payload;
    const project: ProjectI = draft.projects.find(({ id }) => id === projectId) as ProjectI;
    const tasks = project.tasks.slice();
    const taskIndex = tasks.findIndex(({ id }) => taskId === id);
    tasks.splice(taskIndex, 1, payload);

    project.tasks = [...tasks];
    draft.isLoading = false;
  },
  [editTaskAction.failure]: (draft, { payload }) => {
    draft.isLoading = false;
    console.error(payload);
  },
  ////////////////////////////////////////////////////////////
  [deleteTaskAction.request]: (draft) => {
    draft.isLoading = true;
  },
  [deleteTaskAction.success]: (draft, { payload }) => {
    const { projectId, id: taskId } = payload;
    const project: ProjectI = draft.projects.find(({ id }) => id === projectId) as ProjectI;

    project.tasks = project.tasks.filter(({ id }) => taskId !== id);
    draft.isLoading = false;
  },
  [deleteTaskAction.failure]: (draft, { payload }) => {
    draft.isLoading = false;
    console.error(payload);
  },
  //////////////////////////////////////////////////////////////
  [prioritizeTaskAction.request]: (draft) => {
    draft.isLoading = true;
  },
  [prioritizeTaskAction.success]: (draft, { payload }) => {
    const { tasks, projectId } = payload;

    const project: ProjectI = draft.projects.find(({ id }) => id === projectId) as ProjectI;

    project.tasks = [...tasks];

    draft.isLoading = false;
  },
  [prioritizeTaskAction.failure]: (draft, { payload }) => {
    draft.isLoading = false;
    console.error(payload);
  },
});

const reducerSelector = (state: RootState) => state.projects;
export const projectsSelector = createSelector(reducerSelector, (reducer) => reducer.projects);

export const isProjectsLoading = createSelector(reducerSelector, (reducer) => reducer.isLoading);

export default reducer;
