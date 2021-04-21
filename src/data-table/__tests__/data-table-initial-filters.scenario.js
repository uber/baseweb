/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulDataTable, CategoricalColumn} from '../index.js';
import {useStyletron} from '../../styles/index.js';

export default function Scenario() {
  const [css, theme] = useStyletron();
  const [addLog, setAddLog] = React.useState([]);
  const [removeLog, setRemoveLog] = React.useState([]);

  const columns = [
    CategoricalColumn({
      title: 'column',
      mapDataToValue: (data: string) => data,
    }),
  ];

  const rows = [
    {id: 1, data: 'a'},
    {id: 2, data: 'b'},
    {id: 3, data: 'c'},
    {id: 4, data: 'd'},
  ];

  const initialFilters = React.useMemo(() => {
    const filters = new Map();
    filters.set('column', {
      description: 'my description',
      selection: new Set(['a']),
      exclude: false,
    });
    return filters;
  }, []);

  return (
    <React.Fragment>
      <div style={{height: '400px', width: '800px'}}>
        <StatefulDataTable
          initialFilters={initialFilters}
          onFilterAdd={(title, params) =>
            setAddLog([...addLog, [title, params]])
          }
          onFilterRemove={title => setRemoveLog([...removeLog, title])}
          columns={columns}
          rows={rows}
        />
      </div>
      <div
        className={css({
          ...theme.typography.ParagraphSmall,
          color: theme.colors.contentPrimary,
        })}
      >
        add log
        <ul>
          {addLog.map(([title, params]) => (
            <li data-log="add" key={title}>
              add {title}
            </li>
          ))}
        </ul>
        remove log
        <ul>
          {removeLog.map(title => (
            <li data-log="remove" key={title}>
              remove {title}
            </li>
          ))}
        </ul>
      </div>
    </React.Fragment>
  );
}
