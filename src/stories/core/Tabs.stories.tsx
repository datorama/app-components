import React from "react";

// Components
import Tabs, { TabsProps } from "packages/core/Tabs";

import { withTypesTable } from "common/utils";

export const Default = (props: TabsProps) => {
  return <Tabs {...props} />;
};

Default.args = {
  justify: "center",
  tabs: [
    { id: 0, label: "Explore" },
    { id: 1, label: "Filters" },
    { id: 2, label: "Summary" },
  ],
  selectedIndex: 0,
  onSelect: () => {},
  contentRenderer: (tab: {
    id: string | number;
    label: string;
    isDisabled?: boolean;
  }) =>
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
    ) : null,
};

export default {
  title: "Core/Tabs",
  component: Tabs,
  parameters: {
    docs: {
      container: withTypesTable([
        {
          label: "Tab",
          type:
            "{ id: number | string; label: string; isEnabled: boolean; isTouched?: boolean; }",
        },
        {
          label: "Justify",
          type:
            "flex-start | center | flex-end",
        },
      ]),
    },
  },
  argTypes: {
    justify: {
      control: {
        type: "select",
        options: ["flex-start", "center", "flex-end"],
      },
      description: "Tabs position",
    },
    tabs: {
      control: "object",
      description: "Array of tabs",
    },
    onSelect: {
      description: "Callback on tab selection",
    },
    selectedIndex: {
      control: { type: "number", min: 0, max: 2 },
      description: "Current tab index",
    },
    contentRenderer: {
      description: "Tab content renderer",
    },
    className: {
      description: "Custom class name passed to Tabs main container",
    },
    labelRenderer: {
      description: "Custom label renderer",
    },
    gap: {
      description: "Gap between tabs",
      optional: true,
      control: { type: "number", min: 0, max: 200 },
    },
  },
};
