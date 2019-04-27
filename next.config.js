const withTypescript = require("@zeit/next-typescript");
const path = require("path");
const withTM = require("next-transpile-modules");
const withPlugins = require("next-compose-plugins");
const withSass = require("@zeit/next-sass");

module.exports =  withPlugins([
    [
        withTM,
        {
            transpileModules: ["@snoutyfriend/storybook, @snoutyfriend/storybook/scss/all.scss"],
        },
    ],
    [
        withTypescript,
        {
            useFileSystemPublicRoutes: false,
            webpack: function(config, { buildId, dev }) {
                const originalEntry = config.entry;

                config.resolve = {
                    ...config.resolve,
                    ...{
                        alias: {
                            ...config.resolve.alias,
                            "@src": path.resolve(__dirname, "pages"),
                        },
                    },
                };

                return config;
            },
        },
    ],
    [
        withSass,
        {
            cssLoaderOptions: {
                importLoaders: 1,
                localIdentName: "[local]___[hash:base64:5]",
            },
            cssModules: false,
            // transpileModules: ["@snoutyfriend/storybook/scss/all.scss"],
        },
    ],
]);
