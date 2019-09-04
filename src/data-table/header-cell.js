/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {StatefulPopover, PLACEMENT} from '../popover/index.js';
import {useStyletron} from '../styles/index.js';
import ChevronDown from '../icon/chevron-down.js';
import ChevronUp from '../icon/chevron-up.js';
import FilterIcon from '../icon/filter.js';

import {SORT_DIRECTIONS} from './constants.js';
import type {SortDirectionsT} from './types.js';

type HeaderCellPropsT = {
  filter: React.ComponentType<{close: () => void}>,
  index: number,
  isHovered: boolean,
  isMeasured?: boolean,
  onMouseEnter: number => void,
  onMouseLeave: number => void,
  onSort: number => void,
  sortDirection: SortDirectionsT,
  title: string,
};

const HeaderCell = React.forwardRef<HeaderCellPropsT, HTMLDivElement>(
  (props, ref) => {
    const [useCss, theme] = useStyletron();
    const sortRef = React.useRef(null);

    const controlStyles = useCss({
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'space-between',
      width: '100px',
    });

    const filterButtonStyles = useCss({
      marginLeft: theme.sizing.scale600,
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
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
        ref={r => {
          if (typeof ref === 'function') {
            ref(r);
          }
          sortRef.current = r;
        }}
        className={useCss({
          ...theme.typography.font250,
          alignItems: 'center',
          backgroundColor: props.isHovered ? theme.colors.mono200 : null,
          boxSizing: 'border-box',
          cursor: 'pointer',
          display: props.isMeasured ? 'inline-block' : 'flex',
          height: '100%',
          paddingLeft: theme.sizing.scale600,
          paddingRight: theme.sizing.scale600,
        })}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
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
          {props.isHovered ? (
            <StatefulPopover
              placement={PLACEMENT.bottomLeft}
              ignoreBoundary
              onClick={e => e.stopPropagation()}
              content={({close}) => <Filter close={close} />}
            >
              <button className={filterButtonStyles}>
                <FilterIcon />
              </button>
            </StatefulPopover>
          ) : (
            <div />
          )}

          {(props.isHovered || props.sortDirection) && (
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
