import React from 'react';
import { ProjectI } from '../project/Project';
import { Task, TaskI } from './Task';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tasksOuterContainer: {
      backgroundColor: 'white',
      borderRadius: `0 0 15px 15px`,
      overflow: 'hidden',
    },
    noTasksMessage: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
      textAlign: 'center',
    },
  }),
);

interface TasksContainerI {
  project: ProjectI;
}

export const TasksContainer: React.FC<TasksContainerI> = ({ project }) => {
  const { tasksOuterContainer, noTasksMessage } = useStyles();
  const { id, tasks = [] } = project;

  return (
    <div className={tasksOuterContainer}>
      {tasks.length === 0 ? (
        <div className={noTasksMessage}>No tasks yet</div>
      ) : (
        tasks.map((task: TaskI) => <Task task={task} key={task.id} projectId={id} />)
      )}
    </div>
  );
};
