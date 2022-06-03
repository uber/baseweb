import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import {
  BaseInputProps,
  StatefulContainer,
  STATE_CHANGE_TYPE,
  SIZE as INPUT_SIZE,
  StatefulContainerProps,
} from '../input';

export interface TextareaProps extends BaseInputProps<HTMLTextAreaElement> {
  rows?: number;
  maxLength?: number;
}

export declare const ADJOINED: {
  none: 'none';
  left: 'left';
  right: 'right';
  both: 'both';
};
export declare const SIZE: {
  default: 'default';
  compact: 'compact';
  large: 'large';
};

export class Textarea extends React.Component<TextareaProps> {}

export type StatefulTextareaProps = TextareaProps & StatefulContainerProps & { children?: never };

export declare const StatefulTextarea: React.FC<StatefulTextareaProps>;

export { StatefulContainer };

export declare const StyledTextareaContainer: StyletronComponent<any>;
export declare const StyledTextarea: StyletronComponent<any>;

export { STATE_CHANGE_TYPE };
