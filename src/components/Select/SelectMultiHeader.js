import React, { Fragment } from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import { hasGroups } from './select.utils';

// components
import { Label, Option } from './Select.common';
import { optionsType } from './Select.types';
import { Checkbox } from '../Checkbox';

const SelectMultiHeader = (props) => {
  const { values, multi, selectAll, total, options } = props;

  if (!multi || !total) {
    return null;
  }

  const grouped = hasGroups(options);
  const filtereValues = grouped
    ? values.filter((selected) =>
        options.some((option) => {
          option.options.some((o) => o.value === selected.value);
        })
      )
    : values.filter((selected) =>
        options.some((option) => option.value === selected.value)
      );
  const counts = `(${filtereValues.length}/${options.length})`;
  const allSelected = filtereValues.length === options.length;
  const partialSelected =
    filtereValues.length && filtereValues.length < options.length;
  const anythingSelected = !!allSelected || !!partialSelected;
  const isDeselectMode = grouped
    ? !anythingSelected && values.length > 0
    : anythingSelected;
  const label = isDeselectMode ? 'Deselect all' : 'Select all';

  const handleSelect = () => {
    selectAll(isDeselectMode);
  };

  return (
    <Fragment>
      <Option className="option" onClick={handleSelect} margin="5px 0 0 0">
        <StyledCheckbox
          checked={isDeselectMode}
          partial={!!partialSelected}
          className="menu-option-checkbox"
        />
        <Label className="menu-option-label multi-select">
          {label} <Italic>{counts}</Italic>
        </Label>
      </Option>

      <Divider className="menu-options-divider" />
    </Fragment>
  );
};

SelectMultiHeader.propTypes = {
  selectAll: PropTypes.func,
  values: optionsType,
  options: optionsType,
  multi: PropTypes.bool,
  total: PropTypes.number,
};

export default SelectMultiHeader;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) => theme.p100};
`;

const StyledCheckbox = styled(Checkbox)`
  margin-right: 10px;
`;

const Italic = styled.span`
  ${({ theme }) => theme.text.smItalic};
`;
