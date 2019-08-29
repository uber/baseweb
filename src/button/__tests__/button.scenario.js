/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {Block} from '../../block/index.js';
import {Button, KIND} from '../index.js';

export const name = 'button';

export const component = () => (
  <React.Fragment>
    <Button kind={KIND.primary}>Button</Button>
    <Block as="span" marginLeft="scale300" />
    <Button kind={KIND.primary} isSelected>
      Selected
    </Button>
    <Block as="span" marginLeft="scale300" />
    <Button kind={KIND.primary} disabled>
      Disabled
    </Button>
    <Block marginBottom="scale300" />
    <Button kind={KIND.secondary}>Button</Button>
    <Block as="span" marginLeft="scale300" />
    <Button kind={KIND.secondary} isSelected>
      Selected
    </Button>
    <Block as="span" marginLeft="scale300" />
    <Button kind={KIND.secondary} disabled>
      Disabled
    </Button>
    <Block marginBottom="scale300" />
    <Button kind={KIND.tertiary}>Button</Button>
    <Block as="span" marginLeft="scale300" />
    <Button kind={KIND.tertiary} isSelected>
      Selected
    </Button>
    <Block as="span" marginLeft="scale300" />
    <Button kind={KIND.tertiary} disabled>
      Disabled
    </Button>
    <Block marginBottom="scale300" />
    <Button kind={KIND.minimal}>Button</Button>
    <Block as="span" marginLeft="scale300" />
    <Button kind={KIND.minimal} isSelected>
      Selected
    </Button>
    <Block as="span" marginLeft="scale300" />
    <Button kind={KIND.minimal} disabled>
      Disabled
    </Button>
  </React.Fragment>
);
