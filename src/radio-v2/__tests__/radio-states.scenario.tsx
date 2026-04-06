/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { Radio, ALIGN } from '../../radio-v2';
import { StyledTable, StyledHeadCell, StyledBodyCell } from '../../table-grid';
import { HeadingMedium, LabelMedium } from '../../typography';

export function Scenario() {
  return (
    <div>
      <HeadingMedium>Radio illustrations - States</HeadingMedium>
      <LabelMedium>
        Note: This story is not suitable for accessibility testing. The
        standalone radios have to be handled by a baseui RadioGroup or product
        team with their own logic on isFocused, isFocusVisible, checked,
        tabIndex, etc.
      </LabelMedium>
      <StyledTable role='grid' $gridTemplateColumns='200px 1fr 1fr'>
        {/* Header Row */}
        <StyledHeadCell>
          <LabelMedium>State</LabelMedium>
        </StyledHeadCell>
        <StyledHeadCell>
          <LabelMedium>Unchecked</LabelMedium>
        </StyledHeadCell>
        <StyledHeadCell>
          <LabelMedium>Checked</LabelMedium>
        </StyledHeadCell>

        {/* Standalone radio Row */}
        <StyledBodyCell>
          <LabelMedium>Standalone</LabelMedium>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={false} />
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={true} />
        </StyledBodyCell>

        {/* Default Row */}
        <StyledBodyCell>
          <LabelMedium>Default</LabelMedium>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={false}>Option</Radio>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={true}>Option</Radio>
        </StyledBodyCell>

        {/* Disabled Row */}
        <StyledBodyCell>
          <LabelMedium>Disabled</LabelMedium>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={false} disabled>
            Option
          </Radio>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={true} disabled>
            Option
          </Radio>
        </StyledBodyCell>

        {/* Error Row */}
        <StyledBodyCell>
          <LabelMedium>Error</LabelMedium>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={false} error>
            Option
          </Radio>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={true} error>
            Option
          </Radio>
        </StyledBodyCell>

        {/* Disabled + Error Row */}
        <StyledBodyCell>
          <LabelMedium>Disabled + Error</LabelMedium>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={false} error disabled>
            Option
          </Radio>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={true} error disabled>
            Option
          </Radio>
        </StyledBodyCell>

        {/* With Label Row */}
        <StyledBodyCell>
          <LabelMedium>With Label</LabelMedium>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={false}>Radio Label</Radio>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={true}>Radio Label</Radio>
        </StyledBodyCell>

        {/* With Label + Description Row */}
        <StyledBodyCell>
          <LabelMedium>With Label + Description</LabelMedium>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={false} description='This is a description text'>
            Radio Label
          </Radio>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={true} description='This is a description text'>
            Radio Label
          </Radio>
        </StyledBodyCell>

        {/* With Long Label + Description Row */}
        <StyledBodyCell>
          <LabelMedium>With Long Label + Description</LabelMedium>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={false} description='This is a description text'>
            Radio Label with a very long text to illustrate wrapping and layout
            behavior
          </Radio>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio checked={true} description='This is a description text'>
            Radio Label with a very long text to illustrate wrapping and layout
            behavior
          </Radio>
        </StyledBodyCell>

        {/* With Long Label + Long Description Row */}
        <StyledBodyCell>
          <LabelMedium>
            With Long Label + Long Description(set as horizontal alignment)
          </LabelMedium>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio
            align={ALIGN.horizontal}
            checked={false}
            description='This is a description text with a very long text to illustrate wrapping and layout behavior and it is designed to span more than 3 lines in order to test the truncation style applied to the description in this specific scenario'
          >
            Radio Label with a very long text to illustrate wrapping and layout
            behavior and it is designed to span more than 3 lines in order to
            test the truncation style applied to the label in this specific
            scenario
          </Radio>
        </StyledBodyCell>
        <StyledBodyCell>
          <Radio
            checked={true}
            align={ALIGN.horizontal}
            description='This is a description text with a very long text to illustrate wrapping and layout behavior and it is designed to span more than 3 lines in order to test the truncation style applied to the description in this specific scenario'
          >
            Radio Label with a very long text to illustrate wrapping and layout
            behavior and it is designed to span more than 3 lines in order to
            test the truncation style applied to the label in this specific
            scenario
          </Radio>
        </StyledBodyCell>
      </StyledTable>
    </div>
  );
}
