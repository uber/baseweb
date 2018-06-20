/* @flow */

import React from 'react';
/* eslint react/require-default-props: ["off"]*/

type Props = {
  onClick: () => void,
  children?: any,
};

const Button = ({onClick, children = undefined}: Props) => (
  <button onClick={onClick}>{children}</button>
);

Button.displayName = 'Button';

export default Button;
