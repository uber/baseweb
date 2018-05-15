/* @flow */

import React from 'react';

type Props = {
  onClick: () => void,
};

export default ({onClick}: Props) => (
  <button onClick={onClick}>it is a button!</button>
);
