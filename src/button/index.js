/* @flow */

import * as React from 'react';
/* eslint react/require-default-props: ["off"]*/

type Props = {
  onClick: () => void,
  children?: React.Node,
};

const Button = ({onClick, children}: Props) => (
  <button onClick={onClick}>{children || 'it is a button!'}</button>
);

Button.displayName = 'Button';

export default Button;
