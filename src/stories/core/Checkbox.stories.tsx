import React from "react";

import Checkbox, { CheckboxProps } from "packages/core/Checkbox";

export const Default = (props: CheckboxProps) => {
  return <Checkbox {...props} />;
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
  label: "Partial",
  isRound: true,
};

// -----------------

export default {
  title: "Core/Checkbox",
  component: Checkbox,
  argTypes: {},
};
