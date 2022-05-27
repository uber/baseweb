import * as React from 'react';
import { StyletronComponent } from 'styletron-react';
import { Override } from '../overrides';

export interface AvatarOverrides<T> {
  Avatar?: Override<T>;
  Initials?: Override<T>;
  Root?: Override<T>;
}

export interface StyleProps {
  $didImageFailToLoad: boolean;
  $size?: string;
}

export interface AvatarProps {
  name: string;
  overrides?: AvatarOverrides<StyleProps>;
  size?: string;
  src?: string;
}

export declare const Avatar: React.FC<AvatarProps>;

export declare const StyledAvatar: StyletronComponent<any>;
export declare const StyledInitials: StyletronComponent<any>;
export declare const StyledRoot: StyletronComponent<any>;
