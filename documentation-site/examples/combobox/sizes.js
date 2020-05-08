// @flow

import * as React from 'react';

import {useStyletron} from 'baseui';
import {Combobox, SIZE} from 'baseui/combobox';

type OptionT = {label: string, id: string};
const options: OptionT[] = [
  {label: 'AliceBlue', id: '#F0F8FF'},
  {label: 'AntiqueWhite', id: '#FAEBD7'},
  {label: 'Aqua', id: '#00FFFF'},
  {label: 'Aquamarine', id: '#7FFFD4'},
  {label: 'Azure', id: '#F0FFFF'},
  {label: 'Beige', id: '#F5F5DC'},
];

// eslint-disable-next-line flowtype/no-weak-types
function Instance({size}: any) {
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState('');
  return (
    <div>
      <p className={css({color: theme.colors.contentPrimary})}>
        {size ? size : 'unspecified (default)'}
      </p>
      <div className={css({width: '375px'})}>
        <Combobox
          value={value}
          onChange={setValue}
          mapOptionToString={o => o.label}
          options={options}
          size={size}
        />
      </div>
    </div>
  );
}

function Example() {
  const [css] = useStyletron();
  return (
    <div>
      <Instance />
      <Instance size={SIZE.mini} />
      <Instance size={SIZE.compact} />
      <Instance size={SIZE.default} />
      <Instance size={SIZE.large} />
    </div>
  );
}

export default Example;
