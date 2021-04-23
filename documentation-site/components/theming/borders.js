/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from 'baseui';
import {Property, PropertyCompareTheme} from './common.js';

export function Border({name}: {name: string}) {
  const [css] = useStyletron();
  return (
    <PropertyCompareTheme
      name={name}
      concern="borders"
      renderBox={({previewTheme, commonStyles}) => (
        <div
          className={css({
            ...commonStyles,
            ...previewTheme.borders[name],
          })}
        ></div>
      )}
      renderValue={({previewTheme}) => (
        <pre
          className={css({
            fontSize: '12px',
            fontFamily:
              'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;',
          })}
        >
          {`{
  borderWidth: '${previewTheme.borders[name].borderWidth}',
  borderStyle: '${previewTheme.borders[name].borderStyle}',
  borderColor: '${previewTheme.borders[name].borderColor}'
}`}
        </pre>
      )}
    />
  );
}

export function Radius({name}: {name: string}) {
  const [css, theme] = useStyletron();
  return (
    <Property
      name={name}
      concern="borders"
      renderPreview={() => (
        <div
          className={css({
            backgroundColor: theme.colors.contentPrimary,
            borderRadius: theme.borders[name],
            height: '50px',
            width: '50px',
          })}
        ></div>
      )}
      renderValue={() => theme.borders[name]}
    />
  );
}
