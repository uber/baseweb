/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import {
  ParagraphXSmall,
  LabelXSmall,
  LabelLarge,
  LabelMedium,
  ParagraphLarge,
  ParagraphMedium,
} from '../index';

const bodyString =
  "Never in all their history have men been able truly to conceive of the world as one: a single sphere, a globe, having the qualities of a globe, a round earth in which all the directions eventually meet, in which there is no center because every point, or none, is center — an equal earth which all men occupy as equals. The airman's earth, if free men make it, will be truly round: a globe in practice, not in theory.";

export function Scenario() {
  return (
    <React.Fragment>
      <LabelMedium>LabelMedium</LabelMedium>
      <ParagraphMedium>{`ParagraphMedium - ${bodyString}`}</ParagraphMedium>
      <LabelLarge>LabelLarge</LabelLarge>
      <ParagraphLarge>{`ParagraphLarge - ${bodyString}`}</ParagraphLarge>
      <LabelXSmall>LabelXSmall</LabelXSmall>
      <ParagraphMedium>{`ParagraphMedium - ${bodyString}`}</ParagraphMedium>
      <ParagraphXSmall>ParagraphXSmall</ParagraphXSmall>
      <ParagraphLarge>{`ParagraphLarge - ${bodyString}`}</ParagraphLarge>
    </React.Fragment>
  );
}
