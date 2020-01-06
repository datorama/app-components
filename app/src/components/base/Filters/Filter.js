import React, { useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { find, get, map, identity } from 'lodash/fp';

import Select from '../Select/Select';
import TextInput from '../TextInput';

import DeleteIcon from '../../icons/Delete.icon';

import { OPERATOR } from './filter.consts';

const OPERATOR_OPTIONS = {
  [OPERATOR.CONTAINS]: {
    value: OPERATOR.CONTAINS,
    label: 'Contains'
  },
  [OPERATOR.NOT_CONTAINS]: {
    value: OPERATOR.NOT_CONTAINS,
    label: 'Not Contains'
  }
};

const Filter = ({
  dimensions,
  val,
  updateFilter,
  operator,
  dimension,
  removeFilter,
  index
}) => {
  const remove = useCallback(() => removeFilter(index), [index, removeFilter]);
  const onValChange = useCallback(
    ({ target: { value } }) => updateFilter(index, 'val', value),
    [index, updateFilter]
  );
  const onOperatorChange = useCallback(
    operator => updateFilter(index, 'operator', get([0, 'value'], operator)),
    [index, updateFilter]
  );
  const onDimensionChange = useCallback(
    dimension => updateFilter(index, 'dimension', get([0, 'value'], dimension)),
    [index, updateFilter]
  );
  const currentDimension = useMemo(
    () => find({ value: dimension }, dimensions),
    [dimension, dimensions]
  );

  return (
    <Container>
      <Select
        className="dimension-select"
        searchable
        options={dimensions}
        values={currentDimension ? [currentDimension] : []}
        onChange={onDimensionChange}
        placeholder="Select Dimension"
      />

      <Select
        className="operator-select"
        options={map(identity, OPERATOR_OPTIONS)}
        values={[OPERATOR_OPTIONS[operator]]}
        onChange={onOperatorChange}
      />

      <TextInput
        value={val}
        onChange={onValChange}
        placeholder="Free text"
        className="free-text-input"
      />

      <StyledDeleteIcon onClick={remove} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  #delete-icon {
    cursor: pointer;
  }

  .header,
  .text-input {
    color: ${({ theme }) => theme.p700};
    background-color: rgba(255, 255, 255, 0.2) !important;
  }

  .menu,
  .menu-search-input {
    background-color: #4a5467 !important;
  }

  .dimension-select {
    .header {
      width: 186px !important;
    }
  }

  .operator-select {
    .header {
      width: 140px !important;
    }
  }

  .free-text-input {
    max-width: 251px;
  }
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  path {
    fill: ${({ theme }) => theme.p600};
  }
  cursor: pointer;
`;

export default Filter;
