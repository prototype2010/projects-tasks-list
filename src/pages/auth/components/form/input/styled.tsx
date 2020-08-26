import MaterialFormControl, { FormControlProps } from '@material-ui/core/FormControl';
import styled from 'styled-components';
import MaterialOutlinedInput, { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import MaterialFormHelperText from '@material-ui/core/FormHelperText';
import React from 'react';

interface FormControlI extends FormControlProps {
  styles?: string;
}

interface OutlinedInputI extends OutlinedInputProps {
  styles?: string;
}

export const StyledMaterialOuFormControl = styled(({ ...other }: FormControlI) => <MaterialFormControl {...other} />)`
  width: 100%;
  padding-bottom: 22px !important;
  margin-bottom: 1em !important;
  ${({ styles }) => styles}
`;

export const StyledMaterialOutlinedInput = styled(({ ...other }: OutlinedInputI) => (
  <MaterialOutlinedInput {...other} />
))`
  width: 100%;
  ${({ styles }) => styles}
`;

export const StyledFormHelperText = styled(MaterialFormHelperText)`
  position: absolute;
  bottom: 0;
`;
