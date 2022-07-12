/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import React from 'react';
import { Button, SHAPE, SIZE } from '../button';
import { Filter as FilterIcon } from '../icon';
import { Input, SIZE as INPUT_SIZE } from '../input';
import { Popover, PLACEMENT } from '../popover';
import { useStyletron } from '../styles';
import { useUIDSeed } from 'react-uid';

import { COLUMNS } from './constants';
import { matchesQuery } from './text-search';
import type { ColumnT } from './types';
import { LocaleContext } from '../locale';

import { isFocusVisible } from '../utils/focusVisible';

import type { SyntheticEvent } from 'react';

const ColumnIcon: React.FC<{ column: ColumnT }> = (props) => {
  if (props.column.kind === COLUMNS.BOOLEAN) {
    return <>01</>;
  }

  if (props.column.kind === COLUMNS.CATEGORICAL) {
    return <>abc</>;
  }

  if (props.column.kind === COLUMNS.DATETIME) {
    return <>dt</>;
  }

  if (props.column.kind === COLUMNS.NUMERICAL) {
    return <>#</>;
  }

  return <FilterIcon />;
};

type OptionsPropsT = {
  columns: ColumnT[];
  highlightIndex: number;
  onClick: (a: ColumnT) => void;
  onKeyDown: (a: React.KeyboardEvent) => void;
  onMouseEnter: (a: number) => void;
  onQueryChange: (a: string) => void;
  query: string;
  searchable: boolean;
};

function Options(props: OptionsPropsT) {
  const [css, theme] = useStyletron();
  const locale = React.useContext(LocaleContext);
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const [focusVisible, setFocusVisible] = React.useState(false);
  const seed = useUIDSeed();
  const buiRef = React.useRef(props.columns.map((col) => seed(col)));

  const handleFocus = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  };

  const handleBlur = (event: SyntheticEvent) => {
    if (focusVisible !== false) {
      setFocusVisible(false);
    }
  };

  return (
    <div
      className={css({
        backgroundColor: theme.colors.menuFill,
        minWidth: '320px',
        outline: focusVisible ? `3px solid ${theme.colors.accent}` : 'none',
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
        {locale.datatable.optionsLabel}
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
            onChange={(event) => props.onQueryChange(event.target.value)}
            placeholder={locale.datatable.optionsSearch}
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
          {locale.datatable.optionsEmpty}
        </div>
      )}

      <ul
        onKeyDown={props.onKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        role="listbox"
        aria-activedescendant={`bui-${buiRef.current[props.highlightIndex]}`}
        className={css({
          listStyleType: 'none',
          marginBlockStart: 'unset',
          marginBlockEnd: 'unset',
          maxHeight: '256px',
          paddingInlineStart: 'unset',
          outline: 'none',
          overflowY: 'auto',
        })}
      >
        {props.columns.map((column, index) => {
          const isHighlighted = index === props.highlightIndex;

          return (
            // handled on the wrapper element
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <li
              id={`bui-${buiRef.current[index]}`}
              role="option"
              aria-selected={isHighlighted}
              onMouseEnter={() => props.onMouseEnter(index)}
              onClick={() => props.onClick(column)}
              key={column.title}
              className={css({
                ...theme.typography.font100,
                alignItems: 'center',
                backgroundColor: isHighlighted ? theme.colors.menuFillHover : null,
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
                  backgroundColor: theme.colors.backgroundTertiary,
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
  columns: ColumnT[];
  // flowlint-next-line unclear-type:off
  filters: Map<string, any>;
  // flowlint-next-line unclear-type:off
  rows: any[];
  onSetFilter: (
    columnTitle: string,
    filterParams: {
      description: string;
    }
  ) => void;
};

function FilterMenu(props: PropsT) {
  const [, theme] = useStyletron();
  const locale = React.useContext(LocaleContext);
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
    return props.columns.filter((column) => {
      return column.filterable && !props.filters.has(column.title);
    });
  }, [props.columns, props.filters]);

  const columns = React.useMemo(() => {
    return filterableColumns.filter((column) => matchesQuery(column.title, query));
  }, [filterableColumns, query]);

  const Filter = React.useMemo(() => {
    if (!activeColumn) return null;
    return activeColumn.renderFilter;
  }, [activeColumn]);

  const activeColumnData = React.useMemo(() => {
    const columnIndex = props.columns.findIndex((c) => c === activeColumn);
    if (columnIndex < 0) return [];
    return props.rows.map((row) => props.columns[columnIndex].mapDataToValue(row.data));
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
      focusLock
      returnFocus={true}
      placement={PLACEMENT.bottomLeft}
      content={() => {
        if (Filter && activeColumn) {
          return (
            <Filter
              data={activeColumnData}
              close={handleClose}
              setFilter={(filterParams) => props.onSetFilter(activeColumn.title, filterParams)}
            />
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
        overrides={{
          BaseButton: {
            style: {
              marginLeft: theme.sizing.scale500,
              marginBottom: theme.sizing.scale500,
            },
          },
        }}
      >
        {locale.datatable.filterAdd}
      </Button>
    </Popover>
  );
}

export default FilterMenu;
