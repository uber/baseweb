/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Checkbox} from '../checkbox/index.js';
import {useStyletron} from '../styles/index.js';

type PropsT = {|
  children: React.Node,
  isMeasured?: boolean,
  isSelected?: boolean,
  onSelect?: () => void,
|};

const CellShell = React.forwardRef<PropsT, HTMLDivElement>((props, ref) => {
  const [css, theme] = useStyletron();

  return (
    <div
      ref={ref}
      className={css({
        ...theme.typography.font100,
        boxSizing: 'border-box',
        display: props.isMeasured ? 'inline-block' : null,
        paddingTop: theme.sizing.scale300,
        paddingLeft: theme.sizing.scale500,
        paddingBottom: theme.sizing.scale300,
        paddingRight: theme.sizing.scale500,
        width: props.isMeasured ? null : '100%',
      })}
    >
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
        })}
      >
        {Boolean(props.onSelect) && (
          <Checkbox
            onChange={props.onSelect}
            checked={props.isSelected}
            overrides={{
              Checkmark: {style: {marginTop: null, marginBottom: null}},
            }}
          />
        )}
        {props.children}
      </div>
    </div>
  );
});
CellShell.displayName = 'CellShell';

export default CellShell;
