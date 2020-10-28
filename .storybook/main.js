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
    // const assetRule = config.module.rules.find(({ test }) => test.test(".svg"));
    //
    // const assetLoader = {
    //   loader: assetRule.loader,
    //   options: assetRule.options || assetRule.query
    // };

    // Merge our rule with existing assetLoader rules
    // config.module.rules.unshift({
    //   test: /\.svg$/,
    //   use: ["@svgr/webpack", assetLoader]
    // });
    
    // Return the altered config
    return config;
  },
};
