import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import PropTypes from 'prop-types';
import { set, isEmpty } from 'lodash/fp';

// icons
import Arrow from '../../icons/ArrowDate.icon';
import ArrowDown from '../../icons/ArrowDown.icon';
import Calendar from '../../icons/Calendar.icon';

import DatePickerInput from './DatepickerInput';
import { SelectMenuContext } from '../../contexts';
import { hexToRgba } from '../../../components/utils';
import { convertToDateRange, convertToMomentRange } from './date.utils';

// components
import ClickOut from '../ClickOut';
import DatepickerPresets from './DatepickerPresets';

class Datepicker extends Component {
  weekdays = [];

  static propTypes = {
    onChange: PropTypes.func,
    onMenuEnter: PropTypes.func,
    onMenuLeave: PropTypes.func,
    className: PropTypes.string,
    months: PropTypes.number,
    dateRange: PropTypes.shape({
      startDate: PropTypes.instanceOf(Date),
      endDate: PropTypes.instanceOf(Date)
    }),
    selectedPreset: PropTypes.string,
    firstDayOfWeek: PropTypes.number,
    dateFormat: PropTypes.string,
    customPresets: PropTypes.arrayOf(
      PropTypes.shape({
        range: PropTypes.string,
        label: PropTypes.string,
        startDate: PropTypes.instanceOf(Date),
        endDate: PropTypes.instanceOf(Date),
        group: PropTypes.string,
        order: PropTypes.number
      })
    ),
    bodyRenderer: PropTypes.func,
    customColor: PropTypes.string
  };

  static defaultProps = {
    months: 1,
    dateRange: {
      startDate: new Date(),
      endDate: new Date()
    },
    firstDayOfWeek: 0,
    dateFormat: 'MM-DD-YYYY',
    onChange: () => {},
    onMenuEnter: () => {},
    onMenuLeave: () => {}
  };

