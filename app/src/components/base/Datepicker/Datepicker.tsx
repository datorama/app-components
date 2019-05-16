import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import moment, { Moment } from 'moment';
import PropTypes from 'prop-types';

// icons
import Arrow from '../../icons/ArrowDate.icon';

// components
import DatepickerHeader from './DatepickerHeader';
import ClickOut from '../ClickOut';
import DatepickerPresets from './DatepickerPresets';
import { Preset, Selection } from './Datepicker.types';

const DATE_FORMAT = 'YYYY-MM-DD';
const TITLES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

type Props = {
  onChange?: (selection: Selection) => [string, string];
  initialSelection?: Selection;
  className?: string;
  months?: number;
  firstDayOfWeek?: number;
  dateFormat?: string;
};

type DefaultProps = {
  months: number;
  initialSelection: Selection;
  firstDayOfWeek: number;
  dateFormat: string;
  onChange: () => void;
};

type State = {
  today: Moment;
  offset: number;
  open: boolean;
  selection: Selection;
  committedSelection: Selection;
  tmpStart: string;
  selecting: boolean;
  hoveredDate: string;
  selectedPreset: Preset;
};

class Datepicker extends Component<Props & DefaultProps, State> {
  static propTypes = {
    onChange: PropTypes.func,
    className: PropTypes.string,
    months: PropTypes.number,
    initialSelection: PropTypes.arrayOf(PropTypes.string),
    firstDayOfWeek: PropTypes.number,
    dateFormat: PropTypes.string
  };

  static defaultProps: DefaultProps = {
    months: 1,
    initialSelection: [],
    firstDayOfWeek: 0,
    dateFormat: DATE_FORMAT,
    onChange: () => {}
  };

  state: State = {
    today: moment(),
    offset: 0,
    open: false,
    selection: this.props.initialSelection,
    committedSelection: this.props.initialSelection,
    selecting: false,
    selectedPreset: [],
    tmpStart: '',
    hoveredDate: ''
  };

  datesRenderer = (globalOffset = 0) => {
    const { offset, today, selection, selecting, hoveredDate } = this.state;
    const dates = [];
    const monthStart = today.clone().startOf('month');
    const thisMonth = monthStart.add(globalOffset + offset, 'month');
    const total = thisMonth.daysInMonth();
    const label = thisMonth.format('MMMM YYYY');

    for (let i = 0; i < TITLES.length; i++) {
      dates.push(
        <DateContainer key={`date-${TITLES[i]}-${i}`} type="title">
          <DateIcon type="title">{TITLES[i]}</DateIcon>
        </DateContainer>
      );
    }

    // previews disabled dates
    for (let i = monthStart.day(); i > 0; i--) {
      dates.push(<DateContainer key={`date-placeholder-${i}`} disabled />);
    }

    for (let i = 1; i <= total; i++) {
      const current = thisMonth.clone().set('date', i);
      let selected = current.isBetween(
        selection[0],
        selection[1],
        undefined,
        '[]'
      );

      // check selected while selecting
      if (
        selecting &&
        current.isBetween(selection[0], hoveredDate, undefined, '[]')
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
      <DatesContainer key={`month-${globalOffset}`}>
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

  setHover = (date = '') => {
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
              hoveredDate: ''
            });
          }, 300);
        } else {
          this.setOffset();
        }
      }
    );

  handleClickOut = () => {
    const { open } = this.state;

    if (open) {
      this.cancel();
    }
  };

  setOffset = () => {
    const { today, selection } = this.state;

    if (selection[0]) {
      const selectionMonthStart = moment(selection[0]).startOf('month');
      let offset = selectionMonthStart.diff(
        today.clone().startOf('month'),
        'months'
      );

      this.setState({ offset });
    }
  };

  next = () => this.setState(prevState => ({ offset: prevState.offset + 1 }));

  prev = () => this.setState(prevState => ({ offset: prevState.offset - 1 }));

  apply = () =>
    this.setState({ committedSelection: this.state.selection }, () => {
      this.toggleOpen();
      this.props.onChange(this.state.committedSelection);
    });

  cancel = () => {
    this.setState({ open: false, selecting: false }, () => {
      setTimeout(() => {
        this.setState({ selection: this.state.committedSelection });
      }, 300);
    });
  };

  handleClick = (date: string) => {
    const { selecting, tmpStart } = this.state;

    if (selecting) {
      if (moment(date).isBefore(tmpStart)) {
        this.setState({
          selecting: false,
          selection: [date, tmpStart],
          tmpStart: ''
        });
        return;
      }

      this.setState({
        selecting: false,
        selection: [tmpStart, date],
        tmpStart: ''
      });
    } else {
      this.setState({
        selecting: true,
        selection: [date, ''],
        tmpStart: date,
        selectedPreset: []
      });
    }
  };

  selectMonth = (selection: Selection) => () =>
    this.setState({ selection, selecting: false });

  setPreset = (preset: Preset) => {
    this.setState(
      { selection: preset[0].selection, selectedPreset: preset },
      () => {
        this.setOffset();
        this.props.onChange(preset[0].selection);
      }
    );
  };

  render() {
    const { open, committedSelection, selectedPreset } = this.state;
    const { className, months, firstDayOfWeek, dateFormat } = this.props;
    const monthsElement = [];

    for (let i = 0; i < months; i++) {
      monthsElement.push(this.datesRenderer(i));
    }

    return (
      <ClickOut onClick={this.handleClickOut}>
        <DatepickerHeader
          onClick={this.toggleOpen}
          selection={committedSelection}
          open={open}
          dateFormat={dateFormat}
        />

        <Container visible={open} className={className} total={months}>
          <DatepickerPresets
            onChange={this.setPreset}
            selectedPreset={selectedPreset}
            firstDayOfWeek={firstDayOfWeek}
          />
          <Divider margin="0" />

          <Header>
            <ArrowHolder onClick={this.prev}>
              <StyledArrow rotation="-180deg" />
            </ArrowHolder>
            <ArrowHolder onClick={this.next}>
              <StyledArrow rotation="0deg" />
            </ArrowHolder>
          </Header>

          <Dates>{monthsElement}</Dates>

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

const Container = styled.div<{
  visible: boolean;
  total: number;
}>`
  user-select: none;
  width: ${({ total }) => total * (182 + 20) + 32 + 20}px;
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
  z-index: 2;

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
  height: 60px;
  box-sizing: border-box;
  width: 100%;
  padding: 0 10px;
  margin-bottom: -50px;
  pointer-events: none;
  z-index: 1;
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
  margin-top: -30px;
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

const DateContainer = styled.div<{
  type?: 'title';
  disabled?: boolean;
  selected?: boolean;
  isStart?: boolean;
  isEnd?: boolean;
  sameDay?: boolean;
}>`
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

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `};
`;

const DateIcon = styled.div<{
  type?: 'title' | 'edge' | 'normal';
  today?: boolean;
}>`
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

const Divider = styled.div<{ margin?: string }>`
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

const InlineButton = styled.div<{ primary?: boolean }>`
  margin-left: 20px;
  ${({ theme }) => theme.text.pLink};
  line-height: 14px;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.p600};
  }

  ${({ primary, theme }) =>
    primary &&
    css`
      color: ${theme.a400};

      &:hover {
        color: ${theme.a500};
      }
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

const StyledArrow = styled(Arrow)<{ rotation: string }>`
  width: 14px;
  height: 14px;
  transform: rotate(${({ rotation }) => rotation});

  path {
    fill: ${({ theme }) => theme.p600};
  }
`;
