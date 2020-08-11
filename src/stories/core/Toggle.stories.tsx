import React, { useState } from "react";

import Toggle, { ToggleProps } from "packages/core/Toggle";

export const Default = (props: ToggleProps) => {
  const [isChecked, setIsChecked] = useState(props.isChecked);

  return (
    <Toggle
      {...props}
      isChecked={isChecked}
      onClick={() => setIsChecked((curr) => !curr)}
    />
  );
};

Default.args = {
  onClick: () => {},
  isChecked: true,
  isDisabled: false,
  label: "Toggle",
};

export default {
  title: "Core/Toggle",
  component: Toggle,
  argTypes: {},
};
