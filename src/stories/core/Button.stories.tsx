import React from "react";
import { action } from "@storybook/addon-actions";

// Components
import Button, { ButtonProps } from "packages/core/Button";

export const Default = (props: ButtonProps) => {
  return (
    <Button onClick={action("clicked")} {...props}>
      Default Button
    </Button>
  );
};

export const Secondary = () => (
  <Button onClick={action("clicked")} isSecondary>
    Secondary Button
  </Button>
);

export const Disabled = () => (
  <Button onClick={action("clicked")} isDisabled>
    Disabled Button
  </Button>
);

export const Small = () => (
  <Button onClick={action("clicked")} isSmall>
    Small Button
  </Button>
);

export const Round = () => (
  <Button onClick={action("clicked")} isRound>
    +
  </Button>
);

export default {
  title: "Core/Button",
  component: Button,
};
