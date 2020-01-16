/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import FocusLock from 'react-focus-lock';

import {Button, SHAPE, SIZE} from '../button/index.js';
import {Filter as FilterIcon} from '../icon/index.js';
import {Input, SIZE as INPUT_SIZE} from '../input/index.js';
import {Popover, PLACEMENT} from '../popover/index.js';
import {useStyletron} from '../styles/index.js';

import {COLUMNS} from './constants.js';
import {matchesQuery} from './text-search.js';
import type {ColumnT} from './types.js';

function ColumnIcon(props: {column: ColumnT<>}) {
  if (props.column.kind === COLUMNS.BOOLEAN) {
    return '01';
  }

  if (props.column.kind === COLUMNS.CATEGORICAL) {
    return 'abc';
  }

  if (props.column.kind === COLUMNS.NUMERICAL) {
    return '#';
  }

  return <FilterIcon />;
}

type OptionsPropsT = {
  columns: ColumnT<>[],
  highlightIndex: number,
  onClick: (ColumnT<>) => void,
  onKeyDown: KeyboardEvent => void,
  onMouseEnter: number => void,
  onQueryChange: string => void,
  query: string,
  searchable: boolean,
};

function Options(props: OptionsPropsT) {
  const [css, theme] = useStyletron();
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  return (
    <div
      tabIndex="0"
      role="listbox"
      className={css({
        minWidth: '320px',
        paddingTop: theme.sizing.scale600,
        paddingBottom: theme.sizing.scale600,
      })}
      onKeyDown={props.onKeyDown}
    >
      <p
        className={css({
          ...theme.typography.font100,
          marginTop: 'unset',
          paddingRight: theme.sizing.scale600,
          paddingLeft: theme.sizing.scale600,
        })}
      >
        Select column to filter by
      </p>

      {props.searchable && (
        <div
          className={css({
            marginBottom: theme.sizing.scale500,
            marginRight: theme.sizing.scale600,
            marginLeft: theme.sizing.scale600,
          })}
        >
          <Input
            inputRef={inputRef}
            value={props.query}
            onChange={event => props.onQueryChange(event.target.value)}
            placeholder="Search for a column to filter by..."
            size={INPUT_SIZE.compact}
            clearable
          />
        </div>
      )}

      {!props.columns.length && (
        <div
          className={css({
            ...theme.typography.font100,
            paddingRight: theme.sizing.scale600,
            paddingLeft: theme.sizing.scale600,
          })}
        >
          No columns available.
        </div>
      )}

      <ul
        className={css({
          listStyleType: 'none',
          marginBlockStart: 'unset',
          marginBlockEnd: 'unset',
          paddingInlineStart: 'unset',
        })}
      >
        {props.columns.map((column, index) => {
          const isHighlighted = index === props.highlightIndex;
          return (
            // handled on the wrapper element
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              role="option"
              aria-selected={isHighlighted}
              onMouseEnter={() => props.onMouseEnter(index)}
              onClick={() => props.onClick(column)}
              key={column.title}
              className={css({
                ...theme.typography.font100,
                alignItems: 'center',
                backgroundColor: isHighlighted ? theme.colors.mono200 : null,
                cursor: 'pointer',
                display: 'flex',
                paddingTop: theme.sizing.scale100,
                paddingRight: theme.sizing.scale600,
                paddingBottom: theme.sizing.scale100,
                paddingLeft: theme.sizing.scale600,
              })}
            >
              <div
                className={css({
                  ...theme.typography.font150,
                  fontSize: '8px',
                  alignItems: 'center',
                  backgroundColor: theme.colors.mono300,
                  borderRadius: theme.borders.radius200,
                  display: 'flex',
                  height: theme.sizing.scale800,
                  justifyContent: 'center',
                  marginRight: theme.sizing.scale300,
                  width: theme.sizing.scale800,
                })}
              >
                <ColumnIcon column={column} />
              </div>
              {column.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type PropsT = {
  columns: ColumnT<>[],
  // eslint-disable-next-line flowtype/no-weak-types
  filters: Map<string, any>,
  // eslint-disable-next-line flowtype/no-weak-types
  rows: any[],
  onSetFilter: (
    filterParams: {description: string},
    columnTitle: string,
  ) => void,
};

function FilterMenu(props: PropsT) {
  const [, theme] = useStyletron();
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState(-1);
  const [query, setQuery] = React.useState('');

  const [activeColumn, setActiveColumn] = React.useState(null);
  const handleOptionClick = React.useCallback(setActiveColumn, []);
  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    setActiveColumn(null);
    setHighlightIndex(-1);
    setQuery('');
  }, []);

  const filterableColumns = React.useMemo(() => {
    return props.columns.filter(column => {
      return column.filterable && !props.filters.has(column.title);
    });
  }, [props.columns, props.filters]);

  const columns = React.useMemo(() => {
    return filterableColumns.filter(column =>
      matchesQuery(column.title, query),
    );
  }, [filterableColumns, query]);

  const Filter = React.useMemo(() => {
    if (!activeColumn) return null;
    return activeColumn.renderFilter;
  }, [activeColumn]);

  const activeColumnData = React.useMemo(() => {
    const columnIndex = props.columns.findIndex(c => c === activeColumn);
    if (columnIndex < 0) return [];
    return props.rows.map(row =>
      props.columns[columnIndex].mapDataToValue(row.data),
    );
  }, [props.columns, props.rows, activeColumn]);

  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      setActiveColumn(columns[highlightIndex]);
    }
    if (event.keyCode === 38) {
      event.preventDefault();
      setHighlightIndex(Math.max(0, highlightIndex - 1));
    }
    if (event.keyCode === 40) {
      event.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        setHighlightIndex(Math.min(columns.length - 1, highlightIndex + 1));
      }
    }
  }

  return (
    <Popover
      placement={PLACEMENT.bottomLeft}
      content={() => {
        if (Filter && activeColumn) {
          return (
            // eslint-disable-next-line jsx-a11y/no-autofocus
            <FocusLock autoFocus={false}>
              <Filter
                data={activeColumnData}
                close={handleClose}
                setFilter={filterParams =>
                  props.onSetFilter(filterParams, activeColumn.title)
                }
              />
            </FocusLock>
          );
        }

        return (
          <Options
            columns={columns}
            highlightIndex={highlightIndex}
            onClick={handleOptionClick}
            onKeyDown={handleKeyDown}
            onMouseEnter={setHighlightIndex}
            onQueryChange={setQuery}
            query={query}
            searchable={filterableColumns.length >= 10}
          />
        );
      }}
      onClick={() => {
        if (isOpen) {
          handleClose();
        } else {
          setIsOpen(true);
        }
      }}
      onClickOutside={handleClose}
      onEsc={handleClose}
      isOpen={isOpen}
      ignoreBoundary
    >
      <Button
        shape={SHAPE.pill}
        size={SIZE.compact}
        onKeyDown={handleKeyDown}
        overrides={{
          BaseButton: {
            style: {
              marginLeft: theme.sizing.scale500,
              marginBottom: theme.sizing.scale500,
            },
          },
        }}
      >
        Add Filter
      </Button>
    </Popover>
  );
}

export default FilterMenu;
