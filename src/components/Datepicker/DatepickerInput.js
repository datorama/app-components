/* eslint react/prop-types: 0 */
import React from 'react';
import { func, string, object } from 'prop-types';
import styled from 'styled-components';

class DatePickerInput extends React.Component {
  inputRef = React.createRef();

  static propTypes = {
    date: object,
    placeholder: string,
    onChange: func.isRequired,
    onClick: func,
    onKeyDown: func,
  };

  state = {
    editMode: false,
    value: this.props.placeholder,
  };

  onChange = (e) => {
    this.setState({
      editMode: true,
      value: e.target.value,
    });
    this.props.onChange(e.target.value);
  };

  onBlur = () => {
    this.setState({
      editMode: false,
    });
  };

  onKeyDown = (e) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      this.inputRef.current && this.inputRef.current.blur();
    }

    this.props.onKeyDown && this.props.onKeyDown(e);
  };

  onClick = (e) => {
    e.stopPropagation();
    this.props.onClick && this.props.onClick();
  };

  render() {
    const { date, dateFormat } = this.props;

    const value =
      !this.state.editMode && date ? date.format(dateFormat) : this.state.value;

    return (
      <Input
        className="datepicker-input"
        ref={this.inputRef}
        onChange={this.onChange}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        value={value}
      />
    );
  }
}

const Input = styled.input`
  background-color: transparent;
  border: none;
  max-width: 90px;
  outline: none;
  font-size: 100%;
  font-weight: inherit;
  color: ${({ theme }) => theme.p600};
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0;

  &:focus {
    text-overflow: clip;
  }
`;

export default DatePickerInput;
