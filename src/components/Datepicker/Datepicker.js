import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import { set, isEmpty, get, noop, isFunction } from 'lodash/fp';

// icons
import Arrow from '../../assets/ArrowDate.icon';
import ArrowDown from '../../assets/ArrowDown.icon';
import Calendar from '../../assets/Calendar.icon';

import DatePickerInput from './DatepickerInput';
import { SelectMenuContext } from '../Select/context';
import { hexToRgba } from '../../utils/theme.utils';
import { convertToDateRange, convertToMomentRange } from './date.utils';

// components
import { ClickOut } from '../ClickOut';
import DatepickerPresets from './DatepickerPresets';

export class Datepicker extends Component {
  weekdays = [];

  static propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onMenuEnter: PropTypes.func,
    onMenuLeave: PropTypes.func,
    activeRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
    className: PropTypes.string,
    months: PropTypes.number,
    dateRange: PropTypes.shape({
      startDate: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
      ]),
      endDate: PropTypes.oneOfType([
        PropTypes.instanceOf(Date),
        PropTypes.string,
      ]),
    }),
    selectedPreset: PropTypes.string,
    firstDayOfWeek: PropTypes.number,
    dateFormat: PropTypes.string,
    customPresets: PropTypes.arrayOf(
      PropTypes.shape({
        range: PropTypes.string,
        label: PropTypes.string,
        startDate: PropTypes.oneOfType([
          PropTypes.instanceOf(Date),
          PropTypes.string,
        ]),
        endDate: PropTypes.oneOfType([
          PropTypes.instanceOf(Date),
          PropTypes.string,
        ]),
        group: PropTypes.string,
        order: PropTypes.number,
      })
    ),
    headerRenderer: PropTypes.func,
    bodyRenderer: PropTypes.func,
    customColor: PropTypes.string,
  };

  static defaultProps = {
    months: 1,
    dateRange: {
      startDate: new Date(),
      endDate: new Date(),
    },
    firstDayOfWeek: 0,
    dateFormat: 'MM-DD-YYYY',
    onChange: noop,
    onMenuEnter: noop,
    onMenuLeave: noop,
  };

  constructor(props) {
    super(props);

    moment.updateLocale('en', {
      week: {
        dow: this.props.firstDayOfWeek,
        doy: this.props.firstDayOfWeek === 0 ? 6 : 4,
      },
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
      hoveredDate: moment(),
    };

    this.weekdays = moment.weekdaysMin(true);
    this.isLocalUpdate = false;
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.selectedPreset &&
      prevProps.selectedPreset !== this.props.selectedPreset
    ) {
      // delegate handling the change to DatepickerPresets component
      return;
    }

    if (prevProps.dateRange !== this.props.dateRange) {
      if (this.isLocalUpdate) {
        this.isLocalUpdate = false;
      }

      const convertedDateRange = convertToMomentRange(this.props.dateRange);

      this.setState({
        selection: convertedDateRange,
        committedSelection: convertedDateRange,
        selectedPreset: !!this.props.selectedPreset
          ? this.state.selectedPreset
          : [],
        committedSelectedPreset: !!this.props.selectedPreset
          ? this.state.committedSelectedPreset
          : [],
      });
    }
  }

  datesRenderer = (globalOffset = 0) => {
    const { offset, today, selection, selecting, hoveredDate } = this.state;
    const { firstDayOfWeek, customColor, activeRange } = this.props;
    const { startDate, endDate } = selection;
    const dates = [];
    const monthStart = today.clone().startOf('month');
    const thisMonth = monthStart.add(globalOffset + offset, 'month');
    const total = thisMonth.daysInMonth();
    const label = thisMonth.format('MMMM YYYY');

    this.weekdays.forEach((day, index) => {
      dates.push(
        <DateContainer
          key={`date-${day}-${index}`}
          type="title"
          className="dp date-container date-container-title"
        >
          <DateIcon type="title">{day}</DateIcon>
        </DateContainer>
      );
    });

    // previews disabled dates
    for (let i = monthStart.day(); i > firstDayOfWeek; i--) {
      dates.push(
        <DateContainer
          key={`date-placeholder-${i}`}
          isDisabled
          className="dp date-container date-container-placeholder"
        />
      );
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

      let isNotInRange = false;
      if (activeRange && activeRange.length) {
        const activeStart = moment(activeRange[0]).startOf('day');
        const activeEnd = moment(activeRange[1]).startOf('day');

        if (
          current.startOf('day').isBefore(activeStart) ||
          current.startOf('day').isAfter(activeEnd)
        ) {
          isNotInRange = true;
        }
      }

      const isToday = current.isSame(today, 'day');

      const classNames = ['dp', 'date-container'];

      if (selected) classNames.push('date-container-selected');
      if (sameDay) classNames.push('date-container-same-day');
      if (isStart) classNames.push('date-container-start');
      if (isEnd) classNames.push('date-container-end');
      if (isNotInRange) classNames.push('date-container-not-in-range');
      if (isToday) classNames.push('date-container-today');
      if (!isEnd && !isStart) classNames.push('date-container-normal');

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
          isNotInRange={isNotInRange}
          className={classNames.join(' ')}
        >
          <DateIcon today={isToday} type={isStart || isEnd ? 'edge' : 'normal'}>
            {i}
          </DateIcon>
        </DateContainer>
      );
    }

    return (
      <DatesContainer
        key={`month-${globalOffset}`}
        className="dp dates-container"
      >
        <MonthTitle
          className="dp month-title"
          onClick={this.selectMonth({
            startDate: today
              .clone()
              .add(globalOffset + offset, 'month')
              .startOf('month'),
            endDate: today
              .clone()
              .add(globalOffset + offset, 'month')
              .endOf('month'),
          })}
        >
          {label}
        </MonthTitle>
        {dates}
      </DatesContainer>
    );
  };

  setHover = (hoveredDate) => {
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
      (prevState) => ({ open: !prevState.open }),
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

  next = () => this.setState((prevState) => ({ offset: prevState.offset + 1 }));

  prev = () => this.setState((prevState) => ({ offset: prevState.offset - 1 }));

  apply = () => {
    if (this.validateSelection()) {
      this.isLocalUpdate = true;

      this.setState(
        {
          committedSelection: this.state.selection,
          committedSelectedPreset: this.state.selectedPreset,
          selecting: false,
          open: false,
        },
        () => {
          const { startDate, endDate } = convertToDateRange(
            this.state.committedSelection
          );

          this.props.onChange({
            startDate,
            endDate,
            selectedPreset: get(
              [0, 'value'],
              this.state.committedSelectedPreset
            ),
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
      selectedPreset: this.state.committedSelectedPreset,
    });
  };

  handleClick = (selectedDate) => {
    const { selecting, tmpStart } = this.state;

    if (selecting) {
      if (selectedDate.isBefore(tmpStart, 'day')) {
        this.setState({
          selecting: false,
          selection: { startDate: selectedDate, endDate: tmpStart },
        });
      } else {
        this.setState({
          selecting: false,
          selection: { startDate: tmpStart, endDate: selectedDate },
        });
      }
    } else {
      this.setState({
        selecting: true,
        selection: { startDate: selectedDate, endDate: selectedDate },
        tmpStart: selectedDate,
        selectedPreset: [],
      });
    }
  };

  selectMonth = (selection) => () =>
    this.setState({ selection, selecting: false, selectedPreset: [] });

  setPreset = (preset, commitOnSet = false) => {
    this.setState(
      {
        selecting: false,
        selection: preset[0].dateRange,
        selectedPreset: preset,
        ...(commitOnSet
          ? {
              committedSelection: preset[0].dateRange,
              committedSelectedPreset: preset,
            }
          : {}),
      },
      () => {
        this.setOffset();
      }
    );
  };

  onChangeDate = (type, value) => {
    const { dateFormat, activeRange } = this.props;
    const parsed = moment(value, dateFormat);

    if (parsed.isValid()) {
      this.setState((prevState) => {
        const { selection } = prevState;

        let dateValue = moment(value, dateFormat);
        if (activeRange && activeRange.length) {
          const activeStart = moment(activeRange[0]).startOf('day');
          const activeEnd = moment(activeRange[1]).startOf('day');

          if (dateValue.startOf('day').isBefore(activeStart)) {
            dateValue = activeStart;
          }

          if (dateValue.startOf('day').isAfter(activeEnd)) {
            dateValue = activeEnd;
          }
        }
        const newSelection = set([type], dateValue, selection);

        return { selection: newSelection };
      });
    }
  };

  validateSelection = () => {
    const { selection } = this.state;

    return selection.startDate.isSameOrBefore(selection.endDate, 'day');
  };

  onKeyDown = (e) => {
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

  getPresetTitle = (preset) => {
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

  customHeaderRenderer = () => {
    const { dateFormat, headerRenderer } = this.props;
    const { selectedPreset, selection } = this.state;
    const { startDate, endDate } = selection;

    if (!isEmpty(selectedPreset)) {
      return headerRenderer({
        dateRange: selection,
        preset: selectedPreset[0],
        formattedTitle: this.getPresetTitle(selectedPreset[0]),
      });
    }

    return headerRenderer({
      dateRange: selection,
      formattedTitle: `${moment(startDate).format(dateFormat)} - ${moment(
        endDate
      ).format(dateFormat)}`,
    });
  };

  headerRenderer = () => {
    const { dateFormat, headerRenderer } = this.props;
    const { selectedPreset, selection } = this.state;
    const { startDate, endDate } = selection;

    if (isFunction(headerRenderer)) {
      return this.customHeaderRenderer();
    }

    return isEmpty(selectedPreset) ? (
      <>
        <DatePickerInput
          className="dp dp-input dp-input-start"
          date={startDate}
          dateFormat={dateFormat}
          placeholder="Start date"
          onClick={this.openPopup}
          onKeyDown={this.onKeyDown}
          onChange={(value) => this.onChangeDate('startDate', value)}
        />
        <Separator className="dp dp-input-separator">-</Separator>
        <DatePickerInput
          className="dp dp-input dp-input-end"
          date={endDate}
          dateFormat={dateFormat}
          placeholder="End date"
          onClick={this.openPopup}
          onKeyDown={this.onKeyDown}
          onChange={(value) => this.onChangeDate('endDate', value)}
        />
      </>
    ) : (
      <Ellipsis>{this.getPresetTitle(selectedPreset[0])}</Ellipsis>
    );
  };

  isValueEmpty = () => {
    const { selection, selectedPreset } = this.state;

    return (
      isEmpty(selectedPreset) &&
      !selection.startDate.isValid() &&
      !selection.endDate.isValid()
    );
  };

  render() {
    const { open, selectedPreset } = this.state;
    const {
      months,
      firstDayOfWeek,
      onMenuEnter,
      onMenuLeave,
      customPresets,
      bodyRenderer,
      customColor,
      placeholder,
    } = this.props;
    const monthsElement = [];
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
            className="dp dp-header-row"
          >
            <div>
              <StyledCalendar />
            </div>

            {placeholder && this.isValueEmpty() ? (
              <Placeholder className="placeholder-container">
                <InnerPlaceholder className="placeholder-label">
                  {placeholder}
                </InnerPlaceholder>
              </Placeholder>
            ) : (
              <React.Fragment>
                {this.headerRenderer()}

                <div>
                  <StyledArrowDown rotation={open ? '180deg' : '0deg'} />
                </div>
              </React.Fragment>
            )}
          </DatepickerHeaderRow>

          <Container
            className={`dp-dropdown ${open ? 'open' : 'closed'}`}
            visible={open}
            total={months}
          >
            <DatepickerPresets
              onChange={this.setPreset}
              selectedPreset={selectedPreset}
              controlledSelectedPreset={this.props.selectedPreset}
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
      background: ${customColor || theme.a400};
    `};

  ${({ type }) =>
    type === 'title' &&
    css`
      pointer-events: none;
    `};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
    `};

  ${({ isNotInRange, theme }) =>
    isNotInRange &&
    css`
      pointer-events: none;
      div {
        color: ${theme.p200} !important;
      }
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

const Placeholder = styled.div`
  width: 202px;
  height: 19px;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const InnerPlaceholder = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 190px;
`;