  constructor(props) {
    super(props);

    moment.updateLocale('en', {
      week: {
        dow: this.props.firstDayOfWeek,
        doy: this.props.firstDayOfWeek === 0 ? 6 : 4
      }
    });

    this.state = {
      today: moment(),
      offset: 0,
      open: false,
      selection: convertToMomentRange(this.props.dateRange),
      committedSelection: convertToMomentRange(this.props.dateRange),
      selecting: false,
      selectedPreset: [],
      committedSelectedPreset: [],
      tmpStart: moment(this.props.dateRange.startDate),
      hoveredDate: moment()
    };

    this.weekdays = moment.weekdaysMin(true);
    this.isLocalUpdate = false;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dateRange !== this.props.dateRange) {
      if (this.isLocalUpdate) {
        this.isLocalUpdate = false;

        return;
      }

      const convertedDateRange = convertToMomentRange(this.props.dateRange);

      this.setState({
        selection: convertedDateRange,
        committedSelection: convertedDateRange,
        selectedPreset: [],
        committedSelectedPreset: []
      });
    }
  }

  datesRenderer = (globalOffset = 0) => {
    const { offset, today, selection, selecting, hoveredDate } = this.state;
    const { firstDayOfWeek, customColor } = this.props;
    const { startDate, endDate } = selection;
    const dates = [];
    const monthStart = today.clone().startOf('month');
    const thisMonth = monthStart.add(globalOffset + offset, 'month');
    const total = thisMonth.daysInMonth();
    const label = thisMonth.format('MMMM YYYY');

    this.weekdays.forEach((day, index) => {
      dates.push(
        <DateContainer key={`date-${day}-${index}`} type="title">
          <DateIcon type="title">{day}</DateIcon>
        </DateContainer>
      );
    });

    // previews disabled dates
    for (let i = monthStart.day(); i > firstDayOfWeek; i--) {
      dates.push(<DateContainer key={`date-placeholder-${i}`} disabled />);
    }

    for (let i = 1; i <= total; i++) {
      const current = thisMonth.clone().set('date', i);
      let selected = current.isBetween(startDate, endDate, 'day', '[]');

      // check selected while selecting
      if (selecting && current.isBetween(startDate, hoveredDate, 'day', '[]')) {
        selected = true;
      }

      const isStart = current.isSame(startDate, 'day');
      const isEnd = current.isSame(endDate, 'day');
      const sameDay = startDate.isSame(endDate, 'day') || !endDate;

      dates.push(
        <DateContainer
          key={`date-${i}`}
          onClick={() => this.handleClick(current)}
          onMouseEnter={() => this.setHover(current)}
          selected={selected}
          sameDay={sameDay}
          isStart={isStart}
          isEnd={isEnd}
          customColor={customColor}
        >
          <DateIcon
            today={current.isSame(today, 'day')}
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
          onClick={this.selectMonth({
            startDate: today
              .clone()
              .add(globalOffset + offset, 'month')
              .startOf('month'),
            endDate: today
              .clone()
              .add(globalOffset + offset, 'month')
              .endOf('month')
          })}
        >
          {label}
        </MonthTitle>
        {dates}
      </DatesContainer>
    );
  };

  setHover = hoveredDate => {
    const { selecting, tmpStart } = this.state;

    let extra = {};

    if (selecting) {
      if (hoveredDate.isBefore(tmpStart, 'day')) {
        extra = { selection: { startDate: hoveredDate, endDate: tmpStart } };
      } else {
        extra = { selection: { startDate: tmpStart, endDate: hoveredDate } };
      }
    }

    this.setState({ hoveredDate: hoveredDate, ...extra });
  };

  toggleOpen = () =>
    this.setState(
      prevState => ({ open: !prevState.open }),
      () => {
        if (!this.state.open) {
          setTimeout(() => {
            this.cancel();
          }, 300);
        } else {
          this.setOffset();
        }
      }
    );

  openPopup = () => {
    const { open } = this.state;

    if (!open) {
      this.setOffset();
      this.setState({ open: true });
    }
  };

  handleClickOut = () => {
    const { open } = this.state;

    if (open) {
      this.cancel();
    }
  };

  setOffset = () => {
    const { today, selection } = this.state;
    const { startDate } = selection;

    if (startDate) {
      const selectionMonthStart = startDate.clone().startOf('month');
      let offset = selectionMonthStart.diff(
        today.clone().startOf('month'),
        'months'
      );

      this.setState({ offset });
    }
  };

  next = () => this.setState(prevState => ({ offset: prevState.offset + 1 }));

  prev = () => this.setState(prevState => ({ offset: prevState.offset - 1 }));

  apply = () => {
    if (this.validateSelection()) {
      this.isLocalUpdate = true;

      this.setState(
        {
          committedSelection: this.state.selection,
          committedSelectedPreset: this.state.selectedPreset,
          selecting: false,
          open: false
        },
        () => {
          const { startDate, endDate } = convertToDateRange(
            this.state.committedSelection
          );

          this.props.onChange({
            startDate,
            endDate,
            selectedPreset: this.state.committedSelectedPreset
          });
        }
      );
    } else {
      this.cancel();
    }
  };

  cancel = () => {
    this.setState({
      open: false,
      selecting: false,
      selection: this.state.committedSelection,
      selectedPreset: this.state.committedSelectedPreset
    });
  };

  handleClick = selectedDate => {
    const { selecting, tmpStart } = this.state;

    if (selecting) {
      if (selectedDate.isBefore(tmpStart, 'day')) {
        this.setState({
          selecting: false,
          selection: { startDate: selectedDate, endDate: tmpStart }
        });
      } else {
        this.setState({
          selecting: false,
          selection: { startDate: tmpStart, endDate: selectedDate }
        });
      }
    } else {
      this.setState({
        selecting: true,
        selection: { startDate: selectedDate, endDate: selectedDate },
        tmpStart: selectedDate,
        selectedPreset: []
      });
    }
  };

  selectMonth = selection => () =>
    this.setState({ selection, selecting: false, selectedPreset: [] });

  setPreset = preset => {
    this.setState(
      {
        selecting: false,
        selection: preset[0].dateRange,
        selectedPreset: preset,
        ...(this.props.selectedPreset
          ? {
              committedSelection: preset[0].dateRange,
              committedSelectedPreset: preset
            }
          : {})
      },
      () => {
        this.setOffset();
      }
    );
  };

  onChangeDate = (type, value) => {
    const { dateFormat } = this.props;
    const parsed = moment(value, dateFormat);

    if (parsed.isValid()) {
      this.setState(prevState => {
        const { selection } = prevState;
        const newSelection = set([type], moment(value, dateFormat), selection);

        return { selection: newSelection };
      });
    }
  };

  validateSelection = () => {
    const { selection } = this.state;

    return selection.startDate.isSameOrBefore(selection.endDate, 'day');
  };

  onKeyDown = e => {
    const { keyCode } = e;

    // Enter
    if (keyCode === 13) {
      this.apply();
    }
    // Esc
    else if (keyCode === 27) {
      this.handleClickOut();
    }
  };

  getPresetTitle = preset => {
    const { dateFormat } = this.props;
    const { label, dateRange } = preset;
    const { startDate, endDate } = dateRange;

    return `${label} (${startDate.format(dateFormat)} - ${endDate.format(
      dateFormat
    )})`;
  };

  computeTooltipTitle = () => {
    const { selectedPreset, selection } = this.state;
    const { dateFormat } = this.props;

    if (!isEmpty(selectedPreset)) {
      return this.getPresetTitle(selectedPreset[0]);
    }

    const { startDate, endDate } = selection;

    return `${startDate.format(dateFormat)} - ${endDate.format(dateFormat)}`;
  };

  render() {
    const { open, selectedPreset, selection } = this.state;
    const {
      months,
      firstDayOfWeek,
      dateFormat,
      onMenuEnter,
      onMenuLeave,
      customPresets,
      bodyRenderer,
      customColor
    } = this.props;
    const monthsElement = [];
    const { startDate, endDate } = selection;
    const body = () => <Dates>{monthsElement}</Dates>;

    for (let i = 0; i < months; i++) {
      monthsElement.push(this.datesRenderer(i));
    }

    return (
      <ClickOut onClick={this.handleClickOut}>
        <SelectMenuContext.Provider value={{ onMenuEnter, onMenuLeave }}>
          <DatepickerHeaderRow
            title={this.computeTooltipTitle()}
            onClick={this.toggleOpen}
          >
            <div>
              <StyledCalendar />
            </div>
            {isEmpty(selectedPreset) ? (
              <>
                <DatePickerInput
                  date={startDate}
                  dateFormat={dateFormat}
                  placeholder="start date"
                  onClick={this.openPopup}
                  onKeyDown={this.onKeyDown}
                  onChange={value => this.onChangeDate('startDate', value)}
                />
                <Separator>-</Separator>
                <DatePickerInput
                  date={endDate}
                  dateFormat={dateFormat}
                  placeholder="end date"
                  onClick={this.openPopup}
                  onKeyDown={this.onKeyDown}
                  onChange={value => this.onChangeDate('endDate', value)}
                />
              </>
            ) : (
              <Ellipsis>{this.getPresetTitle(selectedPreset[0])}</Ellipsis>
            )}
            <div>
              <StyledArrowDown rotation={open ? '180deg' : '0deg'} />
            </div>
          </DatepickerHeaderRow>

          <Container
            className={`dp-dropdown ${open ? 'open' : 'closed'}`}
            visible={open}
            total={months}
          >
            <DatepickerPresets
              onChange={this.setPreset}
              selectedPreset={this.props.selectedPreset || selectedPreset}
              firstDayOfWeek={firstDayOfWeek}
              customPresets={customPresets}
            />
            <Divider margin="0" customColor={customColor} />

            <Header>
              <ArrowHolder onClick={this.prev}>
                <StyledArrow rotation="-180deg" />
              </ArrowHolder>
              <ArrowHolder onClick={this.next}>
                <StyledArrow rotation="0deg" />
              </ArrowHolder>
            </Header>

            {bodyRenderer ? bodyRenderer({ body }) : body()}

            <Divider customColor={customColor} />

            <Buttons>
              <InlineButton onClick={this.cancel}>Cancel</InlineButton>
              <InlineButton
                primary
                onClick={this.apply}
                customColor={customColor}
              >
                Apply
              </InlineButton>
            </Buttons>
          </Container>
        </SelectMenuContext.Provider>
      </ClickOut>
    );
  }
}

