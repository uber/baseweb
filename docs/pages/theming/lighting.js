/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import React from 'react';
import {Header, ExampleWrapper} from './common';
import {styled} from '../../../src/styles';
import {LightTheme} from '../../../src/themes';
import {Block} from '../../../src/block';

const StyledLightingBox = styled('div', ({$theme, $boxShadow = ''}) => {
  return {
    marginTop: $theme.sizing.scale200,
    height: $theme.sizing.scale4800,
    backgroundColor: $theme.colors.mono100,
    borderRadius: $theme.borders.radius200,
    boxShadow: $boxShadow,
  };
});

function LightingPreview({name, boxShadow}) {
  return (
    <Block width="250px" margin="scale800">
      <Block font="font400">
        {name} ({boxShadow})
      </Block>
      <StyledLightingBox $boxShadow={boxShadow} />
    </Block>
  );
}

function Lighting() {
  const lighting = {
    shadow400: LightTheme.lighting.shadow400,
    shadow500: LightTheme.lighting.shadow500,
    shadow600: LightTheme.lighting.shadow600,
    shadow700: LightTheme.lighting.shadow700,
    overlay0: LightTheme.lighting.overlay0,
    overlay100: LightTheme.lighting.overlay100,
    overlay200: LightTheme.lighting.overlay200,
    overlay300: LightTheme.lighting.overlay300,
    overlay400: LightTheme.lighting.overlay400,
    overlay500: LightTheme.lighting.overlay500,
    overlay600: LightTheme.lighting.overlay600,
  };

  return (
    <div>
      <Header>Lighting</Header>
      <ExampleWrapper>
        {Object.keys(lighting).map(lightingKey => (
          <LightingPreview
            name={lightingKey}
            boxShadow={lighting[lightingKey]}
          />
        ))}
      </ExampleWrapper>
    </div>
  );
}

export default Lighting;
