/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled} from '../styles';
import Button from './button';
import {SIZE, KIND, SHAPE} from './constants';

function CloudComponent() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      style={{width: 24, height: 24}}
    >
      <rect width={24} height={24} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 5C12.8755 5 11.4519 5.86084 10.6609 7.15112C10.2905 7.05249 9.90137 7 9.5 7C7.14185 7 5.20752 8.81372 5.01562 11.1221C3.28247 11.5605 2 13.1304 2 15C2 17.2092 3.79077 19 6 19H11V14.4143L9.70703 15.707C9.31665 16.0977 8.68335 16.0977 8.29297 15.707C7.90234 15.3167 7.90234 14.6833 8.29297 14.293L11.293 11.293C11.6833 10.9023 12.3167 10.9023 12.707 11.293L15.707 14.293C16.0977 14.6833 16.0977 15.3167 15.707 15.707C15.3167 16.0977 14.6833 16.0977 14.293 15.707L13 14.4143V19H17C19.7615 19 22 16.7615 22 14C22 11.9492 20.7656 10.187 18.9993 9.41577C18.9543 6.96924 16.9573 5 14.5 5Z"
        fill="white"
      />
    </svg>
  );
}

const ButtonContainer = styled('div', {
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'flex-start',
  flexDirection: 'column',
});

const ButtonRow = styled('div', {
  display: 'flex',
  ':not(:first-child)': {
    marginTop: '20px',
  },
});

export const suite = 'Button Test Suite';
export const examples = {
  BUTTON: 'Buttons',
  BUTTON_COMPACT: 'Buttons Compact',
  BUTTON_WITH_ENHANCERS: 'Buttons with Enhancers',
  BUTTON_COMPACT_WITH_ENHANCERS: 'Buttons Compact with Enhancers',
};

export default {
  [examples.BUTTON]: function Story1() {
    return (
      <ButtonContainer>
        <ButtonRow>
          <Button>Primary</Button>
        </ButtonRow>
        <ButtonRow>
          <Button kind={KIND.secondary}>Secondary</Button>
        </ButtonRow>
        <ButtonRow>
          <Button kind={KIND.tertiary}>Tertiary</Button>
        </ButtonRow>
        <ButtonRow>
          <Button kind={KIND.minimal}>Minimal</Button>
        </ButtonRow>
        <ButtonRow>
          <Button disabled={true}>Disabled</Button>
        </ButtonRow>
        <ButtonRow>
          <Button shape={SHAPE.square}>
            <CloudComponent />
          </Button>
        </ButtonRow>
        <ButtonRow>
          <Button shape={SHAPE.round}>
            <CloudComponent />
          </Button>
        </ButtonRow>
      </ButtonContainer>
    );
  },
  [examples.BUTTON_COMPACT]: function Story2() {
    return (
      <ButtonContainer>
        <ButtonRow>
          <Button size={SIZE.compact}>Primary</Button>
        </ButtonRow>
        <ButtonRow>
          <Button size={SIZE.compact} kind={KIND.secondary}>
            Secondary
          </Button>
        </ButtonRow>
        <ButtonRow>
          <Button size={SIZE.compact} kind={KIND.tertiary}>
            Tertiary
          </Button>
        </ButtonRow>
        <ButtonRow>
          <Button size={SIZE.compact} kind={KIND.minimal}>
            Minimal
          </Button>
        </ButtonRow>
        <ButtonRow>
          <Button size={SIZE.compact} disabled={true}>
            Disabled
          </Button>
        </ButtonRow>
        <ButtonRow>
          <Button size={SIZE.compact} shape={SHAPE.square}>
            <CloudComponent />
          </Button>
        </ButtonRow>
        <ButtonRow>
          <Button size={SIZE.compact} shape={SHAPE.round}>
            <CloudComponent />
          </Button>
        </ButtonRow>
      </ButtonContainer>
    );
  },
  [examples.BUTTON_WITH_ENHANCERS]: function Story3() {
    return (
      <ButtonContainer>
        <ButtonRow>
          <Button>Primary</Button>
        </ButtonRow>
        <ButtonRow>
          <Button startEnhancer={CloudComponent}>Start Enhancer</Button>
        </ButtonRow>
        <ButtonRow>
          <Button endEnhancer={CloudComponent}>End Enhancer</Button>
        </ButtonRow>
        <ButtonRow>
          <Button startEnhancer={CloudComponent} endEnhancer={CloudComponent}>
            Both Enhancers
          </Button>
        </ButtonRow>
      </ButtonContainer>
    );
  },
  [examples.BUTTON_COMPACT_WITH_ENHANCERS]: function Story4() {
    return (
      <ButtonContainer>
        <ButtonRow>
          <Button size={SIZE.compact}>Primary</Button>
        </ButtonRow>
        <ButtonRow>
          <Button size={SIZE.compact} startEnhancer={CloudComponent}>
            Start Enhancer
          </Button>
        </ButtonRow>
        <ButtonRow>
          <Button size={SIZE.compact} endEnhancer={CloudComponent}>
            End Enhancer
          </Button>
        </ButtonRow>
        <ButtonRow>
          <Button
            size={SIZE.compact}
            startEnhancer={CloudComponent}
            endEnhancer={CloudComponent}
          >
            Both Enhancers
          </Button>
        </ButtonRow>
      </ButtonContainer>
    );
  },
};
