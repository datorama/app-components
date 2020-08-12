import React, { Fragment } from "react";
import styled from "styled-components";

import Checkbox from "packages/core/Checkbox";
import { Label, Option } from "packages/select/common";

import { GroupOptionType, OptionType } from "packages/select/types";

interface SelectMultiHeader {
  selectAll?: () => void;
  values: OptionType[] | GroupOptionType[];
  isMulti?: boolean;
  total: number;
  className?: string;
  options: OptionType[] | GroupOptionType[];
}

const SelectMultiHeader = (props: SelectMultiHeader) => {
  const { values, isMulti, selectAll, total } = props;

  if (!isMulti || !total) {
    return null;
  }

  const counts = `(${values.length}/${total})`;
  let label = "Select all";

  let allSelected = false;
  let partialSelected = values.length && values.length < total;

  if (total === values.length) {
    allSelected = true;
  }

  if (allSelected || partialSelected) {
    label = "Deselect all";
  }

  return (
    <Fragment>
      <Option className="option" onClick={selectAll} margin="5px 0 0 0">
        <StyledCheckbox
          isChecked={allSelected || !!partialSelected}
          isPartial={!!partialSelected}
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

export default SelectMultiHeader;
