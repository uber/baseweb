/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {styled} from '../styles';
import {Accordion, Panel, StatefulPanel} from './index';
import examples from './examples-list';

export const suite = 'Component Test Suite';

const Centered = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'start',
  height: '90vh',
  lineHeight: 1.5,
  width: '500px',
  margin: '0 auto',
});

const panelOverrides = {
  Header: {
    props: {
      'data-title': 'data-title',
    },
    style: {
      borderBottom: '1px solid #916cb2',
      color: '#4f1e7b',
    },
  },
  Content: {
    style: ({$expanded}) => ({
      backgroundColor: '#efe6f7',
      borderBottom: $expanded ? '1px solid #916cb2' : 'none',
    }),
  },
  ToggleIcon: {
    props: {
      title: 'Toggle expandable block',
      'data-label': 'toggle',
    },
    style: {
      backgroundColor: '#916cb2',
      color: '#fff',
      borderRadius: '50%',
      paddingTop: '5px',
      paddingBottom: '5px',
      paddingLeft: '5px',
      paddingRight: '5px',
    },
  },
};

const content =
  'Praesent condimentum ante ac ipsum aliquam, ac scelerisque velit sagittis. Ut sit amet libero scelerisque, accumsan ante vitae, hendrerit tellus. Nullam metus est, vehicula a aliquet id, lobortis in mauris.';

export default {
  [examples.ACCORDION_EXAMPLE]: function Story1() {
    return (
      <Centered>
        <Accordion>
          {/* $FlowFixMe */}
          <Panel title="Accordion panel 1">{content}</Panel>
          <Panel title="Accordion panel 2">{content}</Panel>
          <Panel title="Accordion panel 3">{content}</Panel>
        </Accordion>
      </Centered>
    );
  },
  [examples.STYLE_PROPS_OVERRIDES]: function Story2() {
    return (
      <Centered>
        <Accordion initialState={{expanded: ['panel-1']}}>
          {/* $FlowFixMe */}
          <Panel
            key="panel-1"
            title="Accordion panel 1"
            overrides={panelOverrides}
          >
            {content}
          </Panel>
          <Panel title="Accordion panel 2" overrides={panelOverrides}>
            {content}
          </Panel>
          <Panel disabled title="Accordion panel 3" overrides={panelOverrides}>
            {content}
          </Panel>
        </Accordion>
      </Centered>
    );
  },
  [examples.SINGLE_STATEFUL_PANEL]: function Story3() {
    return (
      <Centered>
        {/* $FlowFixMe */}
        <StatefulPanel title="Expandable panel">{content}</StatefulPanel>
      </Centered>
    );
  },
};
