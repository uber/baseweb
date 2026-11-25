/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useStyletron } from '../../styles';
import { Tag } from '../../tag';
import { LabelSmall } from '../../typography';
import { TagGroup } from '..';

const LONG_TEXT = 'A very long tag text to test wrapping behavior';

function Frame({ width, label, children }) {
  const [css, theme] = useStyletron();
  return (
    <div className={css({ marginBottom: theme.sizing.scale800 })}>
      <LabelSmall marginBottom="scale300">{label}</LabelSmall>
      <div
        className={css({
          width,
          outline: `1px dashed ${theme.colors.borderAccent}`,
        })}
      >
        {children}
      </div>
    </div>
  );
}

export function Scenario() {
  return (
    <div>
      <Frame width="100px" label="100px container, no Tag overrides">
        <TagGroup>
          <Tag>gray</Tag>
          <Tag kind="red">{LONG_TEXT}</Tag>
        </TagGroup>
      </Frame>

      <Frame width="100px" label="100px container, Tag with overrides.Root.props">
        <TagGroup>
          <Tag>gray</Tag>
          <Tag kind="red" overrides={{ Root: { props: { 'data-testid': 'long-tag' } } }}>
            {LONG_TEXT}
          </Tag>
        </TagGroup>
      </Frame>

      <Frame width="300px" label="300px container, contentMaxWidth={null}, no Tag overrides">
        <TagGroup>
          <Tag contentMaxWidth={null}>gray</Tag>
          <Tag contentMaxWidth={null} kind="blue">
            {`${LONG_TEXT} with a full-width label`}
          </Tag>
        </TagGroup>
      </Frame>

      <Frame
        width="300px"
        label="300px container, contentMaxWidth={null}, Tag with overrides.Root.style"
      >
        <TagGroup>
          <Tag contentMaxWidth={null}>gray</Tag>
          <Tag
            contentMaxWidth={null}
            kind="blue"
            overrides={{ Root: { style: { borderTopLeftRadius: 0 } } }}
          >
            {`${LONG_TEXT} with a full-width label`}
          </Tag>
        </TagGroup>
      </Frame>
    </div>
  );
}
