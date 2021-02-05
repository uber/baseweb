/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../../styles/index.js';

import {CustomColumn, StatefulDataTable} from '../index.js';

const HighlightContext = React.createContext<{
  x: number,
  y: number,
  handleCellClick: (number, number) => void,
}>({
  x: -1,
  y: -1,
  handleCellClick: (x, y) => {},
});

type RowDataT = [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

function buildHighlightColumn(index: number) {
  return CustomColumn<{value: string}, {}>({
    title: `column ${index}`,
    mapDataToValue: (data: RowDataT) => {
      return {value: data[index]};
    },
    renderCell: function HighlightCell(props) {
      const [css, theme] = useStyletron();
      const highlightContext = React.useContext(HighlightContext);

      const isHighlighted =
        props.x === highlightContext.x && props.y === highlightContext.y;

      return (
        <button
          onClick={() => highlightContext.handleCellClick(props.x, props.y)}
          className={css({
            backgroundColor: isHighlighted ? theme.colors.warning : null,
            background: 'none',
            color: 'inherit',
            border: 'none',
            padding: 0,
            font: 'inherit',
            cursor: 'pointer',
            outline: 'inherit',
          })}
        >
          cell {props.value.value}
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

const columns = [
  buildHighlightColumn(0),
  buildHighlightColumn(1),
  buildHighlightColumn(2),
  buildHighlightColumn(3),
  buildHighlightColumn(4),
  buildHighlightColumn(5),
  buildHighlightColumn(6),
  buildHighlightColumn(7),
  buildHighlightColumn(8),
  buildHighlightColumn(9),
];

const rows = buildInitialRows(20);

export default function Scenario() {
  const [coords, setCoords] = React.useState([-1, -1]);

  const handleCellClick = React.useCallback((x, y) => {
    setCoords(prev => {
      if (prev[0] === x && prev[1] === y) {
        return [-1, -1];
      } else {
        return [x, y];
      }
    });
  }, []);

  return (
    <HighlightContext.Provider
      value={{x: coords[0], y: coords[1], handleCellClick}}
    >
      <div style={{height: '800px', width: '900px'}}>
        <StatefulDataTable columns={columns} rows={rows} />
      </div>
    </HighlightContext.Provider>
  );
}
