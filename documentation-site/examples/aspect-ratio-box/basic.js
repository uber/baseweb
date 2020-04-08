// @flow
import * as React from 'react';
import {
  AspectRatioBox,
  AspectRatioBoxBody,
} from 'baseui/aspect-ratio-box';

const bodyProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overrides: {
    Block: {
      style: {
        borderLeftWidth: 'solid',
        borderRightWidth: 'solid',
        borderTopWidth: 'solid',
        borderBottomWidth: 'solid',
        borderLeftStyle: '2px',
        borderTopStyle: '2px',
        borderRightStyle: '2px',
        borderBottomStyle: '2px',
        borderLeftColor: `grey`,
        borderTopColor: `grey`,
        borderRightColor: `grey`,
        borderBottomColor: `grey`,
      },
    },
  },
};

export default () => (
  <React.Fragment>
    <AspectRatioBox>
      <AspectRatioBoxBody {...bodyProps}>
        Square by default
      </AspectRatioBoxBody>
    </AspectRatioBox>
    <AspectRatioBox aspectRatio={16 / 9}>
      <AspectRatioBoxBody {...bodyProps}>
        16:9 aspect ratio
      </AspectRatioBoxBody>
    </AspectRatioBox>
  </React.Fragment>
);
