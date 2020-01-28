import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { uuid } from '../../utils';
import { find, get, filter as lodashFilter } from 'lodash/fp';

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
  <OperatorContainer className="filters-operator">
    <OperatorDivider className="operator-divider" />
    <Operator className="operator-value">AND</Operator>
    <OperatorDivider className="operator-divider" />
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
  initialState,
  searchableOperator = false
}) => {
  const [state, setState] = useState({
    rows: initialState
      ? initialState.map(filter => ({
          value: filter.val,
          id: uuid(),
          dimension: lodashFilter(Boolean, [
            find(fi => fi.value === filter.dimension, dimensions)
          ]),
          operator: lodashFilter(Boolean, [
            find(op => op.value === filter.operator, operators)
          ])
        }))
      : [emptyState()],
    exiting: null
  });

  const updateParent = useCallback(
    rows => {
      if (onChange) {
        onChange(
          rows.map(row => ({
            val: row.value,
            operator: get('operator[0].value', row),
            dimension: get('dimension[0].value', row)
          }))
        );
      }
    },
    [onChange]
  );

  const addFilter = useCallback(() => {
    const rows = [...state.rows, emptyState()];

    setState({
      ...state,
      rows
    });

    updateParent(rows);
  }, [state, updateParent]);

  const handleRemove = useCallback(
    index => {
      if (state.rows.length > min) {
        setState({ ...state, exiting: index });
      } else {
        const rows = state.rows.map((row, i) =>
          i === index ? emptyState(row.id) : row
        );

        setState({
          ...state,
          rows
        });

        updateParent(rows);
      }
    },
    [min, state, updateParent]
  );

  const handleFilterChange = useCallback(
    ({ key, value, index }) => {
      const rows = state.rows.map((row, i) => ({
        ...row,
        [key]: i === index ? value : row[key]
      }));

      setState({
        ...state,
        rows
      });

      updateParent(rows);
    },
    [state, updateParent]
  );

  useEffect(() => {
    if (typeof state.exiting === 'number') {
      setTimeout(() => {
        const rows = state.rows.filter(
          (_, filterIndex) => filterIndex !== state.exiting
        );

        setState({
          ...state,
          rows,
          exiting: null
        });

        updateParent(rows);
      }, 300);
    }
  }, [onChange, state, updateParent]);

  return (
    <Container height={74 + (state.rows.length - 1) * 84} className={className}>
      {state.rows.map((row, index) => {
        const showOperator = state.rows[index] && state.rows[index - 1];

        return (
          <Column
            className="filters-row"
            animation={state.exiting === index ? 'exit' : 'enter'}
            key={row.id}
            top={index === 0 ? 0 : 42 + (index - 1) * 84}
          >
            {showOperator && <FilterOperator />}

            <Filter
              className="filter"
              index={index}
              total={state.rows.length}
              dimensions={dimensions}
              onRemove={handleRemove}
              onChange={handleFilterChange}
              rowData={row}
              searchableOperator={searchableOperator}
            />
          </Column>
        );
      })}

      <Footer
        className="filters-footer"
        top={42 + (state.rows.length - 1) * 84}
      >
        {state.rows.length < max && (
          <AddButton className="add-filter" onClick={addFilter}>
            + CONDITION
          </AddButton>
        )}
        {state.rows.length >= max && (
          <FooterInfo className="filter-footer-info" max={max} />
        )}
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
  initialState: PropTypes.array,
  searchableOperator: PropTypes.bool
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
  font-size: 14px;
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
  transform: rotate(180deg);
  path {
    fill: ${({ theme }) => theme.p600};
  }
`;
