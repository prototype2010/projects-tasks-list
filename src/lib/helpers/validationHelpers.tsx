import { useMemo } from 'react';

export const useFormValidationsRules = () => {
  return useMemo(
    () => ({
      required: {
        required: {
          value: true,
          message: 'Required',
        },
      },
      email: {
        pattern: {
          value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: 'Invalid email',
        },
      },
      minLength8: {
        minLength: { value: 8, message: 'Should be at least 8 characters' },
      },
      maxLength20: {
        maxLength: { value: 20, message: 'Should be maximum 20 characters' },
      },
    }),
    [],
  );
};
