import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    footer: {
      textAlign: 'center',
      position: 'absolute',
      width: '100%',
      left: 0,
      bottom: 0,
      height: 40,
      overflow: 'hidden',
    },
  }),
);

export const Footer: React.FC = () => {
  const { footer } = useStyles();

  return <footer className={footer}>@ Ruby Garage</footer>;
};
