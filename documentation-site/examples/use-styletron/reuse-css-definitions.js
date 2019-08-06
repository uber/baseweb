// @flow
import React from 'react';
import {useStyletron} from 'baseui';

function ReuseDefinitions() {
  const [useCss, theme] = useStyletron();
  const red = useCss({backgroundColor: theme.colors.negative});
  const green = useCss({backgroundColor: theme.colors.positive});

  return (
    <ul className={useCss({color: 'white'})}>
      <li className={red}>1</li>
      <li className={green}>2</li>
      <li className={red}>3</li>
      <li className={green}>4</li>
      <li className={red}>5</li>
      <li className={green}>6</li>
      <li className={red}>7</li>
      <li className={green}>8</li>
      <li className={red}>9</li>
      <li className={green}>10</li>
    </ul>
  );
}

export default ReuseDefinitions;
