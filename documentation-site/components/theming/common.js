/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

/**
 * Some re-usable layout components for displaying theme
 * properties and their default values.
 */

import * as React from 'react';
import {useStyletron, styled} from 'baseui';
import {LightTheme, DarkTheme} from 'baseui/themes';

const monospaceFontFamily =
  'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace';

export const Title = styled<{}>('div', ({$theme}) => {
  return {
    ...$theme.typography.ParagraphLarge,
    fontFamily: monospaceFontFamily,
  };
});

export const Value = styled<{}>('div', ({$theme}) => {
  return {
    ...$theme.typography.ParagraphSmall,
    fontFamily: monospaceFontFamily,
  };
});

export function Property({
  title,
  value,
  children,
}: {
  title: string,
  value: string | string[],
  children?: React.Node,
}) {
  return (
    <div>
      <Title>{title}</Title>
      {children && <div>{children}</div>}
      <Value>
        {Array.isArray(value) ? value.map(v => <div key={v}>{v}</div>) : value}
      </Value>
    </div>
  );
}

function Swatch({value, renderSwatch, renderValues, mode, left = false}) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({flexBasis: '50%', flexGrow: 1})}>
      <div
        className={css({
          backgroundColor: mode.colors.backgroundPrimary,
          paddingTop: theme.sizing.scale800,
          paddingBottom: theme.sizing.scale800,
          display: 'flex',
          justifyContent: 'center',
          borderTopStyle: 'solid',
          borderBottomStyle: 'solid',
          borderRightStyle: left ? null : 'solid',
          borderLeftStyle: left ? 'solid' : null,
          borderRightWidth: left ? null : '1px',
          borderLeftWidth: left ? '1px' : null,
          borderTopWidth: '1px',
          borderBottomWidth: '1px',
          borderTopColor: theme.colors.borderOpaque,
          borderBottomColor: theme.colors.borderOpaque,
          borderRightColor: theme.colors.borderOpaque,
          borderLeftColor: theme.colors.borderOpaque,
        })}
      >
        {renderSwatch({
          mode,
          commonStyles: {height: '50px', width: '50px'},
        })}
      </div>
      <Value>{renderValues({mode})}</Value>
    </div>
  );
}

// eslint-disable-next-line flowtype/no-weak-types
export function ThemeComparison(props: any) {
  const [css] = useStyletron();
  return (
    <div>
      <Title>{props.value}</Title>
      <div className={css({display: 'flex'})}>
        <Swatch {...props} mode={LightTheme} left />
        <Swatch {...props} mode={DarkTheme} />
      </div>
    </div>
  );
}
