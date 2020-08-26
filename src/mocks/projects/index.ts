import { Route } from '../Route';
import RouteParser from 'route-parser';

export const createProject = new Route('post', new RouteParser('/projects'), (id, params: any) => {
  return [
    200,
    {
      ...JSON.parse(params),
      projectId: 94,
      userId: 118,
      id: Math.floor(Math.random()),
    },
  ];
});

export const deleteProject = new Route('delete', new RouteParser('/projects/:id'), () => [200, {}]);

export const editProject = new Route('put', new RouteParser('/projects/:id'), (id, requestChanges: any) => {
  return [
    200,
    {
      id: 94,
      name: 'GREAT PROJECT',
      userId: 118,
      deadline: null,
      tasks: [
        { id: 1, projectId: 94, name: '111111111', deadline: null, order: 3, status: 'inProgress' },
        { id: 2, projectId: 94, name: '222222222', deadline: null, order: 3, status: 'inProgress' },
      ],
      ...JSON.parse(requestChanges),
    },
  ];
});

export const getProjects = new Route('get', new RouteParser('/projects'), () => [
  200,
  [
    {
      id: 94,
      name: 'GREAT PROJECT',
      userId: 118,
      deadline: null,
      tasks: [
        { id: 1, projectId: 94, name: '111111111', deadline: null, order: 3, status: 'inProgress' },
        { id: 2, projectId: 94, name: '222222222', deadline: null, order: 3, status: 'inProgress' },
      ],
    },
  ],
]);
//
