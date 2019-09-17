/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Popover, PLACEMENT} from '../popover/index.js';
import {useStyletron} from '../styles/index.js';
import ChevronDown from '../icon/chevron-down.js';
import ChevronUp from '../icon/chevron-up.js';
import FilterIcon from '../icon/filter.js';

import {SORT_DIRECTIONS} from './constants.js';
import type {SortDirectionsT} from './types.js';

type HeaderCellPropsT = {
  filter: React.ComponentType<{close: () => void}>,
  filterable: boolean,
  index: number,
  isFilterOpen: boolean,
  isHovered: boolean,
  isMeasured?: boolean,
  onFilterOpen: () => void,
  onFilterClose: () => void,
  onMouseEnter: number => void,
  onMouseLeave: number => void,
  onSort: number => void,
  sortable: boolean,
  sortDirection: SortDirectionsT,
  title: string,
};

const HeaderCell = React.forwardRef<HeaderCellPropsT, HTMLDivElement>(
  (props, ref) => {
    const [css, theme] = useStyletron();
    const sortRef = React.useRef(null);

    const controlStyles = css({
      alignItems: 'center',
      display: 'flex',
      flexShrink: 2,
      marginLeft: theme.sizing.scale600,
      justifyContent: 'space-between',
    });

    const filterButtonStyles = css({
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      marginRight: props.sortable ? theme.sizing.scale600 : null,
      paddingTop: 0,
      paddingRight: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      ':hover': {
        color: theme.colors.primary,
      },
    });

    const Filter = props.filter;

    return (
      <div
        role="button"
        tabIndex="0"
        ref={r => {
          if (typeof ref === 'function') {
            ref(r);
          }
          sortRef.current = r;
        }}
        className={css({
          ...theme.typography.font250,
          alignItems: 'center',
          backgroundColor: props.isHovered ? theme.colors.mono200 : null,
          boxSizing: 'border-box',
          cursor: props.sortable ? 'pointer' : null,
          display: props.isMeasured ? 'inline-flex' : 'flex',
          height: '100%',
          paddingLeft: theme.sizing.scale600,
          paddingRight: theme.sizing.scale600,
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
        })}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={event => {
          if (!props.isFilterOpen) {
            props.onMouseLeave(event);
          }
        }}
        onKeyUp={event => {
          if (event.key === 'Enter') {
            props.onSort(props.index);
          }
        }}
        onClick={event => {
          if (
            event.target.isSameNode(sortRef.current) ||
            (sortRef.current && sortRef.current.contains(event.target))
          ) {
            props.onSort(props.index);
          }
        }}
      >
        {props.title}
        <div className={controlStyles}>
          {props.isHovered && props.filterable ? (
            <Popover
              placement={PLACEMENT.bottomLeft}
              ignoreBoundary
              isOpen={props.isFilterOpen}
              onClick={e => {
                e.stopPropagation();
                props.onFilterOpen();
              }}
              onClickOutside={() => {
                props.onFilterClose();
              }}
              content={() => <Filter close={props.onFilterClose} />}
            >
              <button className={filterButtonStyles}>
                <FilterIcon />
              </button>
            </Popover>
          ) : (
            <div />
          )}

          {(props.isHovered || props.sortDirection) && props.sortable && (
            <>
              {(props.sortDirection === SORT_DIRECTIONS.DESC ||
                !props.sortDirection) && (
                <ChevronDown
                  color={props.sortDirection ? theme.colors.primary : undefined}
                />
              )}
              {props.sortDirection === SORT_DIRECTIONS.ASC && (
                <ChevronUp
                  color={props.sortDirection ? theme.colors.primary : undefined}
                />
              )}
            </>
          )}
        </div>
      </div>
    );
  },
);
HeaderCell.displayName = 'HeaderCell';

export default HeaderCell;
