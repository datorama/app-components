import React, { useState, useCallback } from "react";

// Components
import Collapsible, {
  CollapsibleProps,
} from "packages/core/Collapse/Collapsible";
import Button from "packages/core/Button";

export const Default = (props: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleIsOpen = useCallback(() => setIsOpen((curr) => !curr), []);

  return (
    <>
      <Button onClick={toggleIsOpen}>Toggle content</Button>

      <Collapsible isOpen={isOpen} toggleIsOpen={toggleIsOpen} {...props}>
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

export default {
  title: "Core/Collapsible",
  component: Collapsible,
};
