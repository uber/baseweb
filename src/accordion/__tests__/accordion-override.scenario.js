/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {styled, useStyletron} from '../../styles/index.js';
import {Accordion, Panel} from '../index.js';

const StyledIconOverride = styled('p', {});

export default function Scenario() {
  const [css] = useStyletron();
  return (
    <div className={css({width: '400px'})}>
      <Accordion
        overrides={{Root: {style: {border: '4px solid lightskyblue'}}}}
      >
        <Panel
          expanded
          title="Accordion panel 1"
          overrides={{
            Content: {style: {backgroundColor: 'lightgreen'}},
            Header: {style: {backgroundColor: 'darkorange'}},
            PanelContainer: {style: {border: '4px solid blue'}},
            ToggleIcon: {
              style: {border: '4px solid indigo'},
              component: function ToggleIconOverride() {
                return <StyledIconOverride>hello</StyledIconOverride>;
              },
            },
          }}
        >
          panel 1
        </Panel>
        <Panel
          title="Accordion panel 1"
          overrides={{
            ToggleIcon: {
              style: {border: '4px solid indigo'},
            },
          }}
        >
          panel 2
        </Panel>
        <Panel title="Accordion panel 3">panel 3</Panel>
      </Accordion>
    </div>
  );
}
