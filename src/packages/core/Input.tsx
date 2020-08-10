import React, {ChangeEvent} from 'react';
import styled from 'styled-components';
import {hexToRgba} from '../../common/utils';
import {log} from 'util';

export interface InputProps {
  label?: string;
  placeholder?: string;
  isDisabled?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
  isRequired?: boolean;
  isValid?: boolean;
  isError?: boolean;
  validMessage?: string;
  errorMessage?: string;
  isLarge?: boolean;
  onFocus?: () => any;
  className?: string;
  type?: "email" | "text" | "tel" | "password" | "number" | "url";
}

const Input = (props: InputProps) => {
  const withMessage = props.errorMessage || props.validMessage;

  return (
    <Container className={props.className}>
      {props.label && (
        <Label className="text-input-label">
          {props.label}
          {props.isRequired && <span>*</span>}
        </Label>
      )}
      <StyledInput
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        isDisabled={props.isDisabled}
        isError={props.isError}
        isValid={props.isValid}
        isLarge={props.isLarge}
        onFocus={props.onFocus}
        className="input"
        type={props.type || 'text'}
      />
      {withMessage && (
        <Message isValid={props.isValid}>
          {props.errorMessage || props.validMessage}
        </Message>
      )}
    </Container>
  );
};

export default Input;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  width: 100%;
`;

const Label = styled.div`
  ${({theme}) => theme.text.sm};
  color: ${({theme}) => theme.p300};
  margin-bottom: 5px;

  span {
    color: ${({theme}) => theme.r400};
    margin-left: 5px;
  }
`;

const StyledInput = styled.input<{ isLarge?: boolean, isValid?: boolean, isError?: boolean, isDisabled?: boolean }>`
  width: 100%;
  height: ${({theme, isLarge}) =>
  isLarge ? theme.size.LARGE : theme.size.MEDIUM};
  box-sizing: border-box;
  padding: 0 10px;
  border: 1px solid ${({theme}) => theme.p200};
  border-radius: 2px;
  background: ${({theme}) => theme.p0};
  ${({theme}) => theme.text.p};
  transition: all 300ms;
  
  ${({theme, isValid, isError}) => !isValid && !isError && `
    &:hover {
      border-color: ${theme.p300};
    }
    
    &:focus {
      border-color: ${theme.a400};
    }
  `};
  
  &::placeholder {
    color: ${({theme}) => theme.p300};
  }
  
  ${({isDisabled, theme}) => isDisabled && `
    pointer-events: none;
    background: ${hexToRgba(theme.p300, 10)};
    border-color: transparent;
    color: ${theme.p200};
  `};
  
  ${({isValid, theme}) => isValid && `
    border-color: ${theme.g400};
  `};
  
  ${({isError, theme}) => isError && `
    border-color: ${theme.r400};
  `};
`;

const Message = styled.div<{ isValid?: boolean }>`
  ${({theme}) => theme.text.sm};
  color: ${({theme, isValid}) => (isValid ? theme.g400 : theme.r400)};
  margin-top: 5px;
`;
