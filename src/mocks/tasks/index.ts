import { Route } from '../Route';
import RouteParser from 'route-parser';

export const createTask = new Route(
  'post',
  new RouteParser('/tasks/projects/:id'),

  (ids: any, params: any) => {
    const projectId = parseInt(ids.id);
    const { name } = JSON.parse(params);

    return [
      200,
      {
        deadline: null,
        id: 62,
        order: null,
        status: 'inProgress',
        projectId,
        name,
      },
    ];
  },
);

export const deleteTask = new Route(
  'delete',
  new RouteParser('/tasks/:taskId/projects/:projectId'),
  (ids: any, params: any) => [200, {}],
);

export const editTask = new Route(
  'put',
  new RouteParser('/tasks/:taskId/projects/:projectId'),
  (ids: any, params: any) => {
    return [200, { ...JSON.parse(params) }];
  },
);

export const applyTasksOrder = new Route('put', new RouteParser('/tasks/projects/:id'), ({ id }: any, params: any) => {
  return [200, JSON.parse(params).tasks];
});
