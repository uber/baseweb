/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import FocusLock from 'react-focus-lock';

import {Button, SHAPE, SIZE} from '../button/index.js';
import {Popover, PLACEMENT} from '../popover/index.js';
import {useStyletron} from '../styles/index.js';
import type {ColumnT} from './types.js';

type OptionsPropsT = {
  columns: ColumnT<>[],
  highlightIndex: number,
  onClick: (ColumnT<>) => void,
  onMouseEnter: number => void,
};

function Options(props: OptionsPropsT) {
  const [css, theme] = useStyletron();

  return (
    <div
      className={css({
        paddingTop: theme.sizing.scale600,
        paddingBottom: theme.sizing.scale600,
      })}
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
      <ul
        role="listbox"
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
                  backgroundColor: theme.colors.mono300,
                  borderRadius: theme.borders.radius200,
                  height: theme.sizing.scale800,
                  marginRight: theme.sizing.scale300,
                  width: theme.sizing.scale800,
                })}
              >
                #
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
    filterParams: mixed,
    columnTitle: string,
    description: string,
  ) => void,
};

function FilterMenu(props: PropsT) {
  const [, theme] = useStyletron();
  const [isOpen, setIsOpen] = React.useState(false);
  const [highlightIndex, setHighlightIndex] = React.useState(-1);

  const [activeColumn, setActiveColumn] = React.useState(null);
  const handleOptionClick = React.useCallback(setActiveColumn, []);
  const handleClose = React.useCallback(() => {
    setIsOpen(false);
    setActiveColumn(null);
    setHighlightIndex(-1);
  }, []);

  const columns = React.useMemo(() => {
    return props.columns.filter(column => {
      return column.filterable && !props.filters.has(column.title);
    });
  }, [props.columns, props.filters]);

  const Filter = React.useMemo(() => {
    if (!activeColumn) return null;
    return activeColumn.renderFilter;
  }, [activeColumn]);

  const activeColumnData = React.useMemo(() => {
    const columnIndex = props.columns.findIndex(c => c === activeColumn);
    if (columnIndex <= 0) return [];
    return props.rows.map(row => row.data[columnIndex]);
  }, [props.columns, props.rows, activeColumn]);

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
                setFilter={(filterParams, description) =>
                  props.onSetFilter(
                    filterParams,
                    activeColumn.title,
                    description,
                  )
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
            onMouseEnter={setHighlightIndex}
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
        overrides={{
          BaseButton: {style: {marginLeft: theme.sizing.scale500}},
        }}
        onKeyDown={(event: KeyboardEvent) => {
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
              setHighlightIndex(
                Math.min(columns.length - 1, highlightIndex + 1),
              );
            }
          }
        }}
      >
        Add Filter
      </Button>
    </Popover>
  );
}

export default FilterMenu;
