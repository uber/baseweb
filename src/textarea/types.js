// @flow
import * as React from 'react';
import type {BaseInputPropsT, StateReducerT, StateT} from '../input/types';
import {SIZE} from '../input/constants';
import type {OverrideT} from '../helpers/overrides';
import type {ThemeT} from '../styles/types';

type SyntheticTextareaEvent = SyntheticEvent<HTMLElement>;

export type SizeT = $Keys<typeof SIZE>;

export type SharedStylePropsT = {
  $theme: ThemeT,
};

export type TextareaComponentsT = {
  InputContainer?: OverrideT<SharedStylePropsT>,
  Input?: OverrideT<SharedStylePropsT>,
};

export type TextareaPropsT = {
  ...BaseInputPropsT,
  components?: TextareaComponentsT,
  rows?: number,
};

export type StatefulContainerPropsT = {
  children: (props: *) => React.Node,
  initialState?: StateT,
  stateReducer?: StateReducerT,
  onChange?: (e: SyntheticTextareaEvent) => void,
};

type OmitPropsT = {
  children: (props: *) => React.Node,
};

type FullStPropsT = TextareaPropsT & StatefulContainerPropsT;

export type StatefulTextareaPropsT = $Diff<FullStPropsT, OmitPropsT>;
