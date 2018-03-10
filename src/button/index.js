/* @flow */

import React from 'react';

type Props = {
  onClick: () => {},
};

export default ({onClick}: Props) => (
  <button onClick={onClick}>it is a button!</button>
);
