import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';
import { arrayMove as arrayMoveT, arrayRemove as arrayRemoveT } from 'react-movable';

// export {arrayMove, arrayRemove} from 'react-movable';

export declare const STATE_CHANGE_TYPE: {
  change: 'change';
};

export type StateReducer = (
  stateChangeType: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
  nextState: State,
  currentState: State
) => State;

export interface StatefulListProps {
  initialState?: State;
  stateReducer?: StateReducer;
  removable?: boolean;
  removableByMove?: boolean;
  onChange?: (params: { newState: React.ReactNode[]; oldIndex: number; newIndex: number }) => any;
  overrides?: ListOverrides;
}

export declare const StatefulList: React.FC<StatefulListProps>;

export interface State {
  items: React.ReactNode[];
}
export type StatefulComponentContainerProps = StatefulListProps & {
  initialState?: State;
  children: React.ReactNode;
};

export class StatefulListContainer extends React.Component<StatefulComponentContainerProps, State> {
  onChange({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }): void;
  internalSetState(
    type: typeof STATE_CHANGE_TYPE[keyof typeof STATE_CHANGE_TYPE],
    changes: State
  ): void;
}

export interface SharedStylePropsArgT {
  $isDragged: boolean;
  $isSelected: boolean;
  $isRemovable: boolean;
  $isRemovableByMove: boolean;
  $value: React.ReactNode;
}

export interface ListOverrides {
  Root?: Override<SharedStylePropsArgT>;
  List?: Override<SharedStylePropsArgT>;
  Item?: Override<SharedStylePropsArgT>;
  DragHandle?: Override<SharedStylePropsArgT>;
  CloseHandle?: Override<SharedStylePropsArgT>;
  Label?: Override<SharedStylePropsArgT>;
}

export interface ListProps {
  removable?: boolean;
  removableByMove?: boolean;
  items?: React.ReactNode[];
  onChange?: (args: { oldIndex: number; newIndex: number }) => any;
  overrides?: ListOverrides;
}

export class List extends React.Component<ListProps> {}

export declare const StyledRoot: StyletronComponent<any, any>;
export declare const StyledList: StyletronComponent<any, any>;
export declare const StyledItem: StyletronComponent<any, any>;
export declare const StyledDragHandle: StyletronComponent<any, any>;
export declare const StyledCloseHandle: StyletronComponent<any, any>;
export declare const StyledLabel: StyletronComponent<any, any>;

export declare const arrayMove: typeof arrayMoveT;
export declare const arrayRemove: typeof arrayRemoveT;
