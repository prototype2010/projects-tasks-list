import React, { useCallback, useState } from 'react';
import CreateIcon from '@material-ui/icons/Create';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { EditProjectEntity } from '../project/EditProjectEntity';
import { AnyPayload } from '../../../../lib/actions';
import { TaskI } from './Task';
import { editTaskAction } from 'store/projects/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    editIcon: {
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

export const EditTaskEntity: React.FC<OwnProps> = ({ projectId, task }) => {
  const { editIcon } = useStyles();

  const [isOpened, setOpened] = useState<boolean>(false);
  const openModal = useCallback(() => setOpened(true), []);

  return (
    <>
      <CreateIcon data-testid={`edit-task-${task.id}`} onClick={openModal} className={editIcon} />

      <EditProjectEntity
        editEntity={{
          ...task,
          projectId,
        }}
        isOpened={isOpened}
        setOpened={setOpened}
        popupTitle={'Edit existing task'}
        popupLegend={`Edit task ${task.id}`}
        reduxActionClosure={(payload: AnyPayload) => editTaskAction(payload)}
      />
    </>
  );
};
