/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {
  Button,
  SHAPE as BUTTON_SHAPES,
  SIZE as BUTTON_SIZES,
  KIND as BUTTON_KINDS,
} from '../button/index.js';
import Search from '../icon/search.js';
import {Input, SIZE as INPUT_SIZES} from '../input/index.js';
import {Popover} from '../popover/index.js';
import {useStyletron} from '../styles/index.js';
import {Tag} from '../tag/index.js';

import FilterMenu from './filter-menu.js';
import {Unstable_DataTable} from './data-table.js';
import {Unstable_StatefulContainer} from './stateful-container.js';
import type {StatefulDataTablePropsT} from './types.js';

function useResizeObserver(
  ref: {current: HTMLElement | null},
  callback: (ResizeObserverEntry[], ResizeObserver) => mixed,
) {
  React.useLayoutEffect(() => {
    if (__BROWSER__) {
      if (ref.current) {
        const observer = new ResizeObserver(callback);
        observer.observe(ref.current);
        return () => observer.disconnect();
      }
    }
  }, [ref]);
}

function QueryInput(props) {
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState('');

  React.useEffect(() => {
    const timeout = setTimeout(() => props.onChange(value), 250);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className={css({width: '375px', marginBottom: theme.sizing.scale500})}>
      <Input
        aria-label="Search by text"
        overrides={{
          Before: function Before() {
            return (
              <div
                className={css({
                  alignItems: 'center',
                  display: 'flex',
                  paddingLeft: theme.sizing.scale500,
                })}
              >
                <Search size="18px" />
              </div>
            );
          },
        }}
        size={INPUT_SIZES.compact}
        onChange={event => setValue(event.target.value)}
        value={value}
        clearable
      />
    </div>
  );
}

function FilterTag(props) {
  const [css, theme] = useStyletron();
  const [isOpen, setIsOpen] = React.useState(false);
  const columnIndex = props.columns.findIndex(c => c.title === props.title);
  const column = props.columns[columnIndex];
  if (!column) {
    return null;
  }

  const data = props.rows.map(r => r.data[columnIndex]);
  const Filter = column.renderFilter;

  return (
    <Popover
      key={props.title}
      isOpen={isOpen}
      onClickOutside={() => setIsOpen(false)}
      content={() => (
        <Filter
          close={() => setIsOpen(false)}
          data={data}
          filterParams={props.filter}
          setFilter={filterParams =>
            props.onFilterAdd(filterParams, props.title)
          }
        />
      )}
    >
      <div>
        <Tag
          onClick={() => setIsOpen(!isOpen)}
          onActionClick={() => props.onFilterRemove(props.title)}
          overrides={{
            Root: {
              style: {
                borderTopLeftRadius: '36px',
                borderTopRightRadius: '36px',
                borderBottomLeftRadius: '36px',
                borderBottomRightRadius: '36px',
                height: '36px',
                marginTop: null,
                marginBottom: theme.sizing.scale500,
              },
            },
            Action: {
              style: {
                borderTopRightRadius: '36px',
                borderBottomRightRadius: '36px',
                height: '22px',
              },
            },
          }}
        >
          <span
            className={css({
              ...theme.typography.font150,
              color: theme.colors.mono1000,
            })}
          >
            {props.title}
          </span>
          : {props.filter.description}
        </Tag>
      </div>
    </Popover>
  );
}

export function Unstable_StatefulDataTable(props: StatefulDataTablePropsT) {
  const [css, theme] = useStyletron();
  const headlineRef = React.useRef(null);
  const [headlineHeight, setHeadlineHeight] = React.useState(64);
  useResizeObserver(headlineRef, entries => {
    setHeadlineHeight(entries[0].contentRect.height);
  });

  return (
    <Unstable_StatefulContainer
      batchActions={props.batchActions}
      columns={props.columns}
      onRowHighlightChange={props.onRowHighlightChange}
      onSelectionChange={props.onSelectionChange}
      rows={props.rows}
      rowActions={props.rowActions}
      rowHighlightIndex={props.rowHighlightIndex}
    >
      {({
        filters,
        onFilterAdd,
        onFilterRemove,
        onRowHighlightChange,
        onSelectMany,
        onSelectNone,
        onSelectOne,
        onSort,
        onTextQueryChange,
        rowHighlightIndex,
        selectedRowIds,
        sortIndex,
        sortDirection,
        textQuery,
      }) => (
        <React.Fragment>
          <div className={css({height: `${headlineHeight}px`})}>
            <div ref={headlineRef}>
              {!selectedRowIds.size && (
                <div
                  className={css({
                    alignItems: 'end',
                    display: 'flex',
                    flexWrap: 'wrap',
                    paddingTop: theme.sizing.scale500,
                  })}
                >
                  <QueryInput onChange={onTextQueryChange} />

                  <FilterMenu
                    columns={props.columns}
                    filters={filters}
                    rows={props.rows}
                    onSetFilter={onFilterAdd}
                  />

                  {Array.from(filters).map(([title, filter]) => (
                    <FilterTag
                      key={title}
                      columns={props.columns}
                      filter={filter}
                      onFilterAdd={onFilterAdd}
                      onFilterRemove={onFilterRemove}
                      rows={props.rows}
                      title={title}
                    />
                  ))}
                </div>
              )}

              {Boolean(selectedRowIds.size) && props.batchActions && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    paddingTop: theme.sizing.scale400,
                    paddingBottom: theme.sizing.scale400,
                  }}
                >
                  {props.batchActions.map(action => {
                    function onClick(event) {
                      action.onClick({
                        clearSelection: onSelectNone,
                        event,
                        selection: props.rows.filter(r =>
                          selectedRowIds.has(r.id),
                        ),
                      });
                    }

                    if (action.renderIcon) {
                      const Icon = action.renderIcon;
                      return (
                        <Button
                          key={action.label}
                          overrides={{
                            BaseButton: {props: {'aria-label': action.label}},
                          }}
                          onClick={onClick}
                          kind={BUTTON_KINDS.tertiary}
                          shape={BUTTON_SHAPES.round}
                        >
                          <Icon size={16} />
                        </Button>
                      );
                    }

                    return (
                      <Button
                        key={action.label}
                        onClick={onClick}
                        kind={BUTTON_KINDS.secondary}
                        size={BUTTON_SIZES.compact}
                      >
                        {action.label}
                      </Button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div
            style={{width: '100%', height: `calc(100% - ${headlineHeight}px)`}}
          >
            <Unstable_DataTable
              batchActions={props.batchActions}
              columns={props.columns}
              filters={filters}
              onRowHighlightChange={onRowHighlightChange}
              onSelectionChange={props.onSelectionChange}
              onSelectMany={onSelectMany}
              onSelectNone={onSelectNone}
              onSelectOne={onSelectOne}
              onSort={onSort}
              rowHighlightIndex={rowHighlightIndex}
              rows={props.rows}
              rowActions={props.rowActions}
              rowHeight={props.rowHeight}
              selectedRowIds={selectedRowIds}
              sortDirection={sortDirection}
              sortIndex={sortIndex}
              textQuery={textQuery}
            />
          </div>
        </React.Fragment>
      )}
    </Unstable_StatefulContainer>
  );
}
