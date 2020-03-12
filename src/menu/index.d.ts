import * as React from 'react';
import {StyletronComponent} from 'styletron-react';
import {Override} from '../overrides';

export interface KEY_STRINGS {
  ArrowUp: 'ArrowUp';
  ArrowDown: 'ArrowDown';
  ArrowLeft: 'ArrowLeft';
  ArrowRight: 'ArrowRight';
  Enter: 'Enter';
  Space: ' ';
  Escape: 'Escape';
  Backspace: 'Backspace';
}
export interface STATE_CHANGE_TYPES {
  click: 'click';
  moveUp: 'moveUp';
  moveDown: 'moveDown';
  mouseEnter: 'mouseEnter';
  focus: 'focus';
  reset: 'reset';
}

export interface OPTION_LIST_SIZE {
  default: 'default';
  compact: 'compact';
}

export type BaseMenuPropsT = {
  renderAll?: boolean;
};

export interface MenuProps extends BaseMenuPropsT {
  size?: keyof OPTION_LIST_SIZE;
  overrides?: {
    EmptyState?: Override<any>;
    List?: Override<any>;
    Option?: Override<any>;
  };
}

export type ItemT = any;
export type ArrayItemsT = ItemT[];
export type GroupedItemsT = {
  __ungrouped: ArrayItemsT;
  [key: string]: ArrayItemsT;
};
export type ItemsT = ArrayItemsT | GroupedItemsT;

export type StatefulMenuProps = StatefulContainerProps & MenuProps;
export class StatefulMenu extends React.PureComponent<StatefulMenuProps> {}

export interface RenderItemProps {
  disabled?: boolean;
  ref?: React.Ref<any>;
  id?: string;
  isFocused?: boolean;
  isHighlighted?: boolean;
  resetMenu?: () => any;
}

export type OnItemSelect = (args: {
  item: any;
  event?: React.SyntheticEvent<HTMLElement> | KeyboardEvent;
}) => any;

export type StateReducer = (
  changeType: STATE_CHANGE_TYPES[keyof STATE_CHANGE_TYPES],
  changes: StatefulContainerState,
  currentState: StatefulContainerState,
) => StatefulContainerState;

export type GetRequiredItemProps = (
  item: any,
  index: number,
) => RenderItemProps;

export type RenderProps = StatefulContainerState & {
  items: ItemsT;
  getRequiredItemProps: GetRequiredItemProps;
};

export interface StatefulContainerProps {
  items: ItemsT;
  initialState?: StatefulContainerState;
  stateReducer?: StateReducer;
  getRequiredItemProps?: GetRequiredItemProps;
  onActiveDescendantChange?: (id?: string) => void;
  onItemSelect?: OnItemSelect;
  rootRef?: React.Ref<any>;
  children?: (args: RenderProps) => React.ReactNode;
  addMenuToNesting?: (ref: React.Ref<HTMLElement>) => void;
  removeMenuFromNesting?: (ref: React.Ref<HTMLElement>) => void;
  getParentMenu?: (ref: React.Ref<HTMLElement>) => void;
  getChildMenu?: (ref: React.Ref<HTMLElement>) => void;
}
export interface StatefulContainerState {
  activedescendantId?: string;
  highlightedIndex: number;
  isFocused: boolean;
}
export class StatefulContainer extends React.Component<
  StatefulContainerProps,
  StatefulContainerState
> {}

export interface OptionListProps extends BaseMenuPropsT {
  item: any;
  getItemLabel: (item: any) => React.ReactNode;
  getChildMenu?: (item: any) => React.ReactNode;
  onMouseEnter?: (event: MouseEvent) => any;
  size?: OPTION_LIST_SIZE[keyof OPTION_LIST_SIZE];
  overrides?: {
    ListItem?: Override<any>;
  };
  resetMenu?: () => void;
  $isHighlighted?: boolean;
  $isFocused?: boolean;
}
export const OptionList: React.FC<OptionListProps>;

export interface OptionProfileProps extends BaseMenuPropsT {
  item: any;
  getChildMenu?: (item: any) => React.ReactNode;
  getProfileItemLabels: (
    item: any,
  ) => {title?: string; subtitle?: string; body?: string};
  getProfileItemImg: (item: any) => string | React.ComponentType<any>;
  getProfileItemImgText: (item: any) => string;
  overrides?: {
    ListItemProfile?: Override<any>;
    ProfileImgContainer?: Override<any>;
    ProfileImg?: Override<any>;
    ProfileLabelsContainer?: Override<any>;
    ProfileTitle?: Override<any>;
    ProfileSubtitle?: Override<any>;
    ProfileBody?: Override<any>;
  };
  resetMenu?: () => void;
  $isHighlighted?: boolean;
}
export const OptionProfile: React.FC<OptionProfileProps>;

export interface SharedStatelessProps {
  activedescendantId?: string;
  getRequiredItemProps?: (item: any, index: number) => RenderItemProps;
  highlightedIndex?: number;
  items: ItemsT;
  noResultsMsg?: React.ReactNode;
  onBlur?: (event: React.FocusEvent<HTMLElement>) => any;
  onFocus?: (event: React.FocusEvent<HTMLElement>) => any;
  rootRef?: React.Ref<any>;
  focusMenu?: (event: FocusEvent | MouseEvent | KeyboardEvent) => any;
  unfocusMenu?: () => any;
}

export type StatelessMenuProps = SharedStatelessProps & MenuProps;
export const Menu: React.FC<StatelessMenuProps>;

export interface NestedMenuProps {
  children: React.ReactNode;
}
export interface NestedMenuState {
  menus: Array<React.Ref<HTMLElement>>;
}
export class NestedMenus extends React.Component<
  NestedMenuProps,
  NestedMenuState
> {
  addMenuToNesting(ref: React.Ref<HTMLElement>): void;
  removeMenuFromNesting(ref: React.Ref<HTMLElement>): void;
  findMenuIndexByRef(ref: React.Ref<HTMLElement>): number;
  getParentMenu(ref: React.Ref<HTMLElement>): React.Ref<HTMLElement>;
  getChildMenu(ref: React.Ref<HTMLElement>): React.Ref<HTMLElement>;
}

export const StyledEmptyState: StyletronComponent<any>;
export const StyledList: StyletronComponent<any>;
export const StyledListItem: StyletronComponent<any>;
export const StyledListItemProfile: StyletronComponent<any>;
export const StyledProfileImgContainer: StyletronComponent<any>;
export const StyledProfileImg: StyletronComponent<any>;
export const StyledProfileLabelsContainer: StyletronComponent<any>;
export const StyledProfileTitle: StyletronComponent<any>;
export const StyledProfileSubtitle: StyletronComponent<any>;
export const StyledProfileBody: StyletronComponent<any>;

export const KEY_STRINGS: KEY_STRINGS;
export const STATE_CHANGE_TYPES: STATE_CHANGE_TYPES;
export const OPTION_LIST_SIZE: OPTION_LIST_SIZE;
