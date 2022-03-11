/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulDataTable, NumericalColumn, StringColumn} from '../index.js';
import {randomLcg} from 'd3';

type RowDataT = [string, number];

const randGen = randomLcg(42);

const genColumns = (count) => {
  return new Array(count).fill(false).map((x, i) => {
    const index = i % 2;
    return index === 0
      ? StringColumn({
          title: 'string-column-' + i,
          minWidth: 20,
          mapDataToValue: (data: RowDataT) => {
            return data[index];
          },
        })
      : NumericalColumn({
          title: 'numerical-column-' + i,
          minWidth: 20,
          mapDataToValue: (data: RowDataT) => +data[index],
        });
  });
};

const genRows = (count) => {
  return new Array(count).fill(false).map((x, i) => {
    return {
      id: i,
      data: [
        genString(Math.ceil(1 + expRandom(0.2))),
        getRandomArbitrary(1, 1000),
      ],
    };
  });
};

function genString(length) {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(randGen() * charactersLength));
  }
  return result;
}

function getRandomArbitrary(min, max) {
  return randGen() * (max - min) + min;
}

function expRandom(lambda) {
  return -Math.log1p(-randGen()) / lambda;
}

const columns = genColumns(100);
const rows = genRows(5000);

export function Scenario() {
  return (
    <div style={{height: '100vh', width: '100vw'}}>
      <React.Profiler id={'table'} onRender={onRenderCallback}>
        <StatefulDataTable columns={columns} rows={rows} />
      </React.Profiler>
    </div>
  );
}

function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
) {
  console.log(median(actualDuration).toFixed(0));
}

// We use the median instead of avg to avoid outliers skewing the render times
const median = createMedianFilter(100);
function createMedianFilter(length) {
  const buffer = new Float64Array(length);
  const history = new Int32Array(length);
  let counter = 0;
  let bufCount = 0;

  function insertItem(x) {
    const nextCounter = counter++;
    const oldCounter = nextCounter - length;

    //First pass:  Remove all old items
    var ptr = 0;
    for (let i = 0; i < bufCount; ++i) {
      const c = history[i];
      if (c <= oldCounter) {
        continue;
      }
      buffer[ptr] = buffer[i];
      history[ptr] = c;
      ptr += 1;
    }
    bufCount = ptr;

    //Second pass:  Insert x
    if (!isNaN(x)) {
      let ptr = bufCount;
      for (var j = bufCount - 1; j >= 0; --j) {
        const y = buffer[j];
        if (y < x) {
          buffer[ptr] = x;
          history[ptr] = nextCounter;
          break;
        }
        buffer[ptr] = y;
        history[ptr] = history[j];
        ptr -= 1;
      }
      if (j < 0) {
        buffer[0] = x;
        history[0] = nextCounter;
      }
      bufCount += 1;
    }

    //Return median
    if (!bufCount) {
      return NaN;
    } else if (bufCount & 1) {
      return buffer[bufCount >>> 1];
    } else {
      const mid = bufCount >>> 1;
      return 0.5 * (buffer[mid - 1] + buffer[mid]);
    }
  }
  return insertItem;
}
