/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import * as React from 'react';

import {useStyletron} from '../../styles/index.js';
import {Button} from '../../button/index.js';
import {StatefulPopover, TRIGGER_TYPE, PLACEMENT} from '../index.js';

export default function Scenario() {
  const [css] = useStyletron();
  const [expanded, setExpanded] = React.useState(false);
  return (
    <React.Fragment>
      <div className={css({display: 'flex', justifyContent: 'center'})}>
        <StatefulPopover
          accessibilityType={'tooltip'}
          content={() => (
            <div id="e2e-popover">
              <button
                id="e2e-update"
                className={css({marginRight: '8px'})}
                type="button"
                onClick={() => setExpanded(s => !s)}
              >
                update
              </button>
              {expanded ? <span id="e2e-expanded">hello world!</span> : 'hello'}
            </div>
          )}
          triggerType={TRIGGER_TYPE.click}
          placement={PLACEMENT.bottom}
        >
          <Button
            overrides={{
              BaseButton: {
                props: {id: 'e2e-open'},
              },
            }}
          >
            Open
          </Button>
        </StatefulPopover>
      </div>
    </React.Fragment>
  );
}
