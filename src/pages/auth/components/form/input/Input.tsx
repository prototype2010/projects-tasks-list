import React, { useState } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { OutlinedInputProps } from '@material-ui/core/OutlinedInput';
import MaterialInputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import { StyledMaterialOuFormControl, StyledMaterialOutlinedInput, StyledFormHelperText } from './styled';

interface OwnProps extends OutlinedInputProps {
  styles?: string;
  helperText?: React.ReactNode;
}

export const Input: React.FC<OwnProps> = (props) => {
  const { helperText, styles, ...restProps } = props;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <StyledMaterialOuFormControl error={props.error} variant="outlined">
      <MaterialInputLabel htmlFor={props.name}>{props.label}</MaterialInputLabel>
      <StyledMaterialOutlinedInput
        {...restProps}
        styles={styles}
        id={props.name}
        type={props.type === 'password' ? (showPassword ? 'text' : 'password') : props.type}
        endAdornment={
          props.type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }
      />
      <StyledFormHelperText>{helperText}</StyledFormHelperText>
    </StyledMaterialOuFormControl>
  );
};
