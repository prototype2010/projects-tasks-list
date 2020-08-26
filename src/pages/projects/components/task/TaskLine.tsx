import React, { useCallback, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import { ProjectI } from '../project/Project';
import { createTaskAction } from '../../../../store/projects/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      position: 'relative',
      zIndex: 2,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      // borderRadius: `0 0 15px 15px`,
      alignItems: 'center',
      padding: theme.spacing(3),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      backgroundColor: '#d5d5d5',
      height: 64,
    },
    addIcon: {
      color: '#5c9072',
      width: 30,
      height: 30,
    },
    addButton: {
      height: 40,
      width: `15%`,
      borderRadius: `0px 7px 7px 0px`,
      color: 'white',
      backgroundColor: '#5c9072',
      border: `1px solid gray`,
      borderLeft: 'none',
    },
    inputContainer: {
      display: 'flex',
      width: `100%`,
      height: 40,
    },
    input: {
      width: `85%`,
      height: 40,
      lineHeight: 30,
      padding: theme.spacing(1),
      paddingLeft: theme.spacing(2),
      fontSize: 18,
      border: `1px solid gray`,
    },
  }),
);

interface TaskLineI {
  project: ProjectI;
}

export const TaskLine: React.FC<TaskLineI> = ({ project }) => {
  const { container, addButton, input, inputContainer, addIcon } = useStyles();
  const dispatch = useDispatch();

  const [warningText, setWarningText] = useState<string>('');
  const [isWarningTextShown, setWarningTextShown] = useState<boolean>(false);
  const [isNameValid, setNameIsValid] = useState<boolean>(false);

  const [taskName, setTaskName] = useState<string>('');

  const closeSnack = useCallback(() => setWarningTextShown(false), []);
  const handleTaskCreate = useCallback(() => {
    if (isNameValid) {
      dispatch(
        createTaskAction({
          name: taskName,
          projectId: project.id,
        }),
      );

      setTaskName('');
      setWarningText('');
      setWarningTextShown(false);
      setNameIsValid(false);
    } else {
      setWarningTextShown(true);
    }
  }, [taskName, isNameValid, isWarningTextShown, warningText, dispatch]);

  useEffect(() => {
    if (taskName.length < 6) {
      setWarningText('Task name cannot be less than 6 characters');
      setNameIsValid(false);
    } else if (taskName.length > 30) {
      setWarningText('Task name cannot be longer than 30 characters');
      setNameIsValid(false);
    } else {
      setWarningText('');
      setWarningTextShown(false);
      setNameIsValid(true);
    }
  }, [taskName]);

  return (
    <div className={container}>
      <Snackbar
        open={isWarningTextShown}
        autoHideDuration={6000}
        onClose={closeSnack}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={closeSnack} severity="error">
          {warningText}
        </Alert>
      </Snackbar>

      <AddIcon onClick={handleTaskCreate} className={addIcon} />
      <div className={inputContainer}>
        <input
          data-testid={`project-input-${project.id}`}
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          placeholder={'Start typing here to create a new task...'}
          className={input}
        />
        <button data-testid={`add-task-for-project-${project.id}`} onClick={handleTaskCreate} className={addButton}>
          Add Task
        </button>
      </div>
    </div>
  );
};
