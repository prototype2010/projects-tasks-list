import React, { useCallback } from 'react';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TaskI } from './Task';
import { useDispatch } from 'react-redux';
import { prioritizeTaskAction } from '../../../../store/projects/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    icon: {
      color: '#98b0d2',
      width: 24,
      height: 24,
    },
  }),
);

interface OwnProps {
  task: TaskI;
  projectId: number;
}

export const TaskPriorityControls: React.FC<OwnProps> = ({ task, projectId }) => {
  const { container, icon } = useStyles();

  const dispatch = useDispatch();

  const handlePriorityChange = useCallback(
    (priorityDirection: number) => () =>
      dispatch(
        prioritizeTaskAction({
          task,
          projectId,
          priorityDirection,
        }),
      ),
    [task, projectId, dispatch],
  );

  return (
    <div className={container}>
      <ArrowUpwardIcon
        className={icon}
        data-testid={`add-priority-for-task-${task.id}`}
        onClick={handlePriorityChange(-1)}
      />
      <ArrowDownwardIcon
        className={icon}
        data-testid={`decrease-priority-for-task-${task.id}`}
        onClick={handlePriorityChange(1)}
      />
    </div>
  );
};
