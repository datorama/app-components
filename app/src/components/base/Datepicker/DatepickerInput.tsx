import React from 'react';
import { func, string, object } from 'prop-types';
import { Moment } from 'moment';
import styled from 'styled-components';

type Props = {
  date?: Moment;
  onChange: (value: string) => void;
  onClick?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  dateFormat: string;
  placeholder: string;
};

type State = {
  editMode: boolean;
  value: string;
};

class DatePickerInput extends React.Component<Props, State> {
  inputRef = React.createRef<HTMLInputElement>();

  static propTypes = {
    date: object,
    placeholder: string,
    onChange: func.isRequired,
    onClick: func,
    onKeyDown: func
  };

  state = {
    editMode: false,
    value: this.props.placeholder
  };

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      editMode: true,
      value: e.target.value
    });
    this.props.onChange(e.target.value);
  };

  onBlur = () => {
    this.setState({
      editMode: false
    });
  };

  onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      this.inputRef.current && this.inputRef.current.blur();
    }

    this.props.onKeyDown && this.props.onKeyDown(e);
  };

  onClick = (e: React.MouseEvent<HTMLInputElement>) => {
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

  &:focus {
    text-overflow: clip;
  }
`;

export default DatePickerInput;
