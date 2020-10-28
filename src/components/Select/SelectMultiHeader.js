import React, { Fragment } from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

// components
import { Label, Option } from './Select.common';
import { optionsType } from './Select.types';
import { Checkbox } from '../Checkbox';

const SelectMultiHeader = (props) => {
  const { values, multi, selectAll, total } = props;

  if (!multi || !total) {
    return null;
  }

  const counts = `(${values.length}/${total})`;
  let label = 'Select all';

  let allSelected = false;
  let partialSelected = values.length && values.length < total;

  if (total === values.length) {
    allSelected = true;
  }

  if (allSelected || partialSelected) {
    label = 'Deselect all';
  }

  return (
    <Fragment>
      <Option className="option" onClick={selectAll} margin="5px 0 0 0">
        <StyledCheckbox
          checked={!!allSelected || !!partialSelected}
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
