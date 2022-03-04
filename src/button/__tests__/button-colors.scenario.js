/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';
import {useStyletron} from '../../styles/index.js';
import {Button, SHAPE} from '../index.js';

function Container({backgroundColor, children}) {
  const [css] = useStyletron();
  return (
    <div className={css({backgroundColor, padding: '16px'})}>{children}</div>
  );
}

export function Scenario() {
  const [css] = useStyletron();

  return (
    <div>
      <Container backgroundColor="#276ef1">
        <Button
          shape={SHAPE.pill}
          color={{background: '#1e54b7', text: 'white'}}
        >
          Label
        </Button>
      </Container>
      <Container backgroundColor="#eff3fe">
        <Button
          shape={SHAPE.pill}
          color={{background: '#d4e2fc', text: 'block'}}
        >
          Label
        </Button>
      </Container>

      <Container backgroundColor="#048848">
        <Button
          shape={SHAPE.pill}
          color={{background: '#03703c', text: 'white'}}
        >
          Label
        </Button>
      </Container>
      <Container backgroundColor="#e6f2ed">
        <Button
          shape={SHAPE.pill}
          color={{background: '#addec9', text: 'black'}}
        >
          Label
        </Button>
      </Container>

      <Container backgroundColor="#ffc043">
        <Button
          shape={SHAPE.pill}
          color={{background: '#ffe3ac', text: 'black'}}
        >
          Label
        </Button>
      </Container>
      <Container backgroundColor="#fffaf0">
        <Button
          shape={SHAPE.pill}
          color={{background: '#ffe3ac', text: 'black'}}
        >
          Label
        </Button>
      </Container>

      <Container backgroundColor="#e11900">
        <Button
          shape={SHAPE.pill}
          color={{background: '#ab1300', text: 'white'}}
        >
          Label
        </Button>
      </Container>
      <Container backgroundColor="#ffefed">
        <Button
          shape={SHAPE.pill}
          color={{background: '#fed7d2', text: 'black'}}
        >
          Label
        </Button>
      </Container>
    </div>
  );
}
