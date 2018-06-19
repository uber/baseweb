// @flow

import React from 'react';
import Icon from './icon';
import type {IconProps} from './types';

export default function IconRightArrow(props: IconProps) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.00001 0C5.5523 0 6.00001 0.447715 6.00001 1V8.58578L8.29289 6.29289C8.68342 5.90237 9.31658 5.90237 9.70711 6.29289C10.0976 6.68342 10.0976 7.31658 9.70711 7.70711L5.70712 11.7071C5.51958 11.8946 5.26523 12 5.00001 12C4.7348 12 4.48044 11.8946 4.29291 11.7071L0.292894 7.70711C-0.0976306 7.31658 -0.0976315 6.68342 0.292892 6.29289C0.683416 5.90237 1.31658 5.90237 1.70711 6.29289L4.00001 8.58579V1C4.00001 0.447715 4.44773 0 5.00001 0Z"
        transform="translate(6 7) scale(-1 1) rotate(90)"
      />
    </Icon>
  );
}
