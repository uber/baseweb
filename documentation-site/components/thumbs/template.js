/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-disable cup/no-undef */

// CLI example
// svgr --template template.js --replace-attr-values "#F6F6F6={colors[0]}" --replace-attr-values "#E2E2E2={colors[1]}" --replace-attr-values "#CBCBCB={colors[2]}" -d components svg

const header = `/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* THIS FILE IS AUTO-GENERATED. DO NOT MODIFY. */
/* eslint-disable flowtype/require-valid-file-annotation */
`;

function template(api, opts, values) {
  const {template} = api;
  const {imports, componentName, props, jsx} = values;
  return template.ast`
${header}
${imports}
export default function ${componentName} (${props}) {
  return ${jsx}
}
`;
}

module.exports = template;
