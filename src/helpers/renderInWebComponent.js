/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import {Provider as StyletronProvider} from 'styletron-react';
import {Client as Styletron} from 'styletron-engine-atomic';
import ReactDOM from 'react-dom';
import * as React from 'react';

import BaseProvider from './base-provider.js';
import {LightTheme} from '../themes/index.js';

const renderInWebComponent = (
  tagName: string,
  // eslint-disable-next-line flowtype/no-weak-types
  Component: React.ComponentType<any>,
) => {
  // eslint-disable-next-line cup/no-undef
  class WebComponent extends HTMLElement {
    constructor() {
      super();
      // eslint-disable-next-line cup/no-undef
      const wrapper = document.createElement('div');
      const shadow = this.attachShadow({mode: 'open'});

      shadow.appendChild(wrapper);

      ReactDOM.render(
        <StyletronProvider
          // eslint-disable-next-line flowtype/no-weak-types
          value={new Styletron({container: (this.shadowRoot: any)})}
        >
          <BaseProvider theme={LightTheme}>
            <Component />
          </BaseProvider>
        </StyletronProvider>,
        wrapper,
      );
    }
  }

  // eslint-disable-next-line cup/no-undef
  if (!customElements.get(tagName)) {
    // eslint-disable-next-line cup/no-undef
    customElements.define(tagName, WebComponent);
  }
};

export default renderInWebComponent;
