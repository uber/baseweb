# Codemods for Base Web (`baseui`)

You can use this CLI tool to run various scripts (codemods) that will
automate laborious migrations between major versions of the [baseui](https://github.com/uber/baseweb) library.

> What is a "codemod"?

A codemod is just a script that makes some changes to a directory of source code. It can move files and folders around, make changes to code, and even issue git commands. The idea is to automate some sort of simple repeatable task that is required for a code migration.

👍 Save yourself some time with a codemod!

## Usage

### Installation

Most folks probably want to run `baseui-codemods` using [npx](https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner). If you want to run multiple codemods however, it may be convenient to install globally.

```shell
$ npm i -g @uber-web-ui/baseui-codemods
```

Just make sure to install the latest version next time you run a codemod.

### Running a codemod

Simply specify a path to your source code's directory (`--dir`) and which codemod you would like to run (`--mod`).

```shell
$ npx @uber-web-ui/baseui-codemods --dir=<PATH_TO_CODE> --mod=<CODEMOD_NAME>
```

Here is an example with some dummy options:

```shell
$ npx @uber-web-ui/baseui-codemods --dir=src --mod=v8Types
```

Note, there are **no defaults** for the `--dir` and `--mod` flags. You **have** to specify the directory and codemod you would like to run.

For a list of available codemods, run `npx baseui-codemods -h`.

## Contributing

### Set up

```shell
$ yarn install
```

### Overview

We use [dubstep/core](https://github.com/DubstepJS/core) to organize arrays of steps into a codemod. It looks something like this:

```js
// A new `colorUpdate` codemod
const colorUpdate = [
  step('replace "red" with "blue"', redToBlue),
  step('replace "green" with "pink"', greenToPink),
];
const stepper = new Stepper(colorUpdate);
stepper.run();
```

A user can then run this script on their source code.

In practice, `src/cli.js` aggregates all of the available codemods into a `MODS` config object and makes these runnable from the command line.

This is how users will actually run our codemods.

#### Basic workflow

Create a new file in `src` that exports at least one async function. These functions will be the `step`s for your codemod.

```js
// src/colorUpdate.js

async function redToBlue(options) {
  // do some stuff with options.dir
}

async function greenToPink(options) {
  // do some stuff with options.dir
}

export {redToBlue, greenToPink};
```

Inside of each function you can run some codemod type logic using [dubstep/core](https://github.com/DubstepJS/core) and/or [babel](https://github.com/babel/babel). Reference the other codemods for examples of various operations you can run. Generally it is good practice to organize the codemod into discrete steps (meaning multiple async functions) and, if possible, keep things [idempotent](https://en.wikipedia.org/wiki/Idempotence).

There are a few ways to test your codemod while in development. Consider both methods requirements for adding a new codemod.

The first method is to unit test your logic. We use [inline snapshots](https://jestjs.io/docs/en/snapshot-testing#inline-snapshots) to verify that codemod logic runs as expected. Reference other test files to get the general pattern we expect in these tests.

The second method is to run your codemod on actual source code.

Add your codemod to the `MODS` object in `src/cli.js`.

```js
// src/cli.js

import {redToBlue, greenToPink} from './colorUpdate.js';

const MODS = {
  // ...
  colorUpdate: [
    step('replace "red" with "blue"', redToBlue),
    step('replace "green" with "pink"', greenToPink),
  ],
};

// more CLI logic below
```

This makes the `colorUpdate` codemod available on the command line.

Run `yarn build` to compile everything into `dist` and now you can run `dist/cli.js` as you would any Node script.

```shell
$ node dist/cli.js --dir=~/code/some-project/src --mod=colorUpdate
```

You could also use `yarn link` and open a shell in the project directory. This is a bit closer to what an end user will experience.

```shell
$ baseui-codemods --dir=src --mod=colorUpdate
```

After running your codemod, you can use a diff tool to verify that the codebase has changed as expected. It is crucial to run every codemod against a number of projects to ensure it functions correctly. There are always edge-cases!

#### References

For some more info on developing CLI tools in node, check out [this article](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e#c2d2). This project follows a lot of the recommendations in the article.

A very useful tool for iterating on AST related logic is https://astexplorer.net/. Set the compiler to `Babylon7` and enable `Transform`, which will open two new panes. The bottom left is a babel plugin you can fill in and the bottom right is the output of that plugin on the source in the top left pane. The top right pane is for exploring the source code's AST, which will prove very useful if doing any sort of AST traversal in your codemod.

For more information on AST traversal, you will want to become familiar with [how Babel plugins work](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md), specifically **Traversal** via the **Visitor** pattern.

#### Versioning

| `UPDATE_TYPE` | Note |
| --- | --- |
| `major` | Breaking changes to CLI or an existing codemod. |
| `minor` | New codemod or enhanced CLI functionality. |
| `patch` | Non breaking fix for existing codemod or CLI functionality. |

