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
        borderLeftStyle: 'solid',
        borderRightStyle: 'solid',
        borderTopStyle: 'solid',
        borderBottomStyle: 'solid',
        borderLeftWidth: '2px',
        borderTopWidth: '2px',
        borderRightWidth: '2px',
        borderBottomWidth: '2px',
        borderLeftColor: `grey`,
        borderTopColor: `grey`,
        borderRightColor: `grey`,
        borderBottomColor: `grey`,
      },
    },
  },
};

export default function Example() {
  return (
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
}
