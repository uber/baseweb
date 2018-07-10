// @flow
import type {PopperOptionsT} from '../types';

// $FlowFixMe
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
            styles: {
              top: 10,
              left: 10,
            },
            arrowStyles: {
              top: 10,
              left: 10,
            },
            placement: 'left-start',
          });
        },
      };
    },
  );

export default mock;
