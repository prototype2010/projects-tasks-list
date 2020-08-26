import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TaskCheckbox } from './TaskCheckbox';
import { EditTaskEntity } from './EditTaskEntity';
import { DeleteTaskEntity } from './DeleteTaskEntity';
import { TaskPriorityControls } from './TaskPriorityControls';

export enum TaskStatus {
  IN_PROGRESS = 'inProgress',
  DONE = 'done',
}

export interface TaskI {
  id: number;
  name: string;
  deadline: string | null;
  order: number;
  status: TaskStatus;
}

interface OwnProps {
  task: TaskI;
  projectId: number;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      display: 'flex',
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      alignItems: 'center',
      background: '#ffffff',
      '&:hover': {
        background: '#fcfed5',
        cursor: 'pointer',
        '& div:last-child': {
          display: 'flex',
        },
      },
      '&:last-child': {
        borderRadius: `0 0 15px 15px`,
      },
    },
    iconsContainer: {
      display: 'flex',
      flexDirection: 'row',
      position: 'absolute',
      alignItems: 'center',
      right: 10,

      '&:last-child': {
        //display: 'none', // TODO UNCOMMENT THIS
      },
    },
    iconContainer: {
      height: `50px`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      marginRight: theme.spacing(2),
      '&::after': {
        width: 1,
        position: 'absolute',
        zIndex: 2,
        content: '""',
        display: 'block',
        backgroundColor: 'lightgray',
        height: '25px',
        right: -theme.spacing(1),
      },
      '&:last-child::after': {
        display: 'none',
      },
    },
    editIcon: {
      color: '#98b0d2',
      width: 24,
      height: 24,
    },
    deleteIcon: {
      color: '#98b0d2',
      width: 24,
      height: 24,
    },
    taskNameContainer: {
      color: '#a2a2a2',
      fontSize: 18,
      fontWeight: 600,
      marginLeft: theme.spacing(2),
    },
  }),
);

export const Task: React.FC<OwnProps> = ({ task, projectId }) => {
  const { container, taskNameContainer, iconsContainer, iconContainer } = useStyles();

  return (
    <div className={container}>
      <TaskCheckbox task={task} projectId={projectId} />
      <div className={taskNameContainer}>{task.name}</div>
      <div className={iconsContainer}>
        <div className={iconContainer}>
          <TaskPriorityControls task={task} projectId={projectId} />
        </div>
        <div className={iconContainer}>
          <EditTaskEntity task={task} projectId={projectId} />
        </div>
        <div className={iconContainer}>
          <DeleteTaskEntity task={task} projectId={projectId} />
        </div>
      </div>
    </div>
  );
};
