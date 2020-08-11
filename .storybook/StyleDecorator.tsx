import React, { useLayoutEffect } from "react";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "storybook-dark-mode";
import { themes } from "@storybook/theming";
import { addParameters } from "@storybook/react";

import { lightTheme, darkTheme } from "../src/packages/core";

import "../src/index.css";
import "highlightjs/styles/github.css";

const StyleDecorator = (Story: any) => {
  const isDarkMode = useDarkMode();

  useLayoutEffect(() => {
    addParameters({
      docs: {
        theme: isDarkMode ? themes.dark : themes.light,
      },
    });
  });

  return (
    <ThemeProvider
      theme={isDarkMode ? darkTheme : lightTheme}
      key={isDarkMode ? "lol" : "lll"}
    >
      <Story key={isDarkMode} />
    </ThemeProvider>
  );
};

export default StyleDecorator;
