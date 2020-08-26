import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorMessage, useForm } from 'react-hook-form';
import { CircularProgress, Button, Snackbar } from '@material-ui/core';

import {
  authMetaSelector,
  closeSnack,
  resetErrorAction,
  signInAction,
  signUpSuccessfulSelector,
} from 'store/auth/reducer';
import { useFormValidationsRules } from 'lib/helpers/validationHelpers';

import { FormWrapper, Form, FormLoaderBackdrop, ButtonContainer, AsyncError } from '../styled';
import { Alert } from '@material-ui/lab';
import { NavButtons } from '../components/navButtons';
import { Input } from '../components/form/input/Input';

interface SignInData {
  email: string;
  password: string;
  credentials: undefined;
}

const SignIn = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, setError, clearError } = useForm<SignInData>();
  const { isLoading, isError, errorMsg } = useSelector(authMetaSelector);

  const isSingUpSuccessful = useSelector(signUpSuccessfulSelector);

  const validationRules = useFormValidationsRules();

  const onSubmit = handleSubmit(({ email, password }) => {
    dispatch(signInAction({ email, password }));
  });

  const handleCloseSnack = useCallback(() => dispatch(closeSnack()), [dispatch]);

  const resetError = useCallback(() => {
    clearError('credentials');
    dispatch(resetErrorAction());
  }, [clearError, dispatch]);

  useEffect(() => {
    if (isError) {
      setError('credentials', 'invalid', errorMsg.join('\n\r'));
    }
  }, [isError, errorMsg, setError]);

  return (
    <>
      <FormWrapper>
        <Form onSubmit={onSubmit} onChange={isError ? resetError : undefined} noValidate>
          <Input
            label="Email"
            name="email"
            type="email"
            data-testid={'email'}
            placeholder="example@domain.com"
            inputRef={register({
              ...validationRules.required,
              ...validationRules.email,
            })}
            error={isError || Boolean(errors.email)}
            helperText={errors.email?.message}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            data-testid="password"
            inputRef={register({
              ...validationRules.required,
              ...validationRules.minLength8,
            })}
            error={isError || Boolean(errors.password)}
            helperText={errors.password?.message}
          />

          <ButtonContainer>
            <ErrorMessage as={AsyncError} errors={errors} name="credentials" />

            <Button data-testid={'sign-in'} type="submit" variant="contained" color="primary">
              Sign In
            </Button>
            <NavButtons />
          </ButtonContainer>
        </Form>
      </FormWrapper>

      <FormLoaderBackdrop open={isLoading}>
        <CircularProgress color="primary" />
      </FormLoaderBackdrop>

      <Snackbar
        open={isSingUpSuccessful}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnack} severity="success">
          Sign Up Successful
        </Alert>
      </Snackbar>
    </>
  );
};

export default React.memo(SignIn);
