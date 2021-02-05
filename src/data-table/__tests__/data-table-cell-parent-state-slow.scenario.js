/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../../styles/index.js';

import {CustomColumn, StatefulDataTable} from '../index.js';

type RowDataT = [
  [boolean, string],
  [boolean, string],
  [boolean, string],
  [boolean, string],
  [boolean, string],
  [boolean, string],
  [boolean, string],
  [boolean, string],
  [boolean, string],
  [boolean, string],
];

function buildHighlightColumn(
  index: number,
  onClick: (number, number) => void,
) {
  return CustomColumn<
    {isHighlighted: boolean, onClick: (number, number) => void, value: string},
    {},
  >({
    title: `column ${index}`,
    mapDataToValue: (data: RowDataT) => {
      return {
        isHighlighted: data[index][0],
        onClick: onClick,
        value: data[index][1],
      };
    },
    renderCell: function HighlightCell(props) {
      const [css, theme] = useStyletron();
      return (
        <button
          onClick={() => props.value.onClick(props.x, props.y)}
          className={css({
            backgroundColor: props.value.isHighlighted
              ? theme.colors.warning
              : null,
          })}
        >
          slow {props.value.value}
        </button>
      );
    },
  });
}

function buildInitialRows(count) {
  const rows = [];
  for (let i = 0; i < count; i++) {
    const data = [];
    for (let j = 0; j < 10; j++) {
      data.push([false, `${j}, ${i}`]);
    }
    rows.push({id: i, data});
  }
  return rows;
}

export default function Scenario() {
  const [coords, setCoords] = React.useState([-1, -1]);
  const [rows, setRows] = React.useState(buildInitialRows(200));

  const handleCellClick = React.useCallback(
    (x, y) => {
      if (x === coords[0] && y === coords[1]) {
        setRows(prev => {
          const nextRows = prev.map((row, i) => {
            if (i === y) {
              row.data[x][0] = false;
            }
            return row;
          });
          return nextRows;
        });
        setCoords([-1, -1]);
      } else {
        setRows(prev => {
          const nextRows = rows.map((row, i) => {
            if (i === coords[1]) {
              row.data[coords[0]][0] = false;
            }
            if (i === y) {
              row.data[x][0] = true;
            }
            return row;
          });
          return nextRows;
        });
        setCoords([x, y]);
      }
    },
    [coords],
  );

  const columns = React.useMemo(
    () => [
      buildHighlightColumn(0, handleCellClick),
      buildHighlightColumn(1, handleCellClick),
      buildHighlightColumn(2, handleCellClick),
      buildHighlightColumn(3, handleCellClick),
      buildHighlightColumn(4, handleCellClick),
      buildHighlightColumn(5, handleCellClick),
      buildHighlightColumn(6, handleCellClick),
      buildHighlightColumn(7, handleCellClick),
      buildHighlightColumn(8, handleCellClick),
      buildHighlightColumn(9, handleCellClick),
    ],
    [handleCellClick],
  );

  return (
    <div style={{height: '800px', width: '900px'}}>
      <StatefulDataTable columns={columns} rows={rows} />
    </div>
  );
}
