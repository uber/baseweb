/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Checkbox} from '../checkbox/index.js';
import {useStyletron} from '../styles/index.js';
import ChevronDown from '../icon/chevron-down.js';
import ChevronUp from '../icon/chevron-up.js';

import {SORT_DIRECTIONS} from './constants.js';
import type {SortDirectionsT} from './types.js';

type HeaderCellPropsT = {|
  index: number,
  isHovered: boolean,
  isMeasured?: boolean,
  isSelectable: boolean,
  isSelectedAll: boolean,
  isSelectedIndeterminate: boolean,
  onMouseEnter: number => void,
  onMouseLeave: number => void,
  onSelectAll: () => void,
  onSelectNone: () => void,
  onSort: number => void,
  sortable: boolean,
  sortDirection: SortDirectionsT,
  title: string,
|};

const HeaderCell = React.forwardRef<HeaderCellPropsT, HTMLDivElement>(
  (props, ref) => {
    const [css, theme] = useStyletron();

    const backgroundColor = props.isHovered
      ? theme.colors.mono200
      : theme.colors.mono100;

    return (
      <div
        ref={ref}
        role="button"
        tabIndex="0"
        className={css({
          ...theme.typography.font150,
          alignItems: 'center',
          backgroundColor,
          boxSizing: 'border-box',
          cursor: props.sortable ? 'pointer' : null,
          display: props.isMeasured ? 'inline-flex' : 'flex',
          flexGrow: 1,
          height: '100%',
          paddingLeft: theme.sizing.scale500,
          paddingRight: theme.sizing.scale500,
          flexWrap: 'nowrap',
          whiteSpace: 'nowrap',
        })}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onKeyUp={event => {
          if (event.key === 'Enter') {
            props.onSort(props.index);
          }
        }}
        onClick={() => props.onSort(props.index)}
      >
        {props.isSelectable && (
          <Checkbox
            onChange={e => {
              if (props.isSelectedAll || props.isSelectedIndeterminate) {
                props.onSelectNone();
              } else {
                props.onSelectAll();
              }
            }}
            checked={props.isSelectedAll || props.isSelectedIndeterminate}
            isIndeterminate={props.isSelectedIndeterminate}
          />
        )}
        {props.title}
        <div
          className={css({
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          })}
        >
          {(props.isHovered || props.sortDirection) && props.sortable && (
            <div
              style={{
                backgroundColor,
                display: 'flex',
                alignItems: 'center',
                position: 'absolute',
                right: -4,
              }}
            >
              {(props.sortDirection === SORT_DIRECTIONS.DESC ||
                !props.sortDirection) && (
                <ChevronDown
                  color={
                    props.sortDirection
                      ? theme.colors.primary
                      : theme.colors.mono600
                  }
                />
              )}
              {props.sortDirection === SORT_DIRECTIONS.ASC && (
                <ChevronUp
                  color={
                    props.sortDirection
                      ? theme.colors.primary
                      : theme.colors.mono600
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);
HeaderCell.displayName = 'HeaderCell';

export default HeaderCell;
