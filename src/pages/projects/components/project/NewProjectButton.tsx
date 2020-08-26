import React, { useCallback, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { EditProjectEntity } from './EditProjectEntity';
import { AnyPayload } from 'lib/actions';
import { createProjectAction } from 'store/projects/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      display: 'flex',
      padding: theme.spacing(2),
      margin: theme.spacing(3),
      border: `2px solid #2062a0`,
      borderRadius: 5,
      fontSize: 18,
      fontWeight: 900,
      color: 'white',
      justifyContent: 'space-around',
      alignItems: 'center',
      background: '#4c7eb6',
      '&:hover': {
        cursor: 'pointer',
      },
      '&:active': {
        transform: `translate(2px,2px)`,
      },
    },

    icon: {
      color: '#30486e',
    },
  }),
);

export const NewProjectButton = () => {
  const { button, icon } = useStyles();

  const [isOpened, setOpened] = useState<boolean>(false);
  const openModal = useCallback(() => setOpened(true), []);

  return (
    <>
      <button onClick={openModal} data-testid={'create-project'} className={button}>
        <AddIcon className={icon} /> Add TODO List
      </button>

      <EditProjectEntity
        editEntity={{
          id: 0,
          name: '',
          deadline: undefined,
        }}
        isOpened={isOpened}
        setOpened={setOpened}
        popupTitle={'Create new project'}
        popupLegend={'New Project'}
        reduxActionClosure={(payload: AnyPayload) => createProjectAction(payload)}
      />
    </>
  );
};
