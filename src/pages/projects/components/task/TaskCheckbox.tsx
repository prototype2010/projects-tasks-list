import React from 'react';
import { TaskI, TaskStatus } from './Task';
import { Checkbox } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { editTaskAction } from 'store/projects/reducer';

interface OwnProps {
  task: TaskI;
  projectId: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      display: 'flex',
    },
    checkbox: {
      position: 'relative',
      zIndex: 2,
      '&::after': {
        width: 1,
        position: 'absolute',
        zIndex: 1,
        content: '""',
        display: 'inline',
        backgroundColor: 'lightgray',
        height: '100px',
        right: -3,
      },
      '&::before': {
        width: 1,
        position: 'absolute',
        zIndex: 1,
        content: '""',
        display: 'inline',
        backgroundColor: 'lightgray',
        height: '100px',
        right: 0,
      },
    },
  }),
);

export const TaskCheckbox: React.FC<OwnProps> = ({ task, projectId }) => {
  const dispatch = useDispatch();
  const { checkbox, container } = useStyles();

  const [checked, setChecked] = React.useState<boolean>(task.status === TaskStatus.DONE);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextTaskStatus = task.status === TaskStatus.DONE ? TaskStatus.IN_PROGRESS : TaskStatus.DONE;

    dispatch(
      editTaskAction({
        projectId,
        ...task,
        status: nextTaskStatus,
      }),
    );

    setChecked(event.target.checked);
  };

  return (
    <div className={container}>
      <Checkbox
        data-testid={`task-checkbox-${task.id}`}
        className={checkbox}
        checked={checked}
        color="primary"
        onChange={handleStatusChange}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </div>
  );
};
