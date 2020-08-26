import React, { useCallback } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormLabel } from '@material-ui/core';
import { AnyPayload } from 'lib/actions';
import { useDispatch } from 'react-redux';

export interface EntityWithDeadLine {
  id: number;
  name: string;
  deadline: string | null | undefined;
  [key: string]: any;
}

interface ProjectPropsI {
  editEntity: EntityWithDeadLine;
  reduxActionClosure: (props: AnyPayload) => void;
  isOpened: boolean;
  title: string;
  legend: string;
  setOpened: (openedState: boolean) => void;
}

export const DeleteEntity: React.FC<ProjectPropsI> = ({
  isOpened,
  title,
  legend,
  setOpened,
  editEntity,
  reduxActionClosure,
}) => {
  const { name, id, ...rest } = editEntity;

  const dispatch = useDispatch();

  const closeModal = useCallback(() => {
    setOpened(false);
  }, [setOpened]);

  const handleSubmit = useCallback(() => {
    const params: AnyPayload = {
      id,
    };

    dispatch(reduxActionClosure({ ...params, ...rest }));

    closeModal();
  }, [dispatch]);

  return (
    <Dialog
      open={isOpened}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <FormControl component="fieldset">
          <FormLabel component="legend">
            {legend} {name} ?
          </FormLabel>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button data-testid={'discard-delete'} onClick={closeModal} color="primary">
          Discard
        </Button>
        <Button data-testid={'proceed-delete'} onClick={handleSubmit} color="primary" autoFocus>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  );
};
