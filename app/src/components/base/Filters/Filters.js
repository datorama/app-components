import React, {
  useCallback,
  useMemo,
  useState,
  useRef,
  useEffect
} from 'react';
import styled from 'styled-components';
import uuid from 'uuid';
import { debounce, noop, pullAt, set, map, omit } from 'lodash/fp';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';

import Filter from './Filter';
import FiltersDivider from './FiltersDivider';
import FiltersGutter from './FiltersGutter';
import { HEIGHTS, OPERATOR } from './filter.consts';

export const useIsShrinking = filters => {
  const previousFilters = useRef(filters.length);
  useEffect(() => {
    previousFilters.current = filters.length;
  }, [filters.length]);
  return useMemo(() => filters.length < previousFilters.current, [
    filters.length
  ]);
};

const defaultInitialState = [
  { val: '', dimension: null, operator: OPERATOR.CONTAINS }
];

const addIds = filters => map(filter => set('id', uuid(), filter), filters);
const removeIds = filters => map(filter => omit('id', filter), filters);
const Filters = ({
  dimensions = [],
  maxFilters = 3,
  onChange = noop,
  initialState,
  andColor,
  deleteIconColor,
  warningColor,
  dividerColor,
  textInputBackground,
  menuBackground
}) => {
  const [filters, setFilters] = useState(
    addIds(initialState || defaultInitialState)
  );
  const onFiltersChange = useCallback(
    nextFiltersState => {
      setFilters(nextFiltersState);
      onChange(removeIds(nextFiltersState));
    },
    [onChange]
  );

  const isShowDivider = useCallback(
    index => {
      if (filters.length === 1) return false;

      return index < filters.length - 1;
    },
    [filters.length]
  );

  const isShowAddition = useMemo(() => filters.length < maxFilters, [
    filters.length,
    maxFilters
  ]);

  const isShowWarning = useMemo(() => filters.length === maxFilters, [
    filters.length,
    maxFilters
  ]);

  const numDividers = useMemo(() => filters.length - 1, [filters.length]);

  const containerHeight = useMemo(
    () =>
      filters.length * HEIGHTS.FILTER_ROW +
      numDividers * HEIGHTS.DIVIDER_ROW +
      HEIGHTS.GUTTER_ROW,
    [filters.length, numDividers]
  );

  const isShrinking = useIsShrinking(filters);

  const onAddFilter = useCallback(() => {
    const nextFilters = [
      ...filters,
      { val: '', dimension: null, operator: OPERATOR.CONTAINS, id: uuid() }
    ];
    onFiltersChange(nextFilters);
  }, [filters, onFiltersChange]);

  const onRemoveFilter = useCallback(
    index => {
      if (filters.length === 1 && index === 0) {
        onFiltersChange(set('[0].val', '', filters));

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
    <motion.div
      animate={{ height: containerHeight }}
      transition={{ delay: isShrinking && 0.3, duration: 0.3 }}
    >
      <FiltersWrapper>
        <AnimatePresence initial={false}>
          {filters.map(({ val, dimension, operator, id }, index) => (
            <FilterWrapper key={id}>
              <motion.div
                key={`${id}_Filter`}
                style={{ width: '100%' }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.3, duration: 0.3, ease: 'easeOut' }
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.3, ease: 'easeOut' }
                }}
              >
                <FilterRow>
                  <Filter
                    index={index}
                    val={val}
                    dimension={dimension}
                    dimensions={dimensions}
                    operator={operator}
                    updateFilter={onUpdateFilter}
                    removeFilter={onRemoveFilter}
                    deleteIconColor={deleteIconColor}
                    textInputBackground={textInputBackground}
                    menuBackground={menuBackground}
                  />
                </FilterRow>
              </motion.div>
              <FiltersDivider
                key={`${id}_Divider`}
                showDivider={isShowDivider(index)}
                dividerColor={dividerColor}
                andColor={andColor}
              />
            </FilterWrapper>
          ))}
        </AnimatePresence>
        <FiltersGutter
          showAddition={isShowAddition}
          showWarning={isShowWarning}
          numFilters={filters.length}
          maxFilters={maxFilters}
          onAddFilter={onAddFilter}
          warningColor={warningColor}
        />
      </FiltersWrapper>
    </motion.div>
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
  dividerColor: PropTypes.string,
  textInputBackground: PropTypes.string,
  menuBackground: PropTypes.string
};

const FiltersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 640px;
  justify-content: flex-end;
`;

const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
`;

const FilterRow = styled.div`
  height: ${HEIGHTS.FILTER_ROW}px;
`;

export default Filters;
