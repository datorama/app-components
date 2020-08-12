import React, { useState, useCallback } from "react";

import Collapsible, {
  CollapsibleProps,
} from "packages/core/Collapse/Collapsible";
import Button from "packages/core/Button";

export const Default = (props: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen);
  const toggleIsOpen = useCallback(() => setIsOpen((curr) => !curr), []);

  return (
    <>
      <Button onClick={toggleIsOpen}>Toggle content</Button>

      <Collapsible {...props} isOpen={isOpen} toggleIsOpen={toggleIsOpen}>
        <div
          style={{
            width: "100%",
            height: 200,
            background: "#ececec",
          }}
        />
      </Collapsible>
    </>
  );
};

Default.args = {
  isOpen: false,
};

export default {
  title: "Core/Collapsible",
  component: Collapsible,
};
