import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export interface ProgressStepsOverrides {
  Root?: Override<any>;
}
export interface ProgressStepsProps {
  overrides?: ProgressStepsOverrides;
  children?: React.ReactNode;
  current?: number;
}
export declare const ProgressSteps: React.FC<ProgressStepsProps>;

export interface StepOverrides {
  Root?: Override<any>;
  IconContainer?: Override<any>;
  Icon?: Override<any>;
  InnerIcon?: Override<any>;
  Tail?: Override<any>;
  Content?: Override<any>;
  Title?: Override<any>;
  Description?: Override<any>;
}
export interface StepProps {
  title?: React.ReactNode;
  isCompleted?: boolean;
  isActive?: boolean;
  isLast?: boolean;
  overrides?: StepOverrides;
  children?: React.ReactNode;
}
export declare const Step: React.FC<StepProps>;

export interface NumberedStepOverrides {
  Root?: Override<any>;
  IconContainer?: Override<any>;
  Icon?: Override<any>;
  InnerIcon?: Override<any>;
  Tail?: Override<any>;
  Content?: Override<any>;
  Title?: Override<any>;
  Description?: Override<any>;
}
export interface NumberedStepProps {
  title?: string;
  isCompleted?: boolean;
  isActive?: boolean;
  isLast?: boolean;
  overrides?: NumberedStepOverrides;
  children?: React.ReactNode;
  step?: React.ReactNode;
}
export declare const NumberedStep: React.FC<NumberedStepProps>;

export interface StyleProps {
  $isActive?: boolean;
  $isCompleted?: boolean;
  $disabled?: boolean;
}
export declare const StyledProgressSteps: StyletronComponent<any, StyleProps>;
export declare const StyledStep: StyletronComponent<any, StyleProps>;
export declare const StyledIcon: StyletronComponent<any, StyleProps>;
export declare const StyledInnerIcon: StyletronComponent<any, StyleProps>;
export declare const StyledContent: StyletronComponent<any, StyleProps>;
export declare const StyledContentTitle: StyletronComponent<any, StyleProps>;
export declare const StyledContentTail: StyletronComponent<any, StyleProps>;
export declare const StyledContentDescription: StyletronComponent<any, StyleProps>;
export declare const StyledNumberStep: StyletronComponent<any, StyleProps>;
export declare const StyledNumberIcon: StyletronComponent<any, StyleProps>;
export declare const StyledNumberContentTail: StyletronComponent<any, StyleProps>;
