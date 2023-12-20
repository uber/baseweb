module.exports = {
  presets: [
    "@babel/preset-typescript",
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: [
            "last 2 Chrome versions",
            "last 2 Firefox versions",
            "last 2 Safari versions",
            "last 2 Edge versions",
          ],
        },
        useBuiltIns: "usage",
        corejs: 3,
      },
    ],
  ],
  plugins: [
    "./transform-cup-globals.js",
    ["babel-plugin-transform-styletron-display-name", { importSources: "any" }],
    "@babel/plugin-transform-class-properties",
  ],
};
