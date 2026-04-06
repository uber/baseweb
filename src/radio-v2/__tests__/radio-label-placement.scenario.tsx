/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import {
  StatefulRadioGroup,
  Radio,
  LABEL_PLACEMENT,
  ALIGN,
} from '../../radio-v2';
import { HeadingSmall, LabelMedium } from '../../typography';

export function Scenario() {
  return (
    <div>
      <HeadingSmall>Label Placement: Top</HeadingSmall>
      <StatefulRadioGroup
        labelPlacement={LABEL_PLACEMENT.top}
        align={ALIGN.horizontal}
        initialState={{ value: '2' }}
        aria-label='label placement top'
        name='radio-label-placement-top'
      >
        <Radio
          value='1'
          description='This is a description for the first radio'
        >
          <LabelMedium>First</LabelMedium>
        </Radio>
        <Radio
          value='2'
          description='This is a description for the second radio. This is a description for the second radio. This is a description for the second radio. This is a description for the second radio.'
        >
          <LabelMedium>Second</LabelMedium>
        </Radio>
        <Radio
          value='3'
          description='This is a description for the third radio'
        >
          <LabelMedium>Third</LabelMedium>
        </Radio>
      </StatefulRadioGroup>

      <HeadingSmall marginTop='scale800'>
        Label Placement: Right (Default)
      </HeadingSmall>
      <StatefulRadioGroup
        labelPlacement={LABEL_PLACEMENT.right}
        initialState={{ value: '2' }}
        aria-label='label placement right'
        name='radio-label-placement-right'
      >
        <Radio
          value='1'
          description='This is a description for the first radio'
        >
          <LabelMedium>First</LabelMedium>
        </Radio>
        <Radio
          value='2'
          description='This is a description for the second radio. This is a description for the second radio. This is a description for the second radio. This is a description for the second radio.This is a description for the second radio. This is a description for the second radio. This is a description for the second radio. This is a description for the second radio.This is a description for the second radio. This is a description for the second radio. This is a description for the second radio. This is a description for the second radio.This is a description for the second radio. This is a description for the second radio. This is a description for the second radio. This is a description for the second radio.This is a description for the second radio. This is a description for the second radio. This is a description for the second radio. This is a description for the second radio.'
        >
          <LabelMedium>Second</LabelMedium>
        </Radio>
        <Radio
          value='3'
          description='This is a description for the third radio'
        >
          <LabelMedium>Third</LabelMedium>
        </Radio>
      </StatefulRadioGroup>

      <HeadingSmall marginTop='scale800'>Label Placement: Bottom</HeadingSmall>
      <StatefulRadioGroup
        labelPlacement={LABEL_PLACEMENT.bottom}
        align={ALIGN.horizontal}
        initialState={{ value: '2' }}
        aria-label='label placement bottom'
        name='radio-label-placement-bottom'
      >
        <Radio
          value='1'
          description='This is a description for the first radio'
        >
          <LabelMedium>First</LabelMedium>
        </Radio>
        <Radio
          value='2'
          description='This is a description for the second radio. This is a description for the second radio. This is a description for the second radio. This is a description for the second radio.'
        >
          <LabelMedium>Second</LabelMedium>
        </Radio>
        <Radio
          value='3'
          description='This is a description for the third radio'
        >
          <LabelMedium>Third</LabelMedium>
        </Radio>
      </StatefulRadioGroup>

      <HeadingSmall marginTop='scale800'>Label Placement: Left</HeadingSmall>
      <StatefulRadioGroup
        labelPlacement={LABEL_PLACEMENT.left}
        initialState={{ value: '2' }}
        aria-label='label placement left'
        name='radio-label-placement-left'
      >
        <Radio
          value='1'
          description='This is a description for the first radio'
        >
          <LabelMedium>First</LabelMedium>
        </Radio>
        <Radio
          value='2'
          description='This is a description for the second radio'
        >
          <LabelMedium>Second</LabelMedium>
        </Radio>
        <Radio
          value='3'
          description='This is a description for the third radio'
        >
          <LabelMedium>Third</LabelMedium>
        </Radio>
      </StatefulRadioGroup>
    </div>
  );
}
