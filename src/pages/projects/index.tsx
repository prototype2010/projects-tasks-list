import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormLoaderBackdrop } from '../auth/styled';
import { CircularProgress } from '@material-ui/core';
import { Projects } from './components/project/Projects';
import { Header } from 'components/header/Header';
import { NewProjectButton } from './components/project/NewProjectButton';
import { fetchProjectsAction, isProjectsLoading } from 'store/projects/reducer';
import { Footer } from '../../components/footer/Footer';

const DataPage = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(isProjectsLoading);

  useEffect(() => {
    dispatch(fetchProjectsAction());
  }, [dispatch]);

  return (
    <>
      <Header />

      <Projects />

      <NewProjectButton />

      <FormLoaderBackdrop open={isLoading}>
        <CircularProgress color="primary" />
      </FormLoaderBackdrop>

      <Footer />
    </>
  );
};

export default React.memo(DataPage);
