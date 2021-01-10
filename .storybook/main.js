// const path = require('path');
// const pathToInlineSvg = path.resolve(__dirname, '../src/assets');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "webpackFinal": async (config, {configType}) => {
    const fileLoaderRule = config.module.rules.find(
      (rule) => !Array.isArray(rule.test) && rule.test.test(".svg"),
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack", "url-loader"],
    });
    
    return config;
  },
};
