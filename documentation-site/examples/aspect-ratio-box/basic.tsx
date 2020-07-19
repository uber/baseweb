import * as React from 'react';
import {
  AspectRatioBox,
  AspectRatioBoxBody,
} from 'baseui/aspect-ratio-box';
import {expandBorderStyles} from 'baseui/styles';

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
              ...expandBorderStyles({
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'grey',
              }),
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
              ...expandBorderStyles({
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'grey',
              }),
            },
          },
        }}
      >
        16:9 aspect ratio
      </AspectRatioBoxBody>
    </AspectRatioBox>
  </React.Fragment>
);
