/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
//

import * as React from "react";
import { useStyletron } from "baseui";
import { Property } from "./common.jsx";

export function Type({ name }) {
  const [css, theme] = useStyletron();
  return (
    <Property
      name={name}
      concern="typography"
      renderPreview={() => (
        <div className={css({ ...theme.typography[name] })}>
          Example
        </div>
      )}
      renderValue={() => (
        <pre
          className={css({
            fontSize: "14px",
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;',
          })}
        >
          {`{
  fontSize: '${theme.typography[name].fontSize}',
  fontWeight: '${theme.typography[name].fontWeight}',
  lineHeight: '${theme.typography[name].lineHeight}'
}`}
        </pre>
      )}
    />
  );
}
