import React, { useState } from "react";

// Components
import SegmentedButton, { SegmentedButtonProps } from "packages/core/SegmentedButton";

export const Default = (props: SegmentedButtonProps) => {
  const [selected, setSelected] = useState<string | number>(0);

  return (
    <SegmentedButton
      onClick={setSelected}
      selected={selected}
      sections={[
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
      ]}
      {...props}
    />
  );
};

export default {
  title: "Core/Segmented Button",
  component: SegmentedButton,
};
