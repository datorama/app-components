import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';

// assets
import { ReactComponent as Arrow } from '../../assets/arrow-date.svg';

// components
import DatepickerHeader from './DatepickerHeader';
import ClickOut from '../ClickOut';
import DatepickerPresets from './DatepickerPresets';

const DATE_FORMAT = 'YYYY-MM-DD';
const TITLES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

class Datepicker extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    className: PropTypes.string
  };

  state = {
    today: moment(),
    offset: 0,
    open: false,

    selection: [],
    committedSelection: [],
    tmpStart: null,
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
    const label = thisMonth.format('MMMM YYYY');

    for (let i = 0; i < TITLES.length; i++) {
      dates.push(
        <DateContainer key={`date-${TITLES[i]}-${i}`} type="title">
          <DateIcon type="title">{TITLES[i]}</DateIcon>
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

      const isStart = current.format(DATE_FORMAT) === selection[0];
      const isEnd = current.format(DATE_FORMAT) === selection[1];

      dates.push(
        <DateContainer
          key={`date-${i}`}
          onClick={() => this.handleClick(current.format(DATE_FORMAT))}
          onMouseEnter={() => this.setHover(current.format(DATE_FORMAT))}
          selected={selected}
          sameDay={selection[0] === selection[1] || !selection[1]}
          isStart={isStart}
          isEnd={isEnd}
        >
          <DateIcon
            today={current.format(DATE_FORMAT) === today.format(DATE_FORMAT)}
            type={isStart || isEnd ? 'edge' : 'normal'}
          >
            {i}
          </DateIcon>
        </DateContainer>
      );
    }

    return (
      <DatesContainer>
        <MonthTitle
          onClick={this.selectMonth([
            today
              .clone()
              .add(globalOffset + offset, 'month')
              .startOf('month')
              .format(DATE_FORMAT),
            today
              .clone()
              .add(globalOffset + offset, 'month')
              .endOf('month')
              .format(DATE_FORMAT)
          ])}
        >
          {label}
        </MonthTitle>
        {dates}
      </DatesContainer>
    );
  };

  setHover = (date = null) => {
    const { selecting, tmpStart } = this.state;

    let extra = {};

    if (selecting) {
      if (moment(date).isBefore(tmpStart)) {
        extra = { selection: [date, tmpStart] };
      } else {
        extra = { selection: [tmpStart, date] };
      }
    }

    this.setState({ hoveredDate: date, ...extra });
  };

  toggleOpen = () =>
    this.setState(
      prevState => ({ open: !prevState.open }),
      () => {
        if (!this.state.open) {
          setTimeout(() => {
            this.setState({
              offset: 0,
              selecting: false,
              hoveredDate: null
            });
          }, 300);
        }
      }
    );

  handleClickOut = () => {
    const { open, selecting } = this.state;

    if (open) {
      if (selecting) {
        this.cancel();
      } else {
        this.toggleOpen();
      }
    }
  };

  next = () => this.setState(prevState => ({ offset: prevState.offset + 1 }));

  prev = () => this.setState(prevState => ({ offset: prevState.offset - 1 }));

  apply = () =>
    this.setState(
      { committedSelection: this.state.selection },
      this.toggleOpen
    );

  cancel = () => {
    this.setState({ open: false, selecting: false }, () => {
      setTimeout(() => {
        this.setState({ selection: this.state.committedSelection });
      }, 300);
    });
  };

  handleClick = date => {
    const { selecting, tmpStart } = this.state;

    if (selecting) {
      if (moment(date).isBefore(tmpStart)) {
        this.setState({
          selecting: false,
          selection: [date, tmpStart],
          tmpStart: null
        });
        return;
      }

      this.setState({
        selecting: false,
        selection: [tmpStart, date],
        tmpStart: null
      });
    } else {
      this.setState({
        selecting: true,
        selection: [date, null],
        tmpStart: date
      });
    }
  };

  selectMonth = selection => () =>
    this.setState({ selection, selecting: false });

  render() {
    const { open, committedSelection } = this.state;
    const { className } = this.props;

    return (
      <ClickOut onClick={this.handleClickOut}>
        <DatepickerHeader
          onClick={this.toggleOpen}
          selection={committedSelection}
        />

        <Container visible={open} className={className}>
          <DatepickerPresets />
          <Divider margin="0" />

          <Header>
            <ArrowHolder>
              <StyledArrow
                onClick={this.prev}
                style={{ transform: 'rotate(-180deg)' }}
              />
            </ArrowHolder>
            <ArrowHolder>
              <StyledArrow onClick={this.next} />
            </ArrowHolder>
          </Header>

          <Dates>
            {this.datesRenderer()}
            {this.datesRenderer(1)}
          </Dates>

          <Divider />

          <Buttons>
            <InlineButton onClick={this.cancel}>Cancel</InlineButton>
            <InlineButton primary onClick={this.apply}>
              Apply
            </InlineButton>
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
  padding: 0 10px;
  margin-bottom: -50px;
  pointer-events: none;
  z-index: 2;
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
  cursor: pointer;
  transition: all 300ms;

  &:hover {
    color: ${({ theme }) => theme.a500};
  }
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

  ${({ theme, selected }) =>
    !selected &&
    css`
      border-radius: 13px;
      &:hover {
        background: ${theme.a100};
      }
    `};

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

  ${({ today, theme }) =>
    today &&
    css`
      border: 1px solid ${theme.p600};
      border-radius: 2px;
    `};
`;

const Dates = styled.div`
  display: flex;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.p100};
  margin-top: ${({ margin }) => margin || '20px'};
`;

const Buttons = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const InlineButton = styled.div`
  margin-left: 20px;
  ${({ theme }) => theme.text.pLink};
  line-height: 14px;
  cursor: pointer;

  ${({ primary, theme }) =>
    primary &&
    css`
      color: ${theme.a400};
    `};
`;

const ArrowHolder = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  pointer-events: all;

  &:hover {
    path {
      fill: ${({ theme }) => theme.a400};
    }
  }
`;

const StyledArrow = styled(Arrow)`
  width: 14px;
  height: 14px;

  path {
    fill: ${({ theme }) => theme.p600};
  }
`;
