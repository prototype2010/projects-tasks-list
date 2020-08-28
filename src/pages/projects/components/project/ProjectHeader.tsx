import React, { useCallback, useState } from 'react';
import EventNoteIcon from '@material-ui/icons/EventNote';
import CreateIcon from '@material-ui/icons/Create';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { EditProjectEntity } from './EditProjectEntity';
import { AnyPayload } from 'lib/actions';
import { DeleteEntity } from './DeleteEntity';
import { deleteProjectAction, editProjectAction } from 'store/projects/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projectHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      height: theme.spacing(7),
      padding: theme.spacing(2),
      background: '#4570b2',
    },

    calendarIcon: {
      width: 30,
      height: 30,
      color: '#1f2b3c',
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
    centeredContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    removeIcon: {
      color: '#98b0d2',
      transform: `rotate(90deg)`,
      '&:active': {
        transform: `translate(0px,0px), rotate(45deg) !important`,
      },
    },
    projectNameContainer: {
      color: '#eef0f2',
      fontSize: 18,
      fontWeight: 600,
      marginLeft: theme.spacing(2),
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
        backgroundColor: '#87a2ca',
        height: '25px',
        right: -theme.spacing(1),
      },
      '&:last-child': {
        marginRight: theme.spacing(0),
        '&::after': {
          display: 'none',
        },
      },
    },
  }),
);

interface ProjectHeaderI {
  name: string;
  deadline: string;
  id: number;
}

export const ProjectHeader: React.FC<ProjectHeaderI> = ({ name, id, deadline }) => {
  const {
    projectNameContainer,
    projectHeader,
    calendarIcon,
    editIcon,
    deleteIcon,
    centeredContainer,
    iconContainer,
  } = useStyles();

  const [isEditOpened, setEditOpened] = useState<boolean>(false);
  const [isDeleteOpened, setDeleteOpened] = useState<boolean>(false);
  const openEditModal = useCallback(() => setEditOpened(true), []);
  const openDeleteModal = useCallback(() => setDeleteOpened(true), []);

  return (
    <div className={projectHeader}>
      <span className={centeredContainer}>
        <EventNoteIcon onClick={openEditModal} className={calendarIcon} />
        <span className={projectNameContainer}>{name}</span>
      </span>

      <span className={centeredContainer}>
        <div className={iconContainer}>
          <CreateIcon data-testid={`edit-project-${id}`} onClick={openEditModal} className={editIcon} />
        </div>
        <div className={iconContainer}>
          <DeleteIcon data-testid={`delete-project-${id}`} onClick={openDeleteModal} className={deleteIcon} />
        </div>
      </span>

      <DeleteEntity
        title={'Delete project'}
        legend={'Are you sure to delete project '}
        editEntity={{
          id,
          name,
          deadline,
        }}
        isOpened={isDeleteOpened}
        setOpened={setDeleteOpened}
        reduxActionClosure={(payload: AnyPayload) => deleteProjectAction(payload)}
      />

      <EditProjectEntity
        editEntity={{
          id,
          name,
          deadline,
        }}
        isOpened={isEditOpened}
        setOpened={setEditOpened}
        popupTitle={`Edit existing project`}
        popupLegend={`Edit project ${id}`}
        reduxActionClosure={(payload: AnyPayload) => editProjectAction(payload)}
      />
    </div>
  );
};
