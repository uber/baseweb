/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Button, SIZE as BUTTON_SIZE} from '../button/index.js';
import {Checkbox, STYLE_TYPE} from '../checkbox/index.js';
import {useStyletron} from '../styles/index.js';
import {LocaleContext} from '../locale/index.js';
import {FILTER_SHELL_WIDTH} from './constants.js';

export type ExcludeKind = 'value' | 'range';

type PropsT = {
  children: React.Node,
  exclude: boolean,
  excludeKind?: ExcludeKind,
  onExcludeChange: () => void,
  onApply: () => void,
};

function FilterShell(props: PropsT) {
  const [css, theme] = useStyletron();
  const locale = React.useContext(LocaleContext);
  let excludeText;
  switch (props.excludeKind) {
    case 'value':
      excludeText = locale.datatable.filterExcludeValue;
      break;
    case 'range':
      excludeText = locale.datatable.filterExcludeRange;
      break;
    default:
      excludeText = locale.datatable.filterExclude;
  }
  return (
    <form
      className={css({
        backgroundColor: theme.colors.backgroundPrimary,
        paddingTop: theme.sizing.scale600,
        paddingRight: theme.sizing.scale600,
        paddingBottom: theme.sizing.scale600,
        paddingLeft: theme.sizing.scale600,
        width: FILTER_SHELL_WIDTH,
      })}
      onSubmit={event => {
        event.preventDefault();
        props.onApply();
      }}
    >
      {props.children}
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginTop: theme.sizing.scale600,
          gap: theme.sizing.scale200,
        })}
      >
        <div
          className={css({
            alignSelf: 'flex-start',
          })}
        >
          <Checkbox
            checked={props.exclude}
            onChange={props.onExcludeChange}
            checkmarkType={STYLE_TYPE.toggle_round}
            labelPlacement="right"
          >
            {excludeText}
          </Checkbox>
        </div>

        <Button size={BUTTON_SIZE.compact} type="submit">
          {locale.datatable.filterApply}
        </Button>
      </div>
    </form>
  );
}

export default FilterShell;
