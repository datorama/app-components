import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { uuid } from '../../utils';
import { find, get } from 'lodash/fp';

// CONSTANTS
import { operators } from './Filter';

// COMPONENTS
import Filter from './Filter';
import InfoIcon from '../../icons/Info.icon';

const emptyState = id => ({
  dimension: [],
  operator: [],
  value: '',
  id: id || uuid()
});
const FilterOperator = () => (
  <OperatorContainer>
    <OperatorDivider className="filters-divider" />
    <Operator className="filters-operator">AND</Operator>
    <OperatorDivider />
  </OperatorContainer>
);

const FooterInfo = ({ max }) => (
  <Info className="filters-info">
    <StyledInfoIcon />
    You can create up to {max} filters
  </Info>
);

const Filters = ({
  className,
  dimensions,
  onChange,
  min,
  max,
  initialState
}) => {
  const [touched, setTouched] = useState(false);
  const [state, setState] = useState({
    rows: initialState
      ? initialState.map(filter => ({
          value: filter.val,
          id: uuid(),
          dimension: [find(fi => fi.value === filter.dimension, dimensions)],
          operator: [find(op => op.value === filter.operator, operators)]
        }))
      : [emptyState()],
    exiting: null
  });

  const addFilter = useCallback(() => {
    setTouched(true);
    setState({
      ...state,
      rows: [...state.rows, emptyState()]
    });
  }, [state]);

  const handleRemove = useCallback(
    index => {
      setTouched(true);

      if (state.rows.length > min) {
        setState({ ...state, exiting: index });
      } else {
        setState({
          ...state,
          rows: state.rows.map((row, i) =>
            i === index ? emptyState(row.id) : row
          )
        });
      }
    },
    [min, state]
  );

  const handleFilterChange = useCallback(
    ({ key, value, index }) => {
      setTouched(true);

      setState({
        ...state,
        rows: state.rows.map((row, i) => ({
          ...row,
          [key]: i === index ? value : row[key]
        }))
      });
    },
    [state]
  );

  useEffect(() => {
    if (typeof state.exiting === 'number') {
      setTimeout(() => {
        setState({
          ...state,
          rows: state.rows.filter(
            (_, filterIndex) => filterIndex !== state.exiting
          ),
          exiting: null
        });
      }, 300);
    } else {
      if (onChange && touched) {
        onChange(
          state.rows.map(row => ({
            val: row.value,
            operator: get('operator[0].value', row),
            dimension: get('dimension[0].value', row)
          }))
        );
      }
    }
  }, [onChange, state, touched]);

  return (
    <Container height={74 + (state.rows.length - 1) * 84} className={className}>
      {state.rows.map((row, index) => {
        const showOperator = state.rows[index] && state.rows[index - 1];

        return (
          <Column
            animation={state.exiting === index ? 'exit' : 'enter'}
            key={row.id}
            top={index === 0 ? 0 : 42 + (index - 1) * 84}
          >
            {showOperator && <FilterOperator />}

            <Filter
              index={index}
              total={state.rows.length}
              dimensions={dimensions}
              onRemove={handleRemove}
              onChange={handleFilterChange}
              rowData={row}
            />
          </Column>
        );
      })}

      <Footer top={42 + (state.rows.length - 1) * 84}>
        {state.rows.length < max && (
          <AddButton onClick={addFilter}>+ Condition</AddButton>
        )}
        {state.rows.length >= max && <FooterInfo max={max} />}
      </Footer>
    </Container>
  );
};

Filters.propTypes = {
  dimensions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  className: PropTypes.string,
  initialState: PropTypes.array
};

export default Filters;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;
  position: relative;
  transition: all 300ms;
  height: ${({ height }) => height}px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 300ms;
  opacity: ${({ animation }) => (animation === 'exit' ? 0 : 1)};
  position: absolute;
  top: ${({ top }) => top}px;
`;

const Footer = styled.div`
  height: 32px;
  display: flex;
  width: 510px;
  align-items: center;
  justify-content: center;
  position: absolute;
  transition: all 300ms;
  left: 0;
  top: ${({ top }) => top}px;
`;

const AddButton = styled.div`
  color: ${({ theme }) => theme.p600};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 300ms;

  &:hover {
    color: ${({ theme }) => theme.a400};
  }
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.p400};
`;

const OperatorContainer = styled.div`
  width: 510px;
  display: flex;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
  opacity: 0;
  visibility: hidden;
  animation: 500ms ease-out 0s 1 fade forwards;

  @keyframes fade {
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const Operator = styled.div`
  color: ${({ theme }) => theme.p600};
  font-size: 12px;
  font-weight: 500;
  margin: 0 5px;
`;

const OperatorDivider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.p200};
`;

const StyledInfoIcon = styled(InfoIcon)`
  margin-right: 5px;
  path {
    fill: ${({ theme }) => theme.p600};
  }
`;
