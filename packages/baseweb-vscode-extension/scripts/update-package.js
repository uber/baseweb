#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const {components} = require(path.resolve(__dirname, '../src/components'));
const packageJson = require(path.resolve(__dirname, '../package.json'));

components.forEach(component => {
  // making sure there are no duplicates
  const command = `extension.baseweb.docs.${component}`;
  if (!packageJson.activationEvents.includes(`onCommand:${command}`)) {
    packageJson.activationEvents.push(`onCommand:${command}`);
  }

  const hasCommand =
    packageJson.contributes.commands.filter(cmd => {
      return cmd.command === command;
    }).length !== 0;

  if (!hasCommand) {
    packageJson.contributes.commands.push({
      command: `extension.baseweb.docs.${component}`,
      title: `Open the docs for the ${component} component`,
      category: 'Base Web',
    });
  }
});

fs.writeFileSync(
  path.resolve(__dirname, '../package.json'),
  JSON.stringify(packageJson, null, 2),
);
