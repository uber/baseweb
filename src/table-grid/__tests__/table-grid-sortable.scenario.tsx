/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { StyledTable, StyledBodyCell, SortableHeadCell, SORT_DIRECTION } from '..';
import { useCellNavigation } from './shared';

const DATA = [
  ['Marlyn', 10],
  ['Luther', 15],
  ['Kiera', 13],
  ['Edna', 20],
  ['Soraya', 18],
  ['Dorris', 32],
  ['Astrid', 26],
  ['Wendie', 17],
  ['Marna', 11],
  ['Malka', 14],
  ['Jospeh', 10],
  ['Roselee', 12],
  ['Justine', 35],
  ['Marlon', 30],
  ['Mellissa', 32],
  ['Fausto', 21],
  ['Alfredia', 22],
  ['Abel', 18],
  ['Winford', 19],
  ['Neil', 27],
];

export function Scenario() {
  const { getCellProps } = useCellNavigation();
  const [nameDirection, setNameDirection] = React.useState(null);
  const [ageDirection, setAgeDirection] = React.useState(null);

  function handleSort(title, prevDirection) {
    let nextDirection = null;
    if (prevDirection === SORT_DIRECTION.ASC) {
      nextDirection = SORT_DIRECTION.DESC;
    }
    if (prevDirection === SORT_DIRECTION.DESC) {
      nextDirection = null;
    }
    if (prevDirection === null) {
      nextDirection = SORT_DIRECTION.ASC;
    }

    if (title === 'name') {
      setNameDirection(nextDirection);
      setAgeDirection(null);
    }

    if (title === 'age') {
      setNameDirection(null);
      setAgeDirection(nextDirection);
    }
  }

  const sortedData = React.useMemo(() => {
    if (nameDirection) {
      const sorted = DATA.slice(0).sort((a, b) => a[0].localeCompare(b[0]));
      if (nameDirection === SORT_DIRECTION.ASC) {
        return sorted;
      }
      if (nameDirection === SORT_DIRECTION.DESC) {
        return sorted.reverse();
      }
    }
    if (ageDirection) {
      const sorted = DATA.slice(0).sort((a, b) => a[1] - b[1]);
      if (ageDirection === SORT_DIRECTION.ASC) {
        return sorted;
      }
      if (ageDirection === SORT_DIRECTION.DESC) {
        return sorted.reverse();
      }
    }
    return DATA;
  }, [nameDirection, ageDirection]);

  return (
    <StyledTable tabIndex="0" role="grid" $gridTemplateColumns="repeat(2,1fr)">
      <SortableHeadCell
        title="Name"
        direction={nameDirection}
        onSort={() => handleSort('name', nameDirection)}
        overrides={{
          HeadCell: {
            props: getCellProps(0, 0),
          },
        }}
      />

      <SortableHeadCell
        disabled
        title="Age"
        direction={ageDirection}
        onSort={() => handleSort('age', ageDirection)}
        overrides={{
          HeadCell: { props: getCellProps(1, 0), style: { color: 'blue' } },
        }}
      />

      {sortedData.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell, columnIndex) => (
            <StyledBodyCell {...getCellProps(columnIndex, rowIndex + 1)} key={columnIndex}>
              {cell}
            </StyledBodyCell>
          ))}
        </React.Fragment>
      ))}
    </StyledTable>
  );
}
