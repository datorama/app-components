import React, { useCallback } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

// COMPONENTS
import Select from '../Select/Select';
import TextInput from '../TextInput';
import TrashIcon from '../../icons/Trash.icon';

export const operators = [
  { value: 'CONTAINS', label: 'contains' },
  { value: 'NOT_CONTAINS', label: 'not contains' }
];

const Filter = props => {
  const { dimensions, onRemove, index, total, onChange, rowData } = props;

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
    <Row zIndex={total - index}>
      <Select
        options={dimensions}
        onChange={handleDimensionChange}
        values={rowData.dimension}
        placeholder="Dimension"
      />
      <SelectOperator
        options={operators}
        onChange={handleOperatorChange}
        values={rowData.operator}
        placeholder="operator"
      />
      <TextInput
        placeholder="value"
        onChange={handleValueChange}
        value={rowData.value}
      />
      <TrashContainer onClick={removeFilter}>
        <StyledTrashIcon className="trash-icon" />
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
  rowData: PropTypes.object
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

  @keyframes fade {
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const SelectOperator = styled(Select)`
  margin: 0 5px;

  .header {
    width: 130px;
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
  width: 22px;

  path {
    fill: ${({ theme }) => theme.p600};
  }
`;
