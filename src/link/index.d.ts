import * as React from 'react';
import {StyletronComponent} from 'styletron-react';

export interface LinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export const StyledLink: StyletronComponent<LinkProps>;
