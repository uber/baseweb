// @flow
import React from 'react';
import {format} from 'date-fns';

import {StyledLink} from 'baseui/link';
import {useStyletron} from 'baseui';

import {
  StyledTable,
  StyledHeadCell,
  StyledBodyCell,
} from 'baseui/table-grid';

function useCellNavigation() {
  const cells = React.useRef([]);
  const [columnIndex, setColumnIndex] = React.useState(0);
  const [rowIndex, setRowIndex] = React.useState(0);

  function cellAtCoordinates(column, row) {
    const candidateRow = cells.current[row];
    if (candidateRow) {
      return candidateRow[column];
    }
  }

  function register(ref, column, row) {
    if (!cells.current[row]) {
      cells.current[row] = [];
    }
    cells.current[row][column] = ref;
  }

  const addressableCell = React.useMemo(() => {
    return cellAtCoordinates(columnIndex, rowIndex);
  }, [columnIndex, rowIndex]);

  const mounted = React.useRef(false);
  React.useEffect(() => {
    if (mounted.current) {
      if (addressableCell && addressableCell.focus) {
        addressableCell.focus();
      }
    }
    mounted.current = true;
  }, [addressableCell, mounted.current]);

  function isInBounds(column, row) {
    return (
      row >= 0 &&
      row < cells.current.length &&
      column >= 0 &&
      cells.current[0] &&
      column < cells.current[0].length
    );
  }

  type Point = [number, number];

  const UP = [0, -1];
  const RIGHT = [1, 0];
  const DOWN = [0, 1];
  const LEFT = [-1, 0];

  function nextInDirection(origin, direction: Point): ?Point {
    function vAdd(a: Point, b: Point) {
      return [a[0] + b[0], a[1] + b[1]];
    }
    let next = vAdd(origin, direction);
    while (isInBounds(...next)) {
      const exists = cellAtCoordinates(...next);
      if (exists) {
        return next;
      } else {
        next = vAdd(next, direction);
      }
    }

    const priorityUp = vAdd(vAdd(origin, direction), UP);
    if (isInBounds(...priorityUp)) {
      return nextInDirection(vAdd(origin, direction), UP);
    }

    const priorityLeft = vAdd(vAdd(origin, direction), LEFT);
    if (isInBounds(...priorityLeft)) {
      return nextInDirection(vAdd(origin, direction), LEFT);
    }

    return null;
  }

  function handleKeyDown(
    event: SyntheticKeyboardEvent<HTMLElement>,
  ) {
    let direction = [0, 0];
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        direction = UP;
        break;
      case 'ArrowRight':
        event.preventDefault();
        direction = RIGHT;
        break;
      case 'ArrowDown':
        event.preventDefault();
        direction = DOWN;
        break;
      case 'ArrowLeft':
        event.preventDefault();
        direction = LEFT;
        break;
      default:
        break;
    }

    const next = nextInDirection(
      [columnIndex, rowIndex],
      direction,
    );
    if (next) {
      setColumnIndex(next[0]);
      setRowIndex(next[1]);
    }
  }

  const getCellProps = React.useMemo(() => {
    return function(column: number, row: number) {
      const isAddressable =
        column === columnIndex && row === rowIndex;
      return {
        ref: (r: ?HTMLElement) => register(r, column, row),
        tabIndex: isAddressable ? 0 : -1,
        onFocus: () => {
          setColumnIndex(column);
          setRowIndex(row);
        },
        onKeyDown: isAddressable ? handleKeyDown : undefined,
        $isFocusVisible: isAddressable,
      };
    };
  }, [columnIndex, rowIndex]);

  return {getCellProps};
}

const row = [
  'feat(docs-site): theme editor POC',
  'https://github.com/uber/baseweb/pull/1296',
  [
    [new Date(2019, 6, 22), 'jh3y added a commit'],
    [new Date(2019, 6, 22), 'chasestarr left a comment'],
    [new Date(2019, 6, 22), 'jh3y left a comment'],
    [new Date(2019, 6, 22), 'chasestarr left a comment'],
    [new Date(2019, 6, 22), 'chasestarr left a comment'],
    [new Date(2019, 6, 22), 'jh3y added a commit'],
    [new Date(2019, 6, 22), 'jh3y added a commit'],
    [
      new Date(2019, 6, 22),
      'jh3y marked this pull request as ready',
    ],
  ],
];

const data = [row, row, row];

export default function() {
  const {getCellProps} = useCellNavigation();
  const [css] = useStyletron();
  return (
    <div className={css({height: '600px'})}>
      <StyledTable
        tabIndex="0"
        role="grid"
        $gridTemplateColumns="minmax(300px, 500px) repeat(2, max-content)"
      >
        <StyledHeadCell {...getCellProps(0, 0)}>
          Name
        </StyledHeadCell>
        <StyledHeadCell {...getCellProps(1, 0)}>
          Date
        </StyledHeadCell>
        <StyledHeadCell {...getCellProps(2, 0)}>
          Event
        </StyledHeadCell>
        {data.map((row, rowIndex) => {
          const events = row[2];
          const primaryRowIndex = rowIndex * events.length + 1;
          return (
            <React.Fragment key={rowIndex}>
              <StyledBodyCell
                {...getCellProps(0, primaryRowIndex)}
                $gridRow={`span ${row[2].length}`}
              >
                <StyledLink href={String(row[1])}>
                  {row[0]}
                </StyledLink>
              </StyledBodyCell>
              {events.map((event, eventIndex) => {
                const striped = eventIndex % 2 === 0;
                return (
                  <React.Fragment key={eventIndex}>
                    <StyledBodyCell
                      {...getCellProps(
                        1,
                        primaryRowIndex + eventIndex,
                      )}
                      $striped={striped}
                    >
                      {format(event[0], 'yyyy-MM-dd h:mm a')}
                    </StyledBodyCell>
                    <StyledBodyCell
                      {...getCellProps(
                        2,
                        primaryRowIndex + eventIndex,
                      )}
                      $striped={striped}
                    >
                      {event[1]}
                    </StyledBodyCell>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      </StyledTable>
    </div>
  );
}
