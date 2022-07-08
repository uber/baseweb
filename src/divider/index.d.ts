import { StyletronComponent } from 'styletron-react';

export declare const SIZE: {
  cell: 'cell';
  section: 'section';
  module: 'module';
};

export interface DividerProps {
  $size?: typeof SIZE[keyof typeof SIZE];
}

export declare const StyledDivider: StyletronComponent<any, DividerProps>;
