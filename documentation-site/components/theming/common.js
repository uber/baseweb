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

const SubTitle = styled<{}>('span', ({$theme}) => {
  return {
    ...$theme.typography.MonoLabelSmall,
    fontStyle: 'italic',
    color: $theme.colors.contentSecondary,
  };
});

export const Title = styled<{}>('div', ({$theme}) => {
  return {
    ...$theme.typography.MonoHeadingXSmall,
  };
});

export const Value = styled<{}>('div', ({$theme}) => {
  return {
    ...$theme.typography.MonoParagraphSmall,
  };
});

// $FlowFixMe
export function Property({name, concern, renderPreview, renderValue}) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({marginBottom: theme.sizing.scale800})}>
      <Title $style={{marginBottom: theme.sizing.scale200}}>
        <SubTitle>theme.{concern}.</SubTitle>
        {name}
      </Title>
      {renderPreview && (
        <div className={css({marginBottom: theme.sizing.scale300})}>
          {renderPreview()}
        </div>
      )}
      <Value>{renderValue && renderValue()}</Value>
    </div>
  );
}

// $FlowFixMe
export function PropertyCompareTheme({name, concern, renderBox, renderValue}) {
  const [css] = useStyletron();
  return (
    <Property
      name={name}
      concern={concern}
      renderPreview={() => {
        return (
          <div className={css({display: 'flex'})}>
            <div className={css({flexBasis: '50%'})}>
              <Swatch renderBox={renderBox} previewTheme={LightTheme} left />
            </div>
            <div className={css({flexBasis: '50%'})}>
              <Swatch renderBox={renderBox} previewTheme={DarkTheme} />
            </div>
          </div>
        );
      }}
      renderValue={() => {
        return (
          <div className={css({display: 'flex'})}>
            <div className={css({flexBasis: '50%'})}>
              <Value>{renderValue({previewTheme: LightTheme})}</Value>
            </div>
            <div className={css({flexBasis: '50%'})}>
              <Value>{renderValue({previewTheme: DarkTheme})}</Value>
            </div>
          </div>
        );
      }}
    />
  );
}

function Swatch({renderBox, previewTheme, left = false}) {
  const [css, theme] = useStyletron();
  return (
    <div
      className={css({
        backgroundColor: previewTheme.colors.backgroundPrimary,
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
      {renderBox({
        previewTheme,
        commonStyles: {height: '50px', width: '50px'},
      })}
    </div>
  );
}
