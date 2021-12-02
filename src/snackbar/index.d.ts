import * as React from 'react';

import {Override} from '../overrides';

declare const DURATION: {
  infinite: number;
  short: number;
  medium: number;
  long: number;
};

declare const PLACEMENT: {
  topLeft: 'topLeft';
  top: 'top';
  topRight: 'topRight';
  bottomRight: 'bottomRight';
  bottom: 'bottom';
  bottomLeft: 'bottomLeft';
};
export {DURATION, PLACEMENT};

export type DurationT = (typeof DURATION)[keyof typeof DURATION];

export type PlacementT = (typeof PLACEMENT)[keyof typeof PLACEMENT];

export type SnackbarElementOverridesT = {
  Root?: Override<any>;
  Content?: Override<any>;
  StartEnhancerContainer?: Override<any>;
  Spinner?: Override<any>;
  Message?: Override<any>;
  WrapActionButtonContainer?: Override<any>;
  ActionButtonContainer?: Override<any>;
};

export type SnackbarElementPropsT = {
  actionMessage?: string;
  actionOnClick?: (event: React.MouseEvent<HTMLButtonElement>) => any;
  focus?: boolean;
  message: React.ReactNode;
  overrides?: SnackbarElementOverridesT;
  progress?: boolean;
  startEnhancer?: React.FC<{size: number}>;
};

export type SnackbarProviderPropsT = {
  children?: React.ReactNode;
  overrides?: SnackbarElementOverridesT & {
    PlacementContainer?: Override<any>;
  };
  placement?: PlacementT;
  defaultDuration?: DurationT;
};

export const SnackbarElement: React.FC<SnackbarElementPropsT>;
export const SnackbarProvider: React.FC<SnackbarProviderPropsT>;
export const useSnackbar: () => {
  enqueue: (elementProps: SnackbarElementPropsT, duration?: DurationT) => any;
  dequeue: () => any;
};
