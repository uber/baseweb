/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';

import { useStyletron } from '../../styles';
import { Combobox } from '..';

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
  { label: 'IndianRed', id: 'CD5C5C' },
  { label: 'LightCoral', id: 'F08080' },
  { label: 'Salmon', id: 'FA8072' },
  { label: 'DarkSalmon', id: 'E9967A' },
  { label: 'LightSalmon', id: 'FFA07A' },
  { label: 'Crimson', id: 'DC143C' },
  { label: 'Red', id: 'FF0000' },
  { label: 'FireBrick', id: 'B22222' },
  { label: 'DarkRed', id: '8B0000' },
  { label: 'Pink', id: 'FFC0CB' },
  { label: 'LightPink', id: 'FFB6C1' },
  { label: 'HotPink', id: 'FF69B4' },
  { label: 'DeepPink', id: 'FF1493' },
  { label: 'MediumVioletRed', id: 'C71585' },
  { label: 'PaleVioletRed', id: 'DB7093' },
  { label: 'Coral', id: 'FF7F50' },
  { label: 'Tomato', id: 'FF6347' },
  { label: 'OrangeRed', id: 'FF4500' },
  { label: 'DarkOrange', id: 'FF8C00' },
  { label: 'Orange', id: 'FFA500' },
  { label: 'Gold', id: 'FFD700' },
  { label: 'Yellow', id: 'FFFF00' },
  { label: 'LightYellow', id: 'FFFFE0' },
  { label: 'LemonChiffon', id: 'FFFACD' },
  { label: 'LightGoldenrodYellow', id: 'FAFAD2' },
  { label: 'PapayaWhip', id: 'FFEFD5' },
  { label: 'Moccasin', id: 'FFE4B5' },
  { label: 'PeachPuff', id: 'FFDAB9' },
  { label: 'PaleGoldenrod', id: 'EEE8AA' },
  { label: 'Khaki', id: 'F0E68C' },
  { label: 'DarkKhaki', id: 'BDB76B' },
  { label: 'Lavender', id: 'E6E6FA' },
  { label: 'Thistle', id: 'D8BFD8' },
  { label: 'Plum', id: 'DDA0DD' },
  { label: 'Violet', id: 'EE82EE' },
  { label: 'Orchid', id: 'DA70D6' },
  { label: 'Fuchsia', id: 'FF00FF' },
  { label: 'Magenta', id: 'FF00FF' },
  { label: 'MediumOrchid', id: 'BA55D3' },
  { label: 'MediumPurple', id: '9370DB' },
  { label: 'Amethyst', id: '9966CC' },
  { label: 'BlueViolet', id: '8A2BE2' },
  { label: 'DarkViolet', id: '9400D3' },
  { label: 'DarkOrchid', id: '9932CC' },
  { label: 'DarkMagenta', id: '8B008B' },
  { label: 'Purple', id: '800080' },
  { label: 'Indigo', id: '4B0082' },
  { label: 'SlateBlue', id: '6A5ACD' },
  { label: 'DarkSlateBlue', id: '483D8B' },
  { label: 'MediumSlateBlue', id: '7B68EE' },
];

// TODO(chase): Need to configure this example to better mirror a server fetch.
export function Scenario() {
  const [css] = useStyletron();
  const [value, setValue] = React.useState('');

  function mapOptionToString(option: OptionT): string {
    return option.label;
  }

  const filteredOptions = React.useMemo(() => {
    return options.filter((option) => {
      const optionAsString = mapOptionToString(option);
      return optionAsString.toLowerCase().includes(value.toLowerCase());
    });
  }, [options, value]);

  return (
    <div className={css({ width: '375px', padding: '12px 48px' })}>
      <Combobox
        value={value}
        onChange={(nextValue) => setValue(nextValue)}
        mapOptionToString={mapOptionToString}
        options={filteredOptions}
      />
    </div>
  );
}
