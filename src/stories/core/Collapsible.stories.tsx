import React, { useState, useCallback } from "react";

// Components
import Collapsible, {
  CollapsibleProps,
} from "packages/core/Collapse/Collapsible";
import Button from "packages/core/Button";

export const DefaultCollapsible = (props: CollapsibleProps) => {
  function Parent({
    children,
  }: {
    children: (isOpen: boolean, toggleIsOpen: () => void) => JSX.Element;
  }): JSX.Element {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = useCallback(() => setIsOpen((curr) => !curr), []);

    return (
      <div>
        <div>
          <Button onClick={toggleIsOpen}>Toggle content</Button>

          {children(isOpen, toggleIsOpen)}
        </div>
      </div>
    );
  }

  return (
    <Parent>
      {(isOpen, toggleIsOpen) => (
        <Collapsible isOpen={isOpen} toggleIsOpen={toggleIsOpen} {...props}>
          <div
            style={{
              width: "100%",
              height: 200,
              background: '#ececec'
            }}
          />
        </Collapsible>
      )}
    </Parent>
  );
};

export default {
  title: "Core/Collapsible",
  component: Collapsible,
};
