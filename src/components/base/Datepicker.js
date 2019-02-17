import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import ClickOut from './ClickOut';

// assets
// import chevronIcon from './chevron.svg';

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

    for (let i = 1; i <= total; i++) {
      const current = thisMonth.clone().set('date', i);
      let selected = current.isBetween(selection[0], selection[1], null, '[]');

      // todo: rename
      const selectingEnd = selection[1] || selecting;

      // check selected while selecting
      if (
        selecting &&
        current.isBetween(selection[0], hoveredDate, null, '[]')
      ) {
        selected = true;
      }

      dates.push(
        <DateContainer
          key={`date-${i}`}
          onClick={() => this.handleClick(current.format('YYYY-MM-DD'))}
          onMouseEnter={() => this.setHover(current.format('YYYY-MM-DD'))}
          //onMouseLeave={this.setHover}
          selected={selected}
          isStart={current.format('YYYY-MM-DD') === selection[0]}
          isEnd={
            current.format('YYYY-MM-DD') === selectingEnd ||
            current.format('YYYY-MM-DD') === hoveredDate
          }
        >
          <DateIcon
            today={today.day() === i - 1 && !(globalOffset + offset)}
            isStart={current.format('YYYY-MM-DD') === selection[0]}
            isEnd={
              current.format('YYYY-MM-DD') === selectingEnd &&
              current.format('YYYY-MM-DD') === hoveredDate
            }
          >
            {i}
          </DateIcon>
        </DateContainer>
      );
    }

    return (
      <DatesContainer>
        <Title>{label}</Title>
        {dates}
      </DatesContainer>
    );
  };

  setHover = (date = null) => this.setState({ hoveredDate: date });

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
            <Control
              onClick={this.prev}
              style={{ transform: 'rotate(-180deg)' }}
            />
            <Control onClick={this.next} />
          </Header>

          <Dates>
            {this.datesRenderer()}
            {this.datesRenderer(1)}
          </Dates>
        </Container>
      </ClickOut>
    );
  }
}

export default Datepicker;

const Container = styled.div`
  user-select: none;
  width: 500px;
  height: calc((250px - 20px) / 7 * 5 + 60px + 30px);
  background: ${({ theme }) => theme.p0};
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

const Control = styled.div`
  width: 16px;
  height: 16px;
  background: ${({ theme }) => theme.a200};
  background-size: contain;
  cursor: pointer;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  font-size: 14px;
  align-items: center;
  font-weight: 300;
  color: ${({ theme }) => theme.p600};
  width: 100%;
  height: 20px;
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
  //transition: all 100ms;

  ${({ selected, isStart, isEnd, theme }) =>
    selected &&
    css`
      background: ${theme.a100};
      border-bottom-left-radius: ${isStart ? '50%' : 0};
      border-top-left-radius: ${isStart ? '50%' : 0};
      border-bottom-right-radius: ${isEnd ? '50%' : 0};
      border-top-right-radius: ${isEnd ? '50%' : 0};
    `}
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

  ${({ today, theme }) =>
    today &&
    css`
      // border: 1px solid ${theme.p600};
      border-radius: 2px;
    `}

  ${({ isStart, isEnd, theme }) =>
    (isStart || isEnd) &&
    css`
      // background: ${theme.a400} !important;
    `}
  
  &:hover {
    //background: #dadada;
  }
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
