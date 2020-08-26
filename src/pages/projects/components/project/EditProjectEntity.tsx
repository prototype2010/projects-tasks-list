import React, { useCallback, useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  TextField,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import moment from 'moment';
import { AnyPayload } from 'lib/actions';
import { useDispatch } from 'react-redux';
import { EntityWithDeadLine } from './DeleteEntity';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projectNameInput: {
      width: '100%',
      margin: theme.spacing(2),
    },

    checkbox: {
      marginRight: theme.spacing(3),
    },
    formGroup: {
      display: 'flex',
      justifyContent: 'column',
    },
  }),
);

interface ProjectPropsI {
  editEntity: EntityWithDeadLine;
  reduxActionClosure: (props: AnyPayload) => void;
  popupTitle: string;
  popupLegend: string;
  isOpened: boolean;
  setOpened: (openedState: boolean) => void;
}

export const EditProjectEntity: React.FC<ProjectPropsI> = ({
  isOpened,
  setOpened,
  editEntity,
  popupLegend,
  popupTitle,
  reduxActionClosure,
}) => {
  const { projectNameInput, formGroup, checkbox } = useStyles();
  const { deadline, name, id, ...rest } = editEntity;

  const dispatch = useDispatch();

  const [isDatePickerActive, setDatepickerState] = useState<boolean>(!!deadline);
  const [currentDeadline, setDeadline] = useState<Date>(deadline ? moment(deadline).toDate() : new Date());

  const [isProjectNameValid, setProjectNameValid] = useState<boolean>(false);
  const [projectValidationText, setProjectValidationText] = useState<string>();
  const [projectName, setProjectName] = useState<string>(name);

  const closeModal = useCallback(() => setOpened(false), []);
  const handleProjectNameChange = useCallback((event) => setProjectName(event.target.value), []);

  useEffect(() => {
    const trimmed = projectName.trim();

    if (trimmed.length < 4) {
      setProjectValidationText('Should be longer than 4 characters');
      setProjectNameValid(false);
    } else if (trimmed.length > 50) {
      setProjectValidationText('Should be shorter than 50 characters');
      setProjectNameValid(false);
    } else {
      setProjectValidationText('');
      setProjectNameValid(true);
    }
  }, [projectName, name]);

  const handleSubmit = useCallback(() => {
    const params: AnyPayload = {
      id,
      name: projectName,
    };

    if (isDatePickerActive) {
      params.deadline = currentDeadline.toISOString();
    } else {
      params.deadline = null;
    }
    dispatch(reduxActionClosure({ ...params, ...rest }));

    closeModal();
  }, [projectName, currentDeadline, isDatePickerActive, deadline, name, id]);

  return (
    <Dialog
      open={isOpened}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{popupTitle}</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">{popupLegend}</FormLabel>
          <FormGroup aria-label="position" className={formGroup} row>
            <FormControlLabel
              value="start"
              control={
                <Checkbox
                  checked={isDatePickerActive}
                  onChange={() => setDatepickerState(!isDatePickerActive)}
                  className={checkbox}
                  color="primary"
                />
              }
              label="Specify deadline"
              labelPlacement="start"
            />
            <DatePicker
              format={'DD/MM/yyyy'}
              value={currentDeadline}
              disabled={!isDatePickerActive}
              onChange={setDeadline as any}
            />

            <TextField
              className={projectNameInput}
              error={!isProjectNameValid}
              id="outlined-error-helper-text"
              label="Project name"
              data-testid={'entity-name-field'}
              value={projectName}
              onChange={handleProjectNameChange}
              helperText={projectValidationText}
              variant="outlined"
            />
          </FormGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button data-testid={'discard'} onClick={closeModal} color="primary">
          Discard
        </Button>
        <Button data-testid={'proceed'} disabled={!isProjectNameValid} onClick={handleSubmit} color="primary" autoFocus>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};
