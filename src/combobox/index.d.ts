import * as React from 'react';
import {Override} from '../overrides';

export interface SIZE {
  compact: 'compact';
  default: 'default';
  large: 'large';
  mini: 'mini';
}

export type PropsT<OptionT = unknown> = {
  disabled?: boolean;
  mapOptionToNode?: ({isSelected: boolean, option: OptionT}) => React.ReactNode;
  mapOptionToString: (OptionT) => string;
  onChange?: (string) => any;
  options: OptionT;
  overrides?: {
    Root?: Override<any>;
    InputContainer?: Override<any>;
    Input?: Override<any>;
    Popover?: Override<any>;
    ListBox?: Override<any>;
    ListItem?: Override<any>;
  };
  size?: SIZE[keyof SIZE];
  value: string;
};

export const Combobox: React.FC<PropsT>;
export const SIZE: SIZE;
