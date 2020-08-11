import React from "react";
import "../src/index.css";
import "highlightjs/styles/github.css";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../src/packages/core";

interface Context {
  globals: {
    theme: "Light" | "Dark";
  };
}

const StyleDecorator = (Story: any, context: Context) => {
  return (
    <ThemeProvider
      theme={context?.globals?.theme === "Light" ? lightTheme : darkTheme}
    >
      <Story />
    </ThemeProvider>
  );
};

export default StyleDecorator;
