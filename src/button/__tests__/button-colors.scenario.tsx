/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useStyletron } from '../..';
import { Button, SHAPE } from '..';

function Container({ backgroundColor, children }: { backgroundColor: string; children: React.ReactNode }) {
  const [css] = useStyletron();
  return <div className={css({ backgroundColor, padding: '16px' })}>{children}</div>;
}

export function Scenario() {
  return (
    <div>
      <Container backgroundColor="#276ef1">
        <Button shape={SHAPE.pill} colors={{ backgroundColor: '#1e54b7', color: 'white' }}>
          Label
        </Button>
      </Container>
      <Container backgroundColor="#eff3fe">
        <Button shape={SHAPE.pill} colors={{ backgroundColor: '#d4e2fc', color: 'block' }}>
          Label
        </Button>
      </Container>

      <Container backgroundColor="#048848">
        <Button shape={SHAPE.pill} colors={{ backgroundColor: '#03703c', color: 'white' }}>
          Label
        </Button>
      </Container>
      <Container backgroundColor="#e6f2ed">
        <Button shape={SHAPE.pill} colors={{ backgroundColor: '#addec9', color: 'black' }}>
          Label
        </Button>
      </Container>

      <Container backgroundColor="#ffc043">
        <Button shape={SHAPE.pill} colors={{ backgroundColor: '#ffe3ac', color: 'black' }}>
          Label
        </Button>
      </Container>
      <Container backgroundColor="#fffaf0">
        <Button shape={SHAPE.pill} colors={{ backgroundColor: '#ffe3ac', color: 'black' }}>
          Label
        </Button>
      </Container>

      <Container backgroundColor="#e11900">
        <Button shape={SHAPE.pill} colors={{ backgroundColor: '#ab1300', color: 'white' }}>
          Label
        </Button>
      </Container>
      <Container backgroundColor="#ffefed">
        <Button shape={SHAPE.pill} colors={{ backgroundColor: '#fed7d2', color: 'black' }}>
          Label
        </Button>
      </Container>
      <Container backgroundColor="#276ef1">
        <Button disabled shape={SHAPE.pill} colors={{ backgroundColor: '#1e54b7', color: 'white' }}>
          Disabled
        </Button>
      </Container>
    </div>
  );
}
