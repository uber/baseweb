import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {
  BaseInputProps,
  StatefulContainer,
  STATE_CHANGE_TYPE,
  SIZE as INPUT_SIZE,
  StatefulContainerProps,
} from '../input';

export interface TextareaProps extends BaseInputProps<HTMLTextAreaElement> {
  rows?: number;
}

export interface ADJOINED {
  none: 'none';
  left: 'left';
  right: 'right';
  both: 'both';
}
export interface SIZE {
  default: 'default';
  compact: 'compact';
  large: 'large';
}

export class Textarea extends React.Component<TextareaProps> {}

export type StatefulTextareaProps = TextareaProps &
  StatefulContainerProps & {children?: never};

export const StatefulTextarea: React.FC<StatefulTextareaProps>;

export {StatefulContainer};

export const StyledTextareaContainer: StyletronComponent<any>;
export const StyledTextarea: StyletronComponent<any>;

export const ADJOINED: ADJOINED;
export const SIZE: SIZE;
export {STATE_CHANGE_TYPE};
