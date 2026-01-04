/*
Copyright (c) Uber Technologies, Inc.


This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useStyletron } from '../../';
import { Button, SHAPE } from '..';
import ArrowRight from '../../icon/arrow-right';
import ArrowLeft from '../../icon/arrow-left';
import { HeadingMedium, HeadingXSmall } from '../../typography';

export function Scenario() {
  const [css] = useStyletron();
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <React.Fragment>
      <HeadingMedium marginTop="0" marginBottom="0">
        Button A11y
      </HeadingMedium>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        Text only button
      </HeadingXSmall>
      <div className={css({ margin: '16px 0' })}>
        <Button>Edit</Button>
      </div>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        Icon only button
      </HeadingXSmall>
      <div className={css({ margin: '16px 0' })}>
        <Button aria-label="Next" shape={SHAPE.circle}>
          <ArrowRight />
        </Button>
      </div>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        Icon and text button
      </HeadingXSmall>
      <div className={css({ margin: '16px 0' })}>
        <Button
          endEnhancer={({ isHovered, isPressed, isFocused, artworkSize }) => {
            if (isHovered || isPressed || isFocused) {
              return <ArrowRight size={artworkSize} />;
            }
            return <ArrowLeft size={artworkSize} />;
          }}

          startEnhancer={({ isHovered, isPressed, isFocused, artworkSize }) => {
            if (isHovered || isPressed || isFocused) {
              return <ArrowLeft size={artworkSize} />;
            }
            return <ArrowRight size={artworkSize} />;
          }}
        >
          Notification
        </Button>
      </div>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        Toggle button
      </HeadingXSmall>
      <div className={css({ margin: '16px 0' })}>
        <Button isSelected={isSelected} onClick={() => setIsSelected(!isSelected)}>
          Mute
        </Button>
      </div>
    </React.Fragment>
  );
}
