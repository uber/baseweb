import * as React from 'react';
import { Override } from '../overrides';

export interface SIZE {
  compact: 'compact';
  default: 'default';
  large: 'large';
  mini: 'mini';
}

export interface ComboboxOverrides {
  Root?: Override<any>;
  InputContainer?: Override<any>;
  Input?: Override<any>;
  Popover?: Override<any>;
  ListBox?: Override<any>;
  ListItem?: Override<any>;
}

export type PropsT<OptionT = any> = {
  autocomplete?: boolean;
  disabled?: boolean;
  mapOptionToNode?: (option: { isSelected: boolean; option: OptionT }) => React.ReactNode;
  mapOptionToString: (option: OptionT) => string;
  id?: string;
  name?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => any;
  onChange?: (value: string, option: OptionT | null) => any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => any;
  onSubmit?: (params: { closeListbox: () => void; value: string }) => any;
  options: OptionT[];
  overrides?: ComboboxOverrides;
  size?: SIZE[keyof SIZE];
  value: string;
};

export const Combobox: React.FC<PropsT>;
export const SIZE: SIZE;