const DatepickerHeaderRow = styled.div`
  width: 100%;
  padding: 4px 8px;
  box-sizing: border-box;
  border-radius: 4px;
  cursor: pointer;
  transition: all 300ms;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => theme.text.p};
  line-height: 1;
  font-weight: 600;

  &:hover {
    background: ${({ theme }) => theme.p50};
  }
`;

const Ellipsis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledCalendar = styled(Calendar)`
  width: 14px;
  height: 14px;
  cursor: pointer;
  margin-right: 5px;

  path {
    fill: ${({ theme }) => theme.p600};
  }
`;

const Separator = styled.span`
  margin: 0;
`;

const StyledArrowDown = styled(ArrowDown)`
  width: 8px;
  height: 8px;
  transform: rotate(${({ rotation }) => rotation});
  transition: all 300ms;
  margin-left: 10px;

  * {
    fill: ${({ theme }) => theme.p600};
  }
`;

const Container = styled.div`
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

const DateContainer = styled.div`
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  margin: 2px 0;

  ${({ selected, isStart, isEnd, theme, sameDay, customColor }) =>
    selected &&
    css`
      background: ${customColor ? hexToRgba(customColor, 20) : theme.a100};
      border-bottom-left-radius: ${isStart || sameDay ? '50%' : 0};
      border-top-left-radius: ${isStart || sameDay ? '50%' : 0};
      border-bottom-right-radius: ${isEnd || sameDay ? '50%' : 0};
      border-top-right-radius: ${isEnd || sameDay ? '50%' : 0};
    `}

  ${({ theme, selected, customColor }) =>
    !selected &&
    css`
      border-radius: 13px;
      &:hover {
        background: ${customColor ? hexToRgba(customColor, 20) : theme.a100};
      }
    `};

  ${({ isStart, isEnd, theme, customColor }) =>
    (isStart || isEnd) &&
    css`
      background: ${customColor || theme.a100};
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
  width: 100%; // IE11 fix so that flex-wrap would work
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme, customColor }) =>
    customColor ? hexToRgba(customColor, 20) : theme.a100};
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

  &:hover {
    color: ${({ theme }) => theme.p600};
  }

  ${({ primary, theme, customColor }) =>
    primary &&
    css`
      color: ${customColor || theme.a400};

      &:hover {
        color: ${customColor ? hexToRgba(customColor, 80) : theme.a500};
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

const StyledArrow = styled(Arrow)`
  width: 14px;
  height: 14px;
  transform: rotate(${({ rotation }) => rotation});

  path {
    fill: ${({ theme }) => theme.p600};
  }
`;

export default Datepicker;
