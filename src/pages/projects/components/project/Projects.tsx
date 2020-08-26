import React from 'react';
import { Project, ProjectI } from './Project';
import { useSelector } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { projectsSelector } from 'store/projects/reducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    projectsContainer: {
      width: 800,
    },
  }),
);

export const Projects: React.FC = () => {
  const projects: Array<ProjectI> = useSelector(projectsSelector);

  const { projectsContainer } = useStyles();

  return (
    <div className={projectsContainer}>
      {projects.map((project) => {
        return <Project key={project.id} project={project} />;
      })}
    </div>
  );
};
