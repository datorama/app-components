import React from "react";
import { addDecorator, addParameters } from "@storybook/react";
import { themes } from "@storybook/theming";

import StyleDecorator from "./StyleDecorator";
import NotificationsDecorator from "./NotificationsDecorator";

addParameters({
  viewMode: "docs",
  docs: {
    theme: (() => {
      // Set initial theme from local storage
      try {
        return themes[
          JSON.parse(window.localStorage.getItem("sb-addon-themes-3")).current
        ];
      } catch (err) {
        return themes.light;
      }
    })(),
  },
});

addDecorator(NotificationsDecorator);
addDecorator(StyleDecorator);
