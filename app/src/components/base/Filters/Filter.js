import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// COMPONENTS
import Select from '../Select/Select';
import TextInput from '../TextInput';
import TrashIcon from '../../icons/Trash.icon';

export const operators = [
  { value: 'CONTAINS', label: 'Contains' },
  { value: 'NOT_CONTAINS', label: 'Not Contains' }
];

const Filter = props => {
  const {
    dimensions,
    onRemove,
    index,
    total,
    onChange,
    rowData,
    searchableOperator,
    className
  } = props;

  const removeFilter = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  const handleDimensionChange = useCallback(
    values => {
      onChange({ key: 'dimension', value: values, index });
    },
    [index, onChange]
  );

  const handleOperatorChange = useCallback(
    values => {
      onChange({ key: 'operator', value: values, index });
    },
    [index, onChange]
  );

  const handleValueChange = useCallback(
    e => {
      onChange({ key: 'value', value: e.target.value, index });
    },
    [index, onChange]
  );

  return (
    <Row zIndex={total - index} className={className}>
      <StyledSelect
        className="select-dimension"
        options={dimensions}
        onChange={handleDimensionChange}
        values={rowData.dimension}
        placeholder="Select Dimension"
        searchable
      />
      <OperatorContainer className="select-operator-container">
        <SelectOperator
          className="select-operator"
          options={operators}
          onChange={handleOperatorChange}
          values={rowData.operator}
          placeholder="operator"
          searchable={searchableOperator}
        />
      </OperatorContainer>
      <StyledInput
        placeholder="Free text"
        onChange={handleValueChange}
        value={rowData.value}
      />
      <TrashContainer className="trash-icon" onClick={removeFilter}>
        <StyledTrashIcon />
      </TrashContainer>
    </Row>
  );
};

Filter.propTypes = {
  dimensions: PropTypes.arrayOf(PropTypes.object),
  onRemove: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number,
  onChange: PropTypes.func,
  rowData: PropTypes.object,
  searchableOperator: PropTypes.bool
};

export default Filter;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  opacity: 0;
  height: 32px;
  visibility: hidden;
  z-index: ${({ zIndex }) => zIndex || 0};
  animation: 500ms ease-out 0s 1 fade forwards;
  justify-content: space-between;

  @keyframes fade {
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const StyledSelect = styled(Select)`
  width: 100%;

  .header {
    width: 100%;
  }
`;

const StyledInput = styled(TextInput)`
  max-width: 100%;
`;

const OperatorContainer = styled.div`
  margin: 0 10px;
  width: 100%;
`;
const SelectOperator = styled(Select)`
  width: 100%;

  .header {
    width: 100%;
  }
`;

const TrashContainer = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 2px;
  transition: all 300ms;
  margin-left: 5px;

  &:hover {
    background: ${({ theme }) => theme.p100};
  }
`;

const StyledTrashIcon = styled(TrashIcon)`
  width: 30px;

  path {
    fill: ${({ theme }) => theme.p300};
  }
`;
