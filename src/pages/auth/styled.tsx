import styled from 'styled-components';
import { Backdrop } from '@material-ui/core';

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const Form = styled.form`
  padding: 2em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const FormLoaderBackdrop = styled(Backdrop)`
  && {
    z-index: 1;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.15);
  }
`;

export const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: 8px;
`;

export const AsyncError = styled.div`
  position: absolute;
  bottom: calc(100% + 4px);
  font-size: 0.75em;
  color: ${({ theme }) => theme.colors.text.error};
`;
