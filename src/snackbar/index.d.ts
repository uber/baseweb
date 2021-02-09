import * as React from 'react';

import {Override} from './overrides';
import {DURATION, PLACEMENT} from './constants.js';
export {DURATION, PLACEMENT} from './constants.js';

export type DurationT =
  | typeof DURATION.infinite
  | typeof DURATION.short
  | typeof DURATION.medium
  | typeof DURATION.long;

export type PlacementT =
  | typeof PLACEMENT.topLeft
  | typeof PLACEMENT.top
  | typeof PLACEMENT.topRight
  | typeof PLACEMENT.bottomLeft
  | typeof PLACEMENT.bottom
  | typeof PLACEMENT.bottomRight;

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
  message: string;
  overrides?: SnackbarElementOverridesT;
  progress?: boolean;
  startEnhancer?: React.FC<{size: number}>;
};

export type SnackbarProviderPropsT = {
  children?: React.Node;
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
