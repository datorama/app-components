import React, { useEffect, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "storybook-dark-mode";
import { themes } from "@storybook/theming";
import { addParameters } from "@storybook/react";
import { useSharedState } from "@storybook/client-api";

import { lightTheme, darkTheme } from "packages/core";
import { GlobalStyleLight, GlobalStyleDark } from "./GlobalStyle";

import "index.css";
import "highlightjs/styles/github.css";

const StyleDecorator = (Story: any) => {
  const isInitial = useRef(true);
  const [_, setStory] = useSharedState("state");
  const isDarkMode = useDarkMode();

  useEffect(() => {
    if (isInitial.current) {
      isInitial.current = false;

      return;
    }

    addParameters({
      docs: {
        theme: isDarkMode ? themes.dark : themes.light,
      },
    });

    setStory("state"); // A hack to make the story iframe re-render, after updating its theme
  }, [isDarkMode]);

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Story />

      {isDarkMode ? <GlobalStyleDark /> : <GlobalStyleLight />}
    </ThemeProvider>
  );
};

export default StyleDecorator;
