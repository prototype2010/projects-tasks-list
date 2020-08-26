import { Router } from './Router';
import { singIn } from './auth/sign-in';
import { singUp } from './auth/sign-up';
import { createTask, applyTasksOrder, deleteTask, editTask } from './tasks';
import { createProject, deleteProject, editProject, getProjects } from './projects';

export const mocksRouter = new Router(
  [
    singIn,
    singUp,
    createTask,
    applyTasksOrder,
    deleteTask,
    editTask,
    createProject,
    deleteProject,
    editProject,
    getProjects,
  ],
  [],
);

export default mocksRouter;
