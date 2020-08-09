import React, { useState } from "react";

// Components
import Tabs, { TabsProps } from "packages/core/Tabs";

export const Default = (props: TabsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Tabs
      justify="flex-start"
      onSelect={setSelectedIndex}
      tabs={[
        { id: 0, label: "Explore" },
        { id: 1, label: "Filters" },
        { id: 2, label: "Summary" },
      ]}
      selectedIndex={selectedIndex}
      contentRenderer={(tab) =>
        tab ? (
          <div
            style={{
              fontSize: 12,
              boxSizing: "border-box",
              padding: 20,
            }}
          >
            Content for tab {tab.label} - {tab.id}
          </div>
        ) : null
      }
      {...props}
    />
  );
};

export default {
  title: "Core/Tabs",
  component: Tabs,
};
