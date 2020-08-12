import React, { useState } from "react";

// Components
import SegmentedButton, { SegmentedButtonProps } from "packages/core/SegmentedButton";

export const Default = (props: SegmentedButtonProps) => {
  const [selected, setSelected] = useState<string | number>(0);

  return (
    <SegmentedButton
      {...props}
      onClick={setSelected}
      selected={selected}
    />
  );
};

Default.args = {
  sections: [
    {
      id: 0,
      label: "No",
    },
    {
      id: 1,
      label: "Maybe",
    },
    {
      id: 2,
      label: "Yes",
    },
  ],
};

export default {
  title: "Core/Segmented Button",
  component: SegmentedButton,
};
