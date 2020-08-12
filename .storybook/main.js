module.exports = {
  stories: ["../src/**/*.stories.(tsx|mdx)"],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },
    "@storybook/preset-create-react-app",
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/addon-controls",
    "@storybook/addon-toolbars/register",
    "@storybook/theming",
    "storybook-dark-mode/register",
    "@storybook/api",
    "@storybook/client-api",
    "@storybook/addon-jest"
  ],
};
