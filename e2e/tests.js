/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env browser */

import React from 'react';

import scenarios from '../src/**/*.scenario.js';

const nameCounts = scenarios.reduce((map, s) => {
  if (!map[s.fileName]) {
    map[s.fileName] = 1;
  } else {
    map[s.fileName]++;
  }
  return map;
}, {});

const collisions = Object.entries(nameCounts).filter(([_, count]) => count > 1);
if (collisions.length >= 1) {
  console.error(`Found colliding scenario name(s): ${collisions
    .map(([name]) => name)
    .join(', ')}. Rename the conflicting .scenario.js file with a unique label.
  `);
}

const A11yFail = props => (
  <div style={{backgroundColor: 'red', color: 'white'}} role={props.message}>
    {props.message}
  </div>
);

export default function showTestcase() {
  // needs polyfill for IE
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get('name');

  if (!name) {
    const message = 'No scenario name provided.';
    console.error(message);
    return <A11yFail message={message} />;
  }

  const scenario = scenarios.find(s => {
    if (!s) return false;
    const fileName = s.fileName.split('/').pop();
    const [scenarioName] = fileName.split('.scenario.js');
    return scenarioName === name;
  });

  if (!scenario) {
    const message = `No scenario found with the name: ${name}`;
    console.error(message);
    return <A11yFail message={message} />;
  }

  const Component = scenario.result.Scenario;

  return (
    <div>
      <Component />
    </div>
  );
}
