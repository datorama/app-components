import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import { debounce, noop, pullAt, set } from 'lodash/fp';
import PropTypes from 'prop-types';

import Filter from './Filter';
import { OPERATOR } from './filter.consts';

import InfoIcon from '../../icons/Info.icon';
import PlusIcon from '../../icons/Plus.icon';

const defaultInitialState = [
  { val: '', dimension: null, operator: OPERATOR.CONTAINS }
];

const Filters = ({
  dimensions = [],
  maxFilters = 3,
  onChange = noop,
  initialState = null,
  andColor,
  deleteIconColor,
  warningColor,
  dividerColor
}) => {
  const [filters, setFilters] = useState(initialState || defaultInitialState);
  const onFiltersChange = useCallback(
    nextFiltersState => {
      setFilters(nextFiltersState);
      onChange(nextFiltersState);
    },
    [onChange]
  );

  const isShowDivider = useCallback(
    index => {
      if (filters.length === 1) return false;

      return index < maxFilters - 1;
    },
    [filters.length, maxFilters]
  );

  const isShowAddition = useMemo(() => filters.length < maxFilters, [
    filters.length,
    maxFilters
  ]);

  const onAddFilter = useCallback(() => {
    const nextFilters = [
      ...filters,
      { val: '', dimension: null, operator: OPERATOR.CONTAINS }
    ];
    onFiltersChange(nextFilters);
  }, [filters, onFiltersChange]);

  const onRemoveFilter = useCallback(
    index => {
      if (filters.length === 1 && index === 0) {
        const nextFilters = [
          { val: '', dimension: null, operator: OPERATOR.CONTAINS }
        ];

        onFiltersChange(nextFilters);

        return;
      }

      const nextFilters = pullAt(index, filters);

      onFiltersChange(nextFilters);
    },
    [filters, onFiltersChange]
  );

  const onUpdateFilter = useCallback(
    debounce(10, (index, key, value) => {
      const nextFilters = set([index, key], value, filters);

      onFiltersChange(nextFilters);
    }),
    [filters]
  );

  return (
    <FiltersWrapper>
      {filters.map(({ val, dimension, operator }, index) => (
        <FilterWrapper key={index}>
          <Filter
            index={index}
            val={val}
            dimension={dimension}
            dimensions={dimensions}
            operator={operator}
            updateFilter={onUpdateFilter}
            removeFilter={onRemoveFilter}
            deleteIconColor={deleteIconColor}
          />

          {isShowDivider(index) && (
            <DividerWrapper>
              <Divider dividerColor={dividerColor} />
              <And andColor={andColor}>AND</And>
              <Divider />
            </DividerWrapper>
          )}
        </FilterWrapper>
      ))}
      {isShowAddition && (
        <AddConditionWrapper>
          <AddCondition onClick={onAddFilter}>
            <StyledPlusIcon />
            CONDITION
          </AddCondition>
        </AddConditionWrapper>
      )}

      {filters.length === maxFilters && (
        <Info warningColor={warningColor}>
          <StyledInfoIcon warningColor={warningColor} />
          {`You can create up to ${maxFilters} filters`}
        </Info>
      )}
    </FiltersWrapper>
  );
};

Filters.propTypes = {
  dimensions: PropTypes.array.isRequired,
  maxFilters: PropTypes.number,
  onChange: PropTypes.func,
  initialState: PropTypes.array,
  andColor: PropTypes.string,
  deleteIconColor: PropTypes.string,
  warningColor: PropTypes.string,
  dividerColor: PropTypes.string
};

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 640px;
  padding-top: 70px;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
`;

const AddConditionWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: ${({ theme }) => theme.p700};
  font-weight: bold;
`;

const AddCondition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }
`;

const DividerWrapper = styled.div`
  height: 17px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 25px;
`;

const Divider = styled.div`
  flex: 1;
  height: 1px;
  opacity: 0.34;
  background-color: ${({ theme, dividerColor }) => dividerColor || theme.p200};
`;

const And = styled.div`
  height: 100%;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme, andColor }) => andColor || theme.p600};
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${({ theme, warningColor }) => warningColor || theme.p400};

  svg {
    margin-right: 5px;
  }
`;

const StyledPlusIcon = styled(PlusIcon)`
  path {
    fill: ${({ theme }) => theme.p600};
  }
  cursor: pointer;
`;

const StyledInfoIcon = styled(InfoIcon)`
  path {
    fill: ${({ theme, warningColor }) => warningColor || theme.p600};
  }
`;

export default Filters;