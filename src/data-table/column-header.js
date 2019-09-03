/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';

import {StatefulPopover} from '../popover/index.js';
import {useStyletron} from '../styles/index.js';

type ColumnHeaderPropsT = {
  index: number,
  onSort: number => void,
  title: string,
};

const ColumnHeader = React.forwardRef<ColumnHeaderPropsT, HTMLDivElement>(
  (props, ref) => {
    const [useCss, theme] = useStyletron();
    return (
      <div
        ref={ref}
        className={useCss({
          ...theme.borders.border200,
          ...theme.typography.font200,
          borderTop: 'none',
          borderBottom: 'none',
          borderLeft: 'none',
          boxSizing: 'border-box',
          display: 'inline-block',
          paddingLeft: theme.sizing.scale600,
          paddingRight: theme.sizing.scale600,
        })}
      >
        {props.title}
        <button onClick={() => props.onSort(props.index)}>sort</button>
        <StatefulPopover
          content={({close}) => (
            <div>hello</div>
            // change to dependency injection
            // <CategoricalFilter
            //   setFilter={(filterParams, description) =>
            //     props.addFilter(filterParams, props.column.title, description)
            //   }
            //   data={props.rows.map(r => r.data[props.columnIndex])}
            //   close={close}
            // />
          )}
        >
          <button>filter</button>
        </StatefulPopover>
      </div>
    );
  },
);
ColumnHeader.displayName = 'ColumnHeader';

export default ColumnHeader;
