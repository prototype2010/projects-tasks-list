import React, { useCallback, useEffect, useRef } from 'react';
import { ErrorMessage, useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';
import { FormWrapper, Form, ButtonContainer, AsyncError, FormLoaderBackdrop } from 'pages/auth/styled';
import { useFormValidationsRules } from 'lib/helpers/validationHelpers';
import {
  authMetaSelector,
  resetErrorAction,
  signUpAction,
  signUpSuccessfulSelector,
} from '../../../store/auth/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router';
import { getUrl } from '../../../routes/utils';
import { Input } from '../components/form/input/Input';
import { NavButtons } from '../components/navButtons';

interface SignUpData {
  email: string;
  password: string;
  passwordConfirmation: string;
  credentials: undefined;
}

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isLoading, isError, errorMsg } = useSelector(authMetaSelector);
  const isSingUpSuccessful = useSelector(signUpSuccessfulSelector);

  const { handleSubmit, register, errors, watch, clearError, setError } = useForm<SignUpData>({
    mode: 'onBlur',
  });
  const password = useRef({});
  password.current = watch('password', '');

  const validationRules = useFormValidationsRules();

  const onSubmit = handleSubmit(({ email, password, passwordConfirmation }) => {
    dispatch(signUpAction({ email, password, repeatPassword: passwordConfirmation }));
  });

  const resetError = useCallback(() => {
    clearError('credentials');
    dispatch(resetErrorAction());
  }, [clearError, dispatch]);

  useEffect(() => {
    if (isError) {
      setError('credentials', 'invalid', errorMsg.join('\n\r'));
    }
  }, [isError, errorMsg, setError]);

  useEffect(() => {
    if (isSingUpSuccessful) {
      history.push(getUrl('signIn'));
    }
  }, [isSingUpSuccessful, history]);

  return (
    <>
      <FormWrapper>
        <Form onChange={isError ? resetError : undefined} onSubmit={onSubmit} noValidate>
          <Input
            label="Email"
            name="email"
            type="email"
            data-testid="email"
            placeholder="example@domain.com"
            inputRef={register({
              ...validationRules.required,
              ...validationRules.email,
            })}
            error={!!errors?.email}
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
              ...validationRules.maxLength20,
            })}
            error={!!errors?.password}
            helperText={errors.password?.message}
          />

          <Input
            label="Confirm password"
            name="passwordConfirmation"
            type="password"
            data-testid="repeat-password"
            inputRef={register({
              ...validationRules.required,
              ...validationRules.minLength8,
              ...validationRules.maxLength20,
              validate: (passwordConfirmation) => passwordConfirmation === password.current || 'Passwords should match',
            })}
            error={!!errors?.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
          />
          <ErrorMessage as={AsyncError} errors={errors} name="credentials" />
          <ButtonContainer>
            <Button type="submit" data-testid={'sign-up'} variant="contained" color="primary">
              Sign Up
            </Button>
            <NavButtons />
          </ButtonContainer>
        </Form>
      </FormWrapper>
      <FormLoaderBackdrop open={isLoading}>
        <CircularProgress color="primary" />
      </FormLoaderBackdrop>
    </>
  );
};

export default React.memo(SignUp);
