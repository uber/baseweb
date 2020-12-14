/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {PopperOptionsT} from '../types.js';

const destroy = jest.fn();
// $FlowFixMe
const mock = jest
  .fn()
  .mockImplementation(
    (anchor: HTMLElement, popover: HTMLElement, options: PopperOptionsT) => {
      const onPopperUpdate = options.modifiers.applyReactStyle.fn;
      return {
        options,
        destroy,
        _callOnPopperUpdate: function() {
          onPopperUpdate({
            offsets: {
              popper: {
                top: 10,
                left: 10,
              },
              arrow: {
                top: 10,
                left: 10,
              },
            },
            placement: 'left-start',
          });
        },
      };
    },
  );

export default mock;
