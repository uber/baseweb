/*
Copyright (c) Uber Technologies, Inc.


This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { useStyletron } from '../..';
import { Button, SIZE } from '..';
import ArrowRight from '../../icon/arrow-right';
import ArrowLeft from '../../icon/arrow-left';
import { HeadingMedium, HeadingXSmall } from '../..//typography';

export function Scenario() {
  const [css] = useStyletron();

  return (
    <React.Fragment>
      <HeadingMedium marginTop="0" marginBottom="0">
        Render Enhancers with different enhancer props
      </HeadingMedium>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        Enhancer is function returning a React element
      </HeadingXSmall>
      {[SIZE.xSmall, SIZE.small, SIZE.medium, SIZE.large].map((size) => {
        return (
          <div key={size} className={css({ margin: '16px 0' })}>
            <Button
              endEnhancer={({ isHovered, isPressed, isFocused, artworkSize }) => {
                if (isHovered || isPressed || isFocused) {
                  return <ArrowLeft size={artworkSize} />;
                }
                return <ArrowRight size={artworkSize} />;
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
        Enhancer is a valid React element type
      </HeadingXSmall>
      <div className={css({ margin: '16px 0' })}>
        {[SIZE.mini, SIZE.compact, SIZE.default, SIZE.large].map((size) => {
          return (
            <div key={size} className={css({ display: 'flex', margin: '16px 0', gap: '16px' })}>
              <Button size={size}>Primary</Button>
              <Button size={size} startEnhancer={ArrowRight}>
                Start Enhancer
              </Button>
              <Button size={size} endEnhancer={ArrowRight}>
                End Enhancer
              </Button>
              <Button size={size} startEnhancer={ArrowRight} endEnhancer={ArrowRight}>
                Both Enhancers
              </Button>
            </div>
          );
        })}
      </div>
      <div className={css({ margin: '16px 0' })}>
        {[SIZE.mini, SIZE.compact, SIZE.default, SIZE.large].map((size) => {
          return (
            <div key={size} className={css({ display: 'flex', margin: '16px 0', gap: '16px' })}>
              <Button size={size}>Primary</Button>
              <Button size={size} startEnhancer={ArrowLeft}>
                Start Enhancer
              </Button>
              <Button size={size} endEnhancer={ArrowRight}>
                End Enhancer
              </Button>
              <Button size={size} startEnhancer={ArrowLeft} endEnhancer={ArrowRight}>
                Both Enhancers
              </Button>
            </div>
          );
        })}
      </div>
      <HeadingXSmall marginTop="0" marginBottom="8px">
        Examples with new sizing names - xSmall, small, medium, large
      </HeadingXSmall>
      <div className={css({ margin: '16px 0' })}>
        {[SIZE.xSmall, SIZE.small, SIZE.medium, SIZE.large].map((size) => {
          return (
            <div key={size} className={css({ display: 'flex', margin: '16px 0', gap: '16px' })}>
              <Button size={size}>Primary</Button>
              <Button size={size} startEnhancer={ArrowLeft}>
                Start Enhancer
              </Button>
              <Button size={size} endEnhancer={ArrowRight}>
                End Enhancer
              </Button>
              <Button size={size} startEnhancer={ArrowLeft} endEnhancer={ArrowRight}>
                Both Enhancers
              </Button>
            </div>
          );
        })}
      </div>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        Enhancer is a React element
      </HeadingXSmall>
      <div className={css({ margin: '16px 0' })}>
        {[SIZE.mini, SIZE.compact, SIZE.default, SIZE.large].map((size) => {
          return (
            <div key={size} className={css({ display: 'flex', margin: '16px 0', gap: '16px' })}>
              <Button size={size}>Primary</Button>
              <Button size={size} startEnhancer={<ArrowLeft />}>
                Start Enhancer
              </Button>
              <Button size={size} endEnhancer={<ArrowRight />}>
                End Enhancer
              </Button>
              <Button size={size} startEnhancer={<ArrowLeft />} endEnhancer={<ArrowRight />}>
                Both Enhancers
              </Button>
            </div>
          );
        })}
      </div>
      <div className={css({ margin: '16px 0' })}>
        {[SIZE.mini, SIZE.compact, SIZE.default, SIZE.large].map((size) => {
          return (
            <div key={size} className={css({ display: 'flex', margin: '16px 0', gap: '16px' })}>
              <Button size={size}>Primary</Button>
              <Button size={size} startEnhancer={<ArrowLeft />}>
                Start Enhancer
              </Button>
              <Button size={size} endEnhancer={<ArrowRight />}>
                End Enhancer
              </Button>
              <Button
                size={size}
                startEnhancer={<ArrowLeft />}
                endEnhancer={<ArrowRight />}
              >
                Both Enhancers
              </Button>
            </div>
          );
        })}
      </div>
      <HeadingXSmall marginTop="0" marginBottom="8px">
        Examples with new sizing names - xSmall, small, medium, large
      </HeadingXSmall>
      <div className={css({ margin: '16px 0' })}>
        {[SIZE.xSmall, SIZE.small, SIZE.medium, SIZE.large].map((size) => {
          return (
            <div key={size} className={css({ display: 'flex', margin: '16px 0', gap: '16px' })}>
              <Button size={size}>Primary</Button>
              <Button size={size} startEnhancer={<ArrowLeft />}>
                Start Enhancer
              </Button>
              <Button size={size} endEnhancer={<ArrowRight />}>
                End Enhancer
              </Button>
              <Button
                size={size}
                startEnhancer={<ArrowLeft />}
                endEnhancer={<ArrowRight />}
              >
                Both Enhancers
              </Button>
            </div>
          );
        })}
      </div>

      <HeadingXSmall marginTop="0" marginBottom="8px">
        Enhancer is a string or number
      </HeadingXSmall>
      <div className={css({ margin: '16px 0' })}>
        {[SIZE.xSmall, SIZE.small, SIZE.medium, SIZE.large].map((size) => {
          return (
            <div key={size} className={css({ display: 'flex', margin: '16px 0', gap: '16px' })}>
              <Button size={size}>Primary</Button>
              <Button size={size} startEnhancer={'<HeartFilled />'}>
                Start Enhancer
              </Button>
              <Button size={size} endEnhancer={123}>
                End Enhancer
              </Button>
              <Button size={size} startEnhancer={'<HeartFilled />'} endEnhancer={123}>
                Both Enhancers
              </Button>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}
