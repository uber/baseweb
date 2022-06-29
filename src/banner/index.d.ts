import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export declare const ACTION_POSITION: {
  below: 'below';
  trailing: 'trailing';
};

export declare const ARTWORK_TYPE: {
  badge: 'badge';
  icon: 'icon';
};

export declare const HIERARCHY: {
  high: 'high';
  low: 'low';
};

export declare const KIND: {
  info: 'info';
  negative: 'negative';
  positive: 'positive';
  warning: 'warning';
};

export interface ActionContentT {
  label: string;
  icon?: (iconProps: { size: string }) => React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => any;
  position?: typeof ACTION_POSITION[keyof typeof ACTION_POSITION];
}

export interface ArtworkContentT {
  icon: (iconProps: { size: string }) => React.ReactNode;
  type?: typeof ARTWORK_TYPE[keyof typeof ARTWORK_TYPE];
}

export interface PropsT {
  action?: ActionContentT;
  artwork?: ArtworkContentT;
  children: React.ReactNode;
  hierarchy?: typeof HIERARCHY[keyof typeof HIERARCHY];
  kind?: typeof KIND[keyof typeof KIND];
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

export declare const StyledBelowContent: StyletronComponent<any, any>;
export declare const StyledLeadingContent: StyletronComponent<any, any>;
export declare const StyledMessage: StyletronComponent<any, any>;
export declare const StyledMessageContent: StyletronComponent<any, any>;
export declare const StyledRoot: StyletronComponent<any, any>;
export declare const StyledTitle: StyletronComponent<any, any>;
export declare const StyledTrailingContent: StyletronComponent<any, any>;
export declare const StyledTrailingButtonContainer: StyletronComponent<any, any>;
export declare const StyledTrailingIconButton: StyletronComponent<any, any>;

export declare const Banner: React.FC<PropsT>;
