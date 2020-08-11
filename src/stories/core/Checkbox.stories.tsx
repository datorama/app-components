import React, { useState } from "react";

import Checkbox, { CheckboxProps } from "packages/core/Checkbox";

export const Default = (props: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  return (
    <Checkbox
      {...props}
      isChecked={isChecked}
      onClick={() => setIsChecked((curr) => !curr)}
    />
  );
};

Default.args = {
  onClick: () => {},
  isChecked: true,
  label: "Checkbox",
};

// -----------------

export const PartialCheckbox = (props: CheckboxProps) => <Default {...props} />;

PartialCheckbox.args = {
  onClick: () => {},
  isChecked: true,
  label: "Partial",
  isPartial: true,
};

// -----------------

export const RoundCheckbox = (props: CheckboxProps) => <Default {...props} />;

RoundCheckbox.args = {
  onClick: () => {},
  isChecked: true,
  label: "Round",
  isRound: true,
};

// -----------------

export default {
  title: "Core/Checkbox",
  component: Checkbox,
  argTypes: {},
};
