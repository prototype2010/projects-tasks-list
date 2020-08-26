import React, { useCallback, useState } from 'react';
import { AnyPayload } from '../../../../lib/actions';

import { DeleteEntity } from '../project/DeleteEntity';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TaskI } from './Task';
import { deleteTaskAction } from 'store/projects/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    deleteIcon: {
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

export const DeleteTaskEntity: React.FC<OwnProps> = ({ task, projectId }) => {
  const { deleteIcon } = useStyles();

  const [isDeleteOpened, setDeleteOpened] = useState<boolean>(false);
  const openDeleteModal = useCallback(() => setDeleteOpened(true), []);

  return (
    <>
      <DeleteIcon data-testid={`delete-task-${task.name}`} onClick={openDeleteModal} className={deleteIcon} />

      <DeleteEntity
        title={'Delete task'}
        legend={'Are you sure to delete task '}
        editEntity={{
          ...task,
          projectId,
        }}
        isOpened={isDeleteOpened}
        setOpened={setDeleteOpened}
        reduxActionClosure={(payload: AnyPayload) => deleteTaskAction(payload)}
      />
    </>
  );
};
