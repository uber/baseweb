/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { useStyletron } from '../../styles/index';
import { Combobox } from '../index';

type OptionT = {
  label: string;
  id: string;
};

const options: OptionT[] = [
  { label: 'AliceBlue', id: '#F0F8FF' },
  { label: 'AntiqueWhite', id: '#FAEBD7' },
  { label: 'Aqua', id: '#00FFFF' },
  { label: 'Aquamarine', id: '#7FFFD4' },
  { label: 'Azure', id: '#F0FFFF' },
  { label: 'Beige', id: '#F5F5DC' },
];

// flowlint-next-line unclear-type:off
function Instance({ size }: any) {
  const [css, theme] = useStyletron();
  const [value, setValue] = React.useState('');
  return (
    <div>
      <p className={css({ color: theme.colors.contentPrimary })}>
        {size ? size : 'unspecified (default)'}
      </p>
      <div className={css({ width: '375px' })}>
        <Combobox
          value={value}
          onChange={(nextValue) => setValue(nextValue)}
          mapOptionToString={(o) => o.label}
          options={options}
          size={size}
        />
      </div>
    </div>
  );
}

export function Scenario() {
  const [css] = useStyletron();
  return (
    <div className={css({ padding: '12px 48px' })}>
      <Instance />
      <Instance size={'mini'} />
      <Instance size={'compact'} />
      <Instance size={'default'} />
      <Instance size={'large'} />
    </div>
  );
}
