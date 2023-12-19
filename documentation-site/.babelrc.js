const env = require("./env-config.js");

module.exports = {
  presets: [
    "next/babel",
    ["@babel/preset-flow", { all: true }],
  ],
  plugins: [["transform-define", env]],
};
