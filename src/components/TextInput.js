/* eslint react/prop-types: 0 */
import React from 'react';
import styled, { css } from 'styled-components';
import * as PropTypes from 'prop-types';
import { hexToRgba } from '../utils/theme.utils';

export const TextInput = (props) => {
  const withMessage = props.errorMessage || props.validMessage;

  return (
    <Container className={props.className}>
      {props.label && (
        <Label className="text-input-label">
          {props.label}
          {props.required && <span>*</span>}
        </Label>
      )}
      <StyledInput
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        defaultValue={props.defaultValue}
        disabled={props.disabled}
        error={props.error}
        valid={props.valid}
        large={props.large}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        className="text-input"
        type={props.type || 'text'}
      />
      {withMessage && (
        <Message valid={props.valid}>
          {props.errorMessage || props.validMessage}
        </Message>
      )}
    </Container>
  );
};

TextInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  valid: PropTypes.bool,
  error: PropTypes.bool,
  validMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  large: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  max-width: 200px;
`;

const Label = styled.div`
  ${({ theme }) => theme.text.sm};
  color: ${({ theme }) => theme.p300};
  margin-bottom: 5px;

  span {
    color: ${({ theme }) => theme.r400};
    margin-left: 5px;
  }
`;

const StyledInput = styled.input`
  width: 100%;
  height: ${({ theme, large }) =>
    large ? theme.size.LARGE : theme.size.MEDIUM};
  box-sizing: border-box;
  padding: 0 10px;
  border: 1px solid ${({ theme }) => theme.p200};
  border-radius: 2px;
  background: ${({ theme }) => theme.p0};
  ${({ theme }) => theme.text.p};
  transition: all 300ms;

  ${({ theme, valid, error }) =>
    !valid &&
    !error &&
    css`
      &:hover {
        border-color: ${theme.p300};
      }

      &:focus {
        border-color: ${theme.a400};
      }
    `};

  &::placeholder {
    color: ${({ theme }) => theme.p300};
  }

  ${({ disabled, theme }) =>
    disabled &&
    css`
      pointer-events: none;
      background: ${hexToRgba(theme.p300, 10)};
      border-color: transparent;
      color: ${theme.p200};
    `};

  ${({ valid, theme }) =>
    valid &&
    css`
      border-color: ${theme.g400};
    `};

  ${({ error, theme }) =>
    error &&
    css`
      border-color: ${theme.r400};
    `};
`;

const Message = styled.div`
  ${({ theme }) => theme.text.sm};
  color: ${({ theme, valid }) => (valid ? theme.g400 : theme.r400)};
  margin-top: 5px;
`;
