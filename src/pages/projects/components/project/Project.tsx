import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { ProjectHeader } from './ProjectHeader';
import { TaskLine } from '../task/TaskLine';
import { TasksContainer } from '../task/TasksContainer';
import { TaskI } from '../task/Task';

export interface ProjectI {
  id: number;
  name: string;
  deadline?: string;
  tasks: Array<TaskI>;
}

interface OwnProps {
  project: ProjectI;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projectStyles: {
      marginBottom: theme.spacing(5),
      border: `1px solid lightgray`,
      borderRadius: `0 0 15px 15px`,
      boxShadow: `0 5px 5px gray`,
      '& svg,button': {
        '&:hover': {
          cursor: 'pointer',
        },
        '&:active': {
          transform: `translate(2px,2px)`,
        },
      },
      addNewProjectButton: {
        background: '#4570b2',
      },
    },
  }),
);

export const Project: React.FC<OwnProps> = ({ project }) => {
  const { name, deadline, id } = project;
  const { projectStyles } = useStyles();

  return (
    <div className={projectStyles}>
      <ProjectHeader id={id} deadline={deadline!} name={name} />

      <TaskLine project={project} />

      <TasksContainer project={project} />
    </div>
  );
};
