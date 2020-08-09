import React, { useState } from "react";

// Components
import Tabs, { TabsProps } from "packages/core/Tabs";

export const DefaultTabs = (props: TabsProps) => {
  function Parent({ children }: { children: (index: number, setSelectedIndex: (index: number) => void) => JSX.Element }): JSX.Element {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return children(selectedIndex, setSelectedIndex);
  }

  return (
    <Parent>
      {(state, setState) => (
        <Tabs
          justify="flex-start"
          onSelect={setState}
          tabs={[
            { id: 0, label: 'Explore' },
            { id: 1, label: 'Filters' },
            { id: 2, label: 'Summary' }
          ]}
          selectedIndex={state}
          contentRenderer={tab => tab ? (
            <div style={{
              fontSize: 12,
              boxSizing: 'border-box',
              padding: 20
            }}>
              Content for tab {tab.label} - {tab.id}
            </div>
          ) : null}
          {...props}
        />
      )}
    </Parent>
  );
};

export default {
  title: "Core/Tabs",
  component: Tabs,
};
