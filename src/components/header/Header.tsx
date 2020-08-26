import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      margin: theme.spacing(6),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    subheader: {
      fontSize: 18,
      fontWeight: 100,
    },
  }),
);

export const Header: React.FC = () => {
  const { header, subheader } = useStyles();

  return (
    <header className={header}>
      <h1>SIMPLE TODO LISTS</h1>
      <h5 className={subheader}>FROM RUBY GARAGE</h5>
    </header>
  );
};
