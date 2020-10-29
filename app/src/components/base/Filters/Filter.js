import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { find } from 'lodash/fp';

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
    dropDownOptions,
    onRemove,
    index,
    total,
    onChange,
    rowData,
    searchableOperator,
    className
  } = props;

  const initialValue = useRef(rowData.value);
  const prevDimension = useRef(rowData.dimension);

  const [selectedDropDownValue, setSelectedDropDownValue] = useState([]);

  const { dropDowns, dimensionsWithDropDowns } = useMemo(() => {
    const result = [];
    for (const dropdownOption of dropDownOptions) {
      result[dropdownOption.dimension] = dropdownOption.options;
    }
    return { dropDowns: result, dimensionsWithDropDowns: Object.keys(result) };
  }, [dropDownOptions]);

  const useDropDown = useMemo(
    () =>
      rowData.dimension &&
      rowData.dimension.length &&
      dimensionsWithDropDowns.includes(rowData.dimension[0].value),
    [rowData, dimensionsWithDropDowns]
  );

  const dimensionDropDownOptions = useMemo(
    () =>
      rowData.dimension &&
      rowData.dimension.length &&
      dropDowns[rowData.dimension[0].value],
    [rowData, dropDowns]
  );

  useEffect(
    function initializeDropDown() {
      if (initialValue && useDropDown) {
        const selectedValue = find(
          op => op.value === initialValue.current,
          dimensionDropDownOptions
        );
        setSelectedDropDownValue(selectedValue ? [selectedValue] : []);
      }
    },
    [dropDownOptions]
  );

  const removeFilter = useCallback(() => {
    onRemove(index);
  }, [index, onRemove]);

  const handleDimensionChange = useCallback(
    values => {
      /*** delete the filter value if switching to or from a dimension that has a dropdown instead of free text ***/
      const deleteValue =
        values && values.length && prevDimension.current.length
          ? dimensionsWithDropDowns.includes(values[0].value) ||
            dimensionsWithDropDowns.includes(prevDimension.current[0].value)
          : false;
      prevDimension.current = values;
      onChange({ key: 'dimension', value: values, index }, deleteValue);
    },
    [index, onChange, dimensionsWithDropDowns]
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

  const handleDropDownValueChange = useCallback(
    values => {
      setSelectedDropDownValue(values);
      onChange({ key: 'value', value: values[0].value, index });
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

      {useDropDown ? (
        <StyledSelect
          className="select-dimension-drop-down"
          options={dimensionDropDownOptions}
          onChange={handleDropDownValueChange}
          values={selectedDropDownValue}
          placeholder="Select..."
          searchable
        ></StyledSelect>
      ) : (
        <StyledInput
          placeholder="Free text"
          onChange={handleValueChange}
          value={rowData.value}
        />
      )}
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
