/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useStyletron } from '../..';
import { Button, KIND, SHAPE } from '..';
import ArrowRight from '../../icon/arrow-right';
import ArrowLeft from '../../icon/arrow-left';
import { HeadingMedium, HeadingXSmall } from '../../typography';

export function Scenario() {
  const [css] = useStyletron();

  return (
    <React.Fragment>
      <HeadingMedium marginTop="0" marginBottom="0">
        Button with Functional Children
      </HeadingMedium>

      {/* Test 1: Different labels based on state */}
      <HeadingXSmall marginTop="0" marginBottom="8px">
        Dynamic Text Labels Based on Button State
      </HeadingXSmall>
      <div className={css({ margin: '16px 0', display: 'flex', gap: '16px', flexWrap: 'wrap' })}>
        <Button kind={KIND.secondary}>
          {({ isHovered, isPressed, isFocused }) => {
            if (isPressed) return '⬇ Pressed';
            if (isHovered) return '🎯 Hovered';
            if (isFocused) return '🔍 Focused';
            return '💤 Default';
          }}
        </Button>
      </div>

      {/* Test 2: Icon-only buttons with state changes */}
      <HeadingXSmall marginTop="0" marginBottom="8px">
        Icon-Only Buttons with State-Based Icons
      </HeadingXSmall>
      <div className={css({ margin: '16px 0', display: 'flex', gap: '16px', flexWrap: 'wrap' })}>
        {/* Heart icon that responds to all states */}
        <Button shape={SHAPE.square} kind={KIND.secondary}>
          {({ isHovered, isPressed, isFocused, artworkSize }) => {
            if (isPressed) return <ArrowLeft size={artworkSize} style={{ color: 'red' }} />;
            if (isHovered || isFocused)
              return <ArrowLeft size={artworkSize} style={{ color: 'pink' }} />;
            return <ArrowRight size={artworkSize} />;
          }}
        </Button>
      </div>

      {/* Test 3: Regular React node children (for comparison) */}
      <HeadingXSmall marginTop="0" marginBottom="8px">
        Regular React Node Children (Non-functional)
      </HeadingXSmall>
      <div className={css({ margin: '16px 0', display: 'flex', gap: '16px', flexWrap: 'wrap' })}>
        <Button>
          <span>Static Text</span>
        </Button>
      </div>

      {/* Test 5: Complex functional children with conditional rendering */}
      <HeadingXSmall marginTop="0" marginBottom="8px">
        Complex Functional Children
      </HeadingXSmall>
      <div className={css({ margin: '16px 0', display: 'flex', gap: '16px', flexWrap: 'wrap' })}>
        <Button>
          {({ isHovered, isPressed, isFocused }) => {
            const showIcon = isHovered || isPressed || isFocused;
            const text = isPressed ? 'Processing...' : isHovered ? 'Submit Form' : 'Submit';

            return (
              <div style={{ display: 'flex', alignItems: 'center', gap: showIcon ? '8px' : '0' }}>
                {showIcon && <ArrowLeft />}
                <span>{text}</span>
              </div>
            );
          }}
        </Button>
      </div>
    </React.Fragment>
  );
}
