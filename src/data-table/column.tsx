/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Checkbox } from '../checkbox';
import { LocaleContext } from '../locale';
import { useStyletron } from '../styles';

import type { ColumnOptions } from './types';

function Column<Value, FilterParams>(
  options: ColumnOptions<Value, FilterParams>
): ColumnOptions<Value, FilterParams> {
  return {
    kind: options.kind,
    buildFilter: options.buildFilter || (() => () => true),
    textQueryFilter: options.textQueryFilter,
    fillWidth: options.fillWidth === undefined ? true : options.fillWidth,
    filterable:
      Boolean(options.filterable) && Boolean(options.renderFilter) && Boolean(options.buildFilter),
    mapDataToValue: options.mapDataToValue,
    maxWidth: options.maxWidth,
    minWidth: options.minWidth,
    // todo(flow->ts) add proper type annotation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,react/display-name
    renderCell: React.forwardRef((props, ref: any) => {
      // todo(automated-eslint-suppression) Hooks must be called at the top level in the body of a function component or custom hook, and may not be called within function expressions. See the Rules of Hooks (https://react.dev/warnings/invalid-hook-call-warning)
      // eslint-disable-next-line react-compiler/react-compiler
      const locale = React.useContext(LocaleContext);
      // todo(automated-eslint-suppression) Hooks must be called at the top level in the body of a function component or custom hook, and may not be called within function expressions. See the Rules of Hooks (https://react.dev/warnings/invalid-hook-call-warning)
      // eslint-disable-next-line react-compiler/react-compiler
      const [css, theme] = useStyletron();
      const ProvidedCell = options.renderCell;

      let cellBlockAlign = 'flex-start';
      if (options.cellBlockAlign === 'center') {
        cellBlockAlign = 'center';
      } else if (options.cellBlockAlign === 'end') {
        cellBlockAlign = 'flex-end';
      }

      return (
        <div
          ref={ref}
          className={css({
            ...theme.typography.font100,
            boxSizing: 'border-box',
            color: theme.colors.contentPrimary,
            // @ts-ignore
            display: props.isMeasured ? 'inline-block' : null,
            height: '100%',
            paddingTop: theme.sizing.scale300,
            paddingLeft: theme.sizing.scale500,
            paddingBottom: theme.sizing.scale300,
            paddingRight: theme.sizing.scale500,
            // @ts-ignore
            width: props.isMeasured ? null : '100%',
          })}
        >
          <div
            className={css({
              alignItems: cellBlockAlign,
              display: 'flex',
              height: '100%',
            })}
          >
            {Boolean(props.onSelect) && (
              <span className={css({ paddingRight: theme.sizing.scale300 })}>
                <Checkbox
                  aria-label={locale.datatable.selectRow}
                  onChange={props.onSelect}
                  checked={props.isSelected}
                  overrides={{
                    Checkmark: { style: { marginTop: null, marginBottom: null } },
                  }}
                />
              </span>
            )}

            <ProvidedCell {...props} />
          </div>
        </div>
      );
    }),
    renderFilter: options.renderFilter || (() => null),
    sortable: Boolean(options.sortable) && Boolean(options.sortFn),
    sortFn: options.sortFn || (() => 0),
    title: options.title,
  };
}

export default Column;
