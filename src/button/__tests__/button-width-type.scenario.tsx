/*
Copyright (c) Uber Technologies, Inc.


This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useStyletron } from '../..';
import { Button, SIZE, WIDTH_TYPE } from '..';
import ArrowUp from '../../icon/arrow-up';
import ArrowDown from '../../icon/arrow-down';
import ArrowRight from '../../icon/arrow-right';
import ArrowLeft from '../../icon/arrow-left';
import { HeadingMedium, HeadingXSmall } from '../../typography';

export function Scenario() {
  const [css] = useStyletron();

  return (
    <React.Fragment>
      <HeadingMedium marginTop="0" marginBottom="0">
        Render Buttons with different widthType props
      </HeadingMedium>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        width type: hug(default)
      </HeadingXSmall>
      {[SIZE.xSmall, SIZE.small, SIZE.medium, SIZE.large].map((size) => {
        return (
          <div key={size} className={css({ margin: '16px 0' })}>
            <Button
              endEnhancer={({ isHovered, isPressed, isFocused, artworkSize }) => {
                if (isHovered || isPressed || isFocused) {
                  return <ArrowRight size={artworkSize} />;
                }
                return <ArrowUp size={artworkSize} />;
              }}
              startEnhancer={({ isHovered, isPressed, isFocused, artworkSize }) => {
                if (isHovered || isPressed || isFocused) {
                  return <ArrowLeft size={artworkSize} />;
                }
                return <ArrowDown size={artworkSize} />;
              }}
              size={size}
              key={size}
            >
              Notification
            </Button>
          </div>
        );
      })}

      <HeadingXSmall marginTop="0" marginBottom="8px">
        width type: fill (parent container width: 300px)
      </HeadingXSmall>
      {[SIZE.xSmall, SIZE.small, SIZE.medium, SIZE.large].map((size) => {
        return (
          <div key={size} className={css({ margin: '16px 0', width: '300px' })}>
            <Button
              widthType={WIDTH_TYPE.fill}
              endEnhancer={({ isHovered, isPressed, isFocused, artworkSize }) => {
                if (isHovered || isPressed || isFocused) {
                  return <ArrowRight size={artworkSize} />;
                }
                return <ArrowUp size={artworkSize} />;
              }}
              startEnhancer={({ isHovered, isPressed, isFocused, artworkSize }) => {
                if (isHovered || isPressed || isFocused) {
                  return <ArrowLeft size={artworkSize} />;
                }
                return <ArrowDown size={artworkSize} />;
              }}
              size={size}
              key={size}
            >
              Notification
            </Button>
          </div>
        );
      })}

      <HeadingXSmall marginTop="0" marginBottom="8px">
        width type: fill (width not provided on parent container)
      </HeadingXSmall>
      {[SIZE.xSmall, SIZE.small, SIZE.medium, SIZE.large].map((size) => {
        return (
          <div key={size} className={css({ margin: '16px 0' })}>
            <Button
              widthType={WIDTH_TYPE.fill}
              endEnhancer={({ isHovered, isPressed, isFocused, artworkSize }) => {
                if (isHovered || isPressed || isFocused) {
                  return <ArrowRight size={artworkSize} />;
                }
                return <ArrowUp size={artworkSize} />;
              }}
              startEnhancer={({ isHovered, isPressed, isFocused, artworkSize }) => {
                if (isHovered || isPressed || isFocused) {
                  return <ArrowLeft size={artworkSize} />;
                }
                return <ArrowDown size={artworkSize} />;
              }}
              size={size}
              key={size}
            >
              Notification
            </Button>
          </div>
        );
      })}

      <HeadingXSmall marginTop="0" marginBottom="8px">
        width type: fill (parent container width: 20px, button width falls back to forced min-width)
      </HeadingXSmall>
      {[SIZE.xSmall, SIZE.small, SIZE.medium, SIZE.large].map((size) => {
        return (
          <div key={size} className={css({ margin: '16px 0', width: '20px' })}>
            <Button widthType={WIDTH_TYPE.fill} size={size} key={size}>
              1
            </Button>
          </div>
        );
      })}

      <HeadingXSmall marginTop="0" marginBottom="8px">
        width type: fill (width not provided on parent container, but width(160px) is set with
        overrides)
      </HeadingXSmall>
      {[SIZE.xSmall, SIZE.small, SIZE.medium, SIZE.large].map((size) => {
        return (
          <div key={size} className={css({ margin: '16px 0' })}>
            <Button
              widthType={WIDTH_TYPE.fill}
              overrides={{
                BaseButton: {
                  style: {
                    width: '160px',
                  },
                },
              }}
              endEnhancer={({ isHovered, isPressed, isFocused, artworkSize }) => {
                if (isHovered || isPressed || isFocused) {
                  return <ArrowRight size={artworkSize} />;
                }
                return <ArrowUp size={artworkSize} />;
              }}
              startEnhancer={({ isHovered, isPressed, isFocused, artworkSize }) => {
                if (isHovered || isPressed || isFocused) {
                  return <ArrowLeft size={artworkSize} />;
                }
                return <ArrowDown size={artworkSize} />;
              }}
              size={size}
              key={size}
            >
              Notification
            </Button>
          </div>
        );
      })}
    </React.Fragment>
  );
}
