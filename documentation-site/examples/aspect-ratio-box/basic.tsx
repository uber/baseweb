import * as React from 'react';
import {
  AspectRatioBox,
  AspectRatioBoxBody,
} from 'baseui/aspect-ratio-box';

export default () => (
  <React.Fragment>
    <AspectRatioBox>
      <AspectRatioBoxBody
        display="flex"
        alignItems="center"
        justifyContent="center"
        overrides={{
          Block: {
            style: {
              border: 'grey solid 2px',
            },
          },
        }}
      >
        Square by default
      </AspectRatioBoxBody>
    </AspectRatioBox>
    <AspectRatioBox aspectRatio={16 / 9}>
      <AspectRatioBoxBody
        display="flex"
        alignItems="center"
        justifyContent="center"
        overrides={{
          Block: {
            style: {
              border: 'grey solid 2px',
            },
          },
        }}
      >
        16:9 aspect ratio
      </AspectRatioBoxBody>
    </AspectRatioBox>
  </React.Fragment>
);
