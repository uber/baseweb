/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';

import {
  Caption1,
  Caption2,
  Label1,
  Label2,
  Paragraph1,
  Paragraph2,
} from '../index.js';

export const name = 'typography-body';

const bodyString =
  "Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.";

export const component = () => (
  <React.Fragment>
    <Label2>Label2</Label2>
    <Paragraph2>{`Paragraph2 - ${bodyString}`}</Paragraph2>
    <Label1>Label1</Label1>
    <Paragraph1>{`Paragraph1 - ${bodyString}`}</Paragraph1>
    <Caption2>Caption2</Caption2>
    <Paragraph2>{`Paragraph2 - ${bodyString}`}</Paragraph2>
    <Caption1>Caption1</Caption1>
    <Paragraph1>{`Paragraph1 - ${bodyString}`}</Paragraph1>
  </React.Fragment>
);
