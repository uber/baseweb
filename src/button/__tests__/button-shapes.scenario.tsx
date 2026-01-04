/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { styled } from '../..';
import { Button, SHAPE, SIZE } from '..';
import Upload from '../../icon/upload';
import ChevronRight from '../../icon/chevron-right';
import { HeadingMedium, HeadingXSmall } from '../../typography';

const Container = styled('div', ({ $theme }) => ({
  display: 'flex',
  gap: $theme.sizing.scale400,
  alignItems: 'center',
  margin: `${$theme.sizing.scale400} 0`,
}));

export function Scenario() {
  return (
    <React.Fragment>
      <HeadingMedium marginTop="0" marginBottom="0">
        Render Buttons with different shapes
      </HeadingMedium>
      <HeadingXSmall marginTop="0" marginBottom="8px">
        shape: default(rectangular)
      </HeadingXSmall>
      <Container>
        <Button size={SIZE.large}>Default</Button>
        <Button>Default</Button>
        <Button size={SIZE.compact}>Default</Button>
      </Container>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        shape: pill(rounded)
      </HeadingXSmall>
      <Container>
        <Button shape={SHAPE.pill} size={SIZE.large}>
          Label
        </Button>
        <Button
          startEnhancer={() => <Upload />}
          endEnhancer={() => <ChevronRight />}
          shape={SHAPE.pill}
          size={SIZE.large}
        >
          Label
        </Button>
      </Container>
      <Container>
        <Button shape={SHAPE.pill}>Label</Button>
        <Button
          startEnhancer={() => <Upload />}
          endEnhancer={() => <ChevronRight />}
          shape={SHAPE.pill}
        >
          Label
        </Button>
      </Container>
      <Container>
        <Button shape={SHAPE.pill} size={SIZE.compact}>
          Label
        </Button>
        <Button
          startEnhancer={() => <Upload />}
          endEnhancer={() => <ChevronRight />}
          shape={SHAPE.pill}
          size={SIZE.compact}
        >
          Label
        </Button>
      </Container>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        shape: round(deprecated, use circle or square instead)
      </HeadingXSmall>
      <Container>
        <Button shape={SHAPE.round} size={SIZE.large}>
          <Upload size={24} />
        </Button>
        <Button shape={SHAPE.round}>
          <Upload size={20} />
        </Button>
        <Button shape={SHAPE.round} size={SIZE.compact}>
          <Upload />
        </Button>
      </Container>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        shape: circle
      </HeadingXSmall>
      <Container>
        <Button shape={SHAPE.circle} size={SIZE.large}>
          <Upload size={24} />
        </Button>
        <Button shape={SHAPE.circle}>
          <Upload size={20} />
        </Button>
        <Button shape={SHAPE.circle} size={SIZE.compact}>
          <Upload />
        </Button>
      </Container>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        shape: square
      </HeadingXSmall>
      <Container>
        <Button shape={SHAPE.square} size={SIZE.large}>
          <Upload size={24} />
        </Button>
        <Button shape={SHAPE.square}>
          <Upload size={20} />
        </Button>
        <Button shape={SHAPE.square} size={SIZE.compact}>
          <Upload />
        </Button>
      </Container>
    </React.Fragment>
  );
}
