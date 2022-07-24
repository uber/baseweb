import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const StyledLabel: StyletronComponent<any, any>;
export declare const StyledCaption: StyletronComponent<any, any>;
export declare const StyledControlContainer: StyletronComponent<any, any>;

export interface FormControlOverrides {
  Label?: Override<any>;
  Caption?: Override<any>;
  ControlContainer?: Override<any>;
}

export interface FormControlState {
  captionId: string;
}

export interface FormControlProps {
  children: React.ReactNode;
  disabled?: boolean;
  overrides?: FormControlOverrides;
  label?: React.ReactNode;
  caption?: React.ReactNode;
  error?: boolean | React.ReactNode;
  positive?: React.ReactNode;
  htmlFor?: string;
  counter?: boolean | { length?: number; maxLength?: number; error?: boolean };
}

export class FormControl extends React.Component<FormControlProps, FormControlState> {}
