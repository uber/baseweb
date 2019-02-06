/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import React from 'react';
import {
  Caption1,
  Caption2,
  Display,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
  Label1,
  Label2,
  Paragraph1,
  Paragraph2,
} from './index.js';
import examples from './examples-list.js';

const textString = 'We ignite opportunity by setting the world in motion.';
const bodyString =
  "Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.";
export default {
  [examples.BODY]: function Story1() {
    return (
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
  },
  [examples.DISPLAY]: function Story2() {
    return <Display>{textString}</Display>;
  },
  [examples.HEADING]: function Story3() {
    return (
      <React.Fragment>
        <H6>{`H6 - ${textString}`}</H6>
        <H5>{`H5 - ${textString}`}</H5>
        <H4>{`H4 - ${textString}`}</H4>
        <H3>{`H3 - ${textString}`}</H3>
        <H2>{`H2 - ${textString}`}</H2>
        <H1>{`H1 - ${textString}`}</H1>
      </React.Fragment>
    );
  },
  [examples.CUSTOM]: function Story1() {
    return (
      <React.Fragment>
        <H6 color="negative">H6</H6>
        <Paragraph2 color="mono800">{`Paragraph2 - ${bodyString}`}</Paragraph2>
        <Label1 color="positive">Label1</Label1>
        <Paragraph1 color="primary">{`Paragraph1 - ${bodyString}`}</Paragraph1>
        <Caption2 padding="10px 30px" color="mono800">
          Caption2
        </Caption2>
        <Paragraph1
          color="mono800"
          marginLeft="30px"
          width="200px"
        >{`Paragraph1 - ${bodyString}`}</Paragraph1>
      </React.Fragment>
    );
  },
};
