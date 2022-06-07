import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export interface ACTION_POSITION {
  below: 'below';
  trailing: 'trailing';
}

export interface ARTWORK_TYPE {
  badge: 'badge';
  icon: 'icon';
}

export interface HIERARCHY {
  high: 'high';
  low: 'low';
}

export interface KIND {
  info: 'info';
  negative: 'negative';
  positive: 'positive';
  warning: 'warning';
}

export interface ActionContentT {
  label: string;
  icon?: (iconProps: { size: string }) => React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => any;
  position?: ACTION_POSITION[keyof ACTION_POSITION];
}

export interface ArtworkContentT {
  icon: (iconProps: { size: string }) => React.ReactNode;
  type?: ARTWORK_TYPE[keyof ARTWORK_TYPE];
}

export interface PropsT {
  action?: ActionContentT;
  artwork?: ArtworkContentT;
  children: React.ReactNode;
  hierarchy?: HIERARCHY[keyof HIERARCHY];
  kind?: KIND[keyof KIND];
  overrides?: {
    BelowContent?: Override<any>;
    LeadingContent?: Override<any>;
    Message?: Override<any>;
    MessageContent?: Override<any>;
    Root?: Override<any>;
    Title?: Override<any>;
    TrailingContent?: Override<any>;
    TrailingButtonContainer?: Override<any>;
    TrailingIconButton?: Override<any>;
  };
  nested?: boolean;
  title?: React.ReactNode;
}

export const StyledBelowContent: StyletronComponent<any>;
export const StyledLeadingContent: StyletronComponent<any>;
export const StyledMessage: StyletronComponent<any>;
export const StyledMessageContent: StyletronComponent<any>;
export const StyledRoot: StyletronComponent<any>;
export const StyledTitle: StyletronComponent<any>;
export const StyledTrailingContent: StyletronComponent<any>;
export const StyledTrailingButtonContainer: StyletronComponent<any>;
export const StyledTrailingIconButton: StyletronComponent<any>;

export const ACTION_POSITION: ACTION_POSITION;
export const ARTWORK_TYPE: ARTWORK_TYPE;
export const HIERARCHY: HIERARCHY;
export const KIND: KIND;

export const Banner: React.FC<PropsT>;
