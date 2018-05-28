// @flow

import React from 'react';
import {StyledIcon} from './styles';

type Props = {
  alt?: ?string,
  children: any,
};

export default function Icon({alt, children, ...props}: Props) {
  return (
    <StyledIcon {...props}>
      {alt ? <title>{alt}</title> : null}
      {children}
    </StyledIcon>
  );
}

Icon.defaultProps = {
  alt: null,
};
