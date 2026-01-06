import type * as React from 'react';
import type { Override } from '../helpers/overrides';
import type { HIERARCHY, SIZE } from '../tag';

export type TagGroupProps = {
  /** Set of more than one `Button` components */
  children: Array<React.ReactNode>;
  overrides?: TagGroupOverrides;
  /** Determines whether tags should wrap to the next line when they exceed the container width. Defaults to true */
  wrap?: boolean;
  /** Defines tags look in the tag group. Set it to one of HIERARCHY[key] values. Defaults to HIERARCHY.primary */
  hierarchy?: (typeof HIERARCHY)[keyof typeof HIERARCHY];
  /** Determines the size of the Tag in the tag group. Defaults to small */
  size?: (typeof SIZE)[keyof typeof SIZE];
};

type TagGroupOverrides = {
  Root?: Override;
};
