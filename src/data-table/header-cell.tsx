/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Checkbox } from '../checkbox';
import { LocaleContext } from '../locale';
import { useStyletron } from '../styles';
import ChevronDown from '../icon/chevron-down';
import ChevronUp from '../icon/chevron-up';

import { SORT_DIRECTIONS } from './constants';
import type { SortDirections } from './types';
import { isFocusVisible } from '../utils/focusVisible';

import type { SyntheticEvent } from 'react';

type HeaderCellProps = {
  index: number;
  isHovered: boolean;
  isMeasured?: boolean;
  isSelectable: boolean;
  isSelectedAll: boolean;
  isSelectedIndeterminate: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseEnter: (a: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onMouseLeave: (a: any) => void;
  onSelectAll: () => void;
  onSelectNone: () => void;
  onSort: (a: number) => void;
  sortable: boolean;
  sortDirection: SortDirections;
  title: string;
};

const HeaderCell = React.forwardRef<HTMLDivElement, HeaderCellProps>((props, ref) => {
  const locale = React.useContext(LocaleContext);
  const [css, theme] = useStyletron();
  const [focusVisible, setFocusVisible] = React.useState(false);
  const checkboxRef = React.useRef(null);

  const handleFocus = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      setFocusVisible(true);
    }
  };

  const handleBlur = () => {
    if (focusVisible !== false) {
      setFocusVisible(false);
    }
  };

  const backgroundColor = props.isHovered
    ? theme.colors.backgroundSecondary
    : theme.colors.backgroundPrimary;

  return (
    <div
      ref={ref}
      className={css({
        ...theme.typography.font350,
        alignItems: 'center',
        backgroundColor,
        color: theme.colors.contentPrimary,
        display: props.isMeasured ? 'inline-flex' : 'flex',
        flexGrow: 1,
        height: '100%',
        paddingLeft: theme.sizing.scale500,
      })}
    >
      {props.isSelectable && (
        <span
          className={css({
            paddingRight: theme.sizing.scale300,
          })}
          ref={checkboxRef}
        >
          <Checkbox
            onChange={() => {
              if (props.isSelectedAll || props.isSelectedIndeterminate) {
                props.onSelectNone();
              } else {
                props.onSelectAll();
              }
            }}
            aria-label={locale.datatable.selectAllRows}
            checked={props.isSelectedAll || props.isSelectedIndeterminate}
            isIndeterminate={props.isSelectedIndeterminate}
          />
        </span>
      )}
      <div
        aria-label={locale.datatable.sortColumn}
        className={css({
          alignItems: 'center',
          backgroundColor: 'transparent',
          border: 'none',
          boxSizing: 'border-box',
          // @ts-ignore
          cursor: props.sortable ? 'pointer' : null,
          display: 'flex',
          flexGrow: 1,
          height: '100%',
          outline: focusVisible ? `3px solid ${theme.colors.accent}` : 'none',
          outlineOffset: '-3px',
          // paddingLeft: theme.sizing.scale500,
          paddingRight: theme.sizing.scale500,
          whiteSpace: 'nowrap',
        })}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            props.onSort(props.index);
          }
        }}
        onClick={() => {
          if (props.sortable) {
            props.onSort(props.index);
          }
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        role="button"
        tabIndex={0}
      >
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
              {props.sortDirection === SORT_DIRECTIONS.DESC && (
                <ChevronDown
                  color={
                    props.sortDirection
                      ? theme.colors.contentPrimary
                      : theme.colors.contentSecondary
                  }
                />
              )}
              {(props.sortDirection === SORT_DIRECTIONS.ASC || !props.sortDirection) && (
                <ChevronUp
                  color={
                    props.sortDirection
                      ? theme.colors.contentPrimary
                      : theme.colors.contentSecondary
                  }
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
HeaderCell.displayName = 'HeaderCell';

export default HeaderCell;
