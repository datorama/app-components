import React, { ChangeEvent } from 'react';
import { func, string } from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';

type Props = {
  date?: string;
  onChange: (value: string) => void;
  onClick?: () => void;
  dateFormat: string;
  initialValue: string;
};

type State = {
  editMode: boolean;
  value: string;
};

class DatePickerInput extends React.Component<Props, State> {
  static propTypes = {
    date: string,
    initialValue: string,
    onChange: func.isRequired,
    onClick: func
  };

  state = {
    editMode: false,
    value: this.props.initialValue
  };

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  render() {
    const { date, onClick, dateFormat } = this.props;

    const value =
      !this.state.editMode && date
        ? moment(date).format(dateFormat)
        : this.state.value;

    return (
      <Input
        onChange={this.onChange}
        onBlur={this.onBlur}
        onClick={onClick}
        value={value}
      />
    );
  }
}

const Input = styled.input`
  background-color: transparent;
  border: none;
  width: 90px;
  outline: none;
  font-size: 100%;
  font-weight: inherit;
  color: ${({ theme }) => theme.p600};
  text-align: center;
`;

export default DatePickerInput;
