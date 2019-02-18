import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import ClickOut from './ClickOut';

// assets
import { ReactComponent as Arrow } from '../assets/arrow-date.svg';

class Datepicker extends Component {
  static propTypes = {};

  state = {
    today: moment(),
    offset: 0,
    open: false,

    selection: ['2019-01-01', '2019-02-02'],
    selecting: false,
    hoveredDate: null
  };

  datesRenderer = (globalOffset = 0) => {
    const { offset, today, selection, selecting, hoveredDate } = this.state;
    const dates = [];
    const thisMonth = today
      .clone()
      .startOf('month')
      .add(globalOffset + offset, 'month');
    const total = thisMonth.daysInMonth();

    const label = today
      .clone()
      .startOf('month')
      .add(globalOffset + offset, 'month')
      .format('MMMM YYYY');

    const titles = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    for (let i = 0; i < titles.length; i++) {
      dates.push(
        <DateContainer key={`date-${titles[i]}-${i}`} type="title">
          <DateIcon type="title">{titles[i]}</DateIcon>
        </DateContainer>
      );
    }

    for (let i = 1; i <= total; i++) {
      const current = thisMonth.clone().set('date', i);
      let selected = current.isBetween(selection[0], selection[1], null, '[]');

      // check selected while selecting
      if (
        selecting &&
        current.isBetween(selection[0], hoveredDate, null, '[]')
      ) {
        selected = true;
      }

      const isStart = current.format('YYYY-MM-DD') === selection[0];
      const isEnd = current.format('YYYY-MM-DD') === selection[1];

      dates.push(
        <DateContainer
          key={`date-${i}`}
          onClick={() => this.handleClick(current.format('YYYY-MM-DD'))}
          onMouseEnter={() => this.setHover(current.format('YYYY-MM-DD'))}
          selected={selected}
          sameDay={selection[0] === selection[1] || !selection[1]}
          isStart={isStart}
          isEnd={isEnd}
        >
          <DateIcon
            today={today.day() === i - 1 && !(globalOffset + offset)}
            type={isStart || isEnd ? 'edge' : 'normal'}
          >
            {i}
          </DateIcon>
        </DateContainer>
      );
    }

    return (
      <DatesContainer>
        <MonthTitle>{label}</MonthTitle>
        {dates}
      </DatesContainer>
    );
  };

  setHover = (date = null) => {
    const { selecting, selection } = this.state;
    let extra = {};

    if (selecting) {
      if (moment(date).isBefore(selection[0])) {
        return;
      }
      extra = { selection: [selection[0], date] };
    }

    this.setState({ hoveredDate: date, ...extra });
  };

  toggleOpen = () =>
    this.setState(
      prevState => ({ open: !prevState.open }),
      () => {
        if (!this.state.open) {
          setTimeout(() => {
            this.setState({ offset: 0 });
          }, 300);
        }
      }
    );

  handleClickOut = () => {
    const { open } = this.state;

    if (open) {
      this.toggleOpen();
    }
  };

  next = () => this.setState(prevState => ({ offset: prevState.offset + 1 }));

  prev = () => this.setState(prevState => ({ offset: prevState.offset - 1 }));

  handleClick = date => {
    const { selecting, selection } = this.state;

    if (selecting) {
      if (moment(date).isBefore(selection[0])) {
        return;
      }

      this.setState({ selecting: false, selection: [selection[0], date] });
    } else {
      this.setState({ selecting: true, selection: [date, null] });
    }
  };

  render() {
    const { open, selection } = this.state;

    return (
      <ClickOut onClick={this.handleClickOut}>
        <CustomInput onClick={this.toggleOpen}>
          {`${selection[0] || ''} - ${selection[1] || ''}`}
        </CustomInput>

        <Container visible={open}>
          <Header>
            <StyledArrow
              onClick={this.prev}
              style={{ transform: 'rotate(-180deg)' }}
            />
            <StyledArrow onClick={this.next} />
          </Header>

          <Dates>
            {this.datesRenderer()}
            {this.datesRenderer(1)}
          </Dates>

          <Divider />

          <Buttons>
            <InlineButton>Cancel</InlineButton>
            <InlineButton>Apply</InlineButton>
          </Buttons>
        </Container>
      </ClickOut>
    );
  }
}

export default Datepicker;

const Container = styled.div`
  user-select: none;
  width: calc(182px * 2 + 32px + 40px);
  padding: 0 20px;
  min-height: 250px;
  background: ${({ theme }) => theme.p0};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 14px 0 rgba(0, 0, 0, 0.13);
  position: absolute;
  top: 45px;
  left: 0;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: all 300ms;
  border-radius: 4px;

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      visibility: visible;
      pointer-events: all;
    `}
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  box-sizing: border-box;
  width: 100%;
  padding: 0 20px;
  position: absolute;
  top: 10px;
  left: 0;
`;

const MonthTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  align-items: center;
  font-weight: 300;
  ${({ theme }) => theme.text.pBold};
  width: 100%;
  height: 20px;
  margin-top: -21px;
  margin-bottom: 20px;
`;

const DatesContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  box-sizing: border-box;
  padding: 0 8px;
  margin-top: 40px;
  align-items: flex-start;
  height: 100%;
`;

const DateContainer = styled.div`
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  margin: 2px 0;

  ${({ selected, isStart, isEnd, theme, sameDay }) =>
    selected &&
    css`
      background: ${theme.a100};
      border-bottom-left-radius: ${isStart || sameDay ? '50%' : 0};
      border-top-left-radius: ${isStart || sameDay ? '50%' : 0};
      border-bottom-right-radius: ${isEnd || sameDay ? '50%' : 0};
      border-top-right-radius: ${isEnd || sameDay ? '50%' : 0};
    `}

  ${({ isStart, isEnd, theme }) =>
    (isStart || isEnd) &&
    css`
      background: ${theme.a400};
    `};

  ${({ type }) =>
    type === 'title' &&
    css`
      pointer-events: none;
    `};
`;

const DateIcon = styled.div`
  width: 100%;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.p600};
  ${({ theme }) => theme.text.sm};
  box-sizing: border-box;
  border-radius: 50%;

  ${({ type, theme }) => {
    if (type === 'title') {
      return css`
        color: ${theme.p300};
      `;
    }

    if (type === 'edge') {
      return css`
        color: ${theme.p0};
      `;
    }
  }};
`;

const CustomInput = styled.div`
  width: 180px;
  height: 25px;
  background: ${({ theme }) => theme.p50};
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  transition: all 300ms;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6f6f6f;
  font-size: 12px;
  font-weight: 300;

  &:hover {
    background: #fafafa;
  }
`;

const Dates = styled.div`
  display: flex;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.p100};
  margin-top: 20px;
`;

const Buttons = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const InlineButton = styled.div`
  margin-left: 20px;
  ${({ theme }) => theme.text.pLink};
  line-height: 14px;
  cursor: pointer;
`;

const StyledArrow = styled(Arrow)`
  width: 14px;
  height: 14px;
  cursor: pointer;
`;
