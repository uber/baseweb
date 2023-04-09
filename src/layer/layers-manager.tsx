/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import { styled } from '../styles';
import { getOverrides } from '../helpers/overrides';
import type { LayersManagerProps, LayersManagerState, LayersContextProps } from './types';
import { initFocusVisible } from '../utils/focusVisible';

const StyledAppContainer = styled('div', {});
const StyledLayersContainer = styled('div', {});

function defaultEventHandlerFn() {
  if (__DEV__) {
    console.warn(
      '`LayersManager` was not found. This occurs if you are attempting to use a component requiring `Layer` without using the `BaseProvider` at the root of your app. Please visit https://baseweb.design/components/base-provider/ for more information'
    );
  }
}

export const LayersContext = React.createContext<LayersContextProps>({
  addEscapeHandler: defaultEventHandlerFn,
  removeEscapeHandler: defaultEventHandlerFn,
  addKeyDownHandler: defaultEventHandlerFn,
  removeKeyDownHandler: defaultEventHandlerFn,
  addKeyUpHandler: defaultEventHandlerFn,
  removeKeyUpHandler: defaultEventHandlerFn,
  addKeyPressHandler: defaultEventHandlerFn,
  removeKeyPressHandler: defaultEventHandlerFn,
  addDocClickHandler: defaultEventHandlerFn,
  removeDocClickHandler: defaultEventHandlerFn,
  host: undefined,
  zIndex: undefined,
});
export const Provider = LayersContext.Provider;
export const Consumer = LayersContext.Consumer;

export default class LayersManager extends React.Component<LayersManagerProps, LayersManagerState> {
  host = React.createRef<HTMLElement>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  containerRef = React.createRef<any>();

  constructor(props: LayersManagerProps) {
    super(props);
    this.state = {
      escapeKeyHandlers: [],
      keyDownHandlers: [],
      keyUpHandlers: [],
      keyPressHandlers: [],
      docClickHandlers: [],
    };
  }

  componentDidMount() {
    this.forceUpdate();
    initFocusVisible(this.containerRef.current);

    if (__BROWSER__) {
      document.addEventListener('keydown', this.onKeyDown);
      document.addEventListener('keyup', this.onKeyUp);
      document.addEventListener('keypress', this.onKeyPress);
      // using mousedown event so that callback runs before events on children inside of the layer
      document.addEventListener('mousedown', this.onDocumentClick);
    }
  }

  componentWillUnmount() {
    if (__BROWSER__) {
      document.removeEventListener('keydown', this.onKeyDown);
      document.removeEventListener('keyup', this.onKeyUp);
      document.removeEventListener('keypress', this.onKeyPress);
      document.removeEventListener('mousedown', this.onDocumentClick);
    }
  }

  onDocumentClick = (event: MouseEvent) => {
    const docClickHandler = this.state.docClickHandlers[this.state.docClickHandlers.length - 1];
    if (docClickHandler) {
      docClickHandler(event);
    }
  };

  onKeyDown = (event: KeyboardEvent) => {
    const keyDownHandler = this.state.keyDownHandlers[this.state.keyDownHandlers.length - 1];
    if (keyDownHandler) {
      keyDownHandler(event);
    }
  };

  onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      const escapeKeyHandler =
        this.state.escapeKeyHandlers[this.state.escapeKeyHandlers.length - 1];
      if (escapeKeyHandler) {
        escapeKeyHandler();
      }
    }

    const keyUpHandler = this.state.keyUpHandlers[this.state.keyUpHandlers.length - 1];
    if (keyUpHandler) {
      keyUpHandler(event);
    }
  };

  onKeyPress = (event: KeyboardEvent) => {
    const keyPressHandler = this.state.keyPressHandlers[this.state.keyPressHandlers.length - 1];
    if (keyPressHandler) {
      keyPressHandler(event);
    }
  };

  onAddEscapeHandler = (escapeKeyHandler: () => unknown) => {
    this.setState((prev) => {
      return { escapeKeyHandlers: [...prev.escapeKeyHandlers, escapeKeyHandler] };
    });
  };

  onRemoveEscapeHandler = (escapeKeyHandler: () => unknown) => {
    this.setState((prev) => {
      return {
        escapeKeyHandlers: prev.escapeKeyHandlers.filter((handler) => handler !== escapeKeyHandler),
      };
    });
  };

  onAddKeyDownHandler = (keyDownHandler: (event: KeyboardEvent) => void) => {
    this.setState((prev) => {
      return { keyDownHandlers: [...prev.keyDownHandlers, keyDownHandler] };
    });
  };

  onRemoveKeyDownHandler = (keyDownHandler: (event: KeyboardEvent) => void) => {
    this.setState((prev) => {
      return {
        keyDownHandlers: prev.keyDownHandlers.filter((handler) => handler !== keyDownHandler),
      };
    });
  };

  onAddKeyUpHandler = (keyUpHandler: (event: KeyboardEvent) => void) => {
    this.setState((prev) => {
      return { keyUpHandlers: [...prev.keyUpHandlers, keyUpHandler] };
    });
  };

  onRemoveKeyUpHandler = (keyUpHandler: (event: KeyboardEvent) => void) => {
    this.setState((prev) => {
      return {
        keyUpHandlers: prev.keyUpHandlers.filter((handler) => handler !== keyUpHandler),
      };
    });
  };

  onAddKeyPressHandler = (keyPressHandler: (event: KeyboardEvent) => void) => {
    this.setState((prev) => {
      return { keyPressHandlers: [...prev.keyPressHandlers, keyPressHandler] };
    });
  };

  onRemoveKeyPressHandler = (keyPressHandler: (event: KeyboardEvent) => void) => {
    this.setState((prev) => {
      return {
        keyPressHandlers: prev.keyPressHandlers.filter((handler) => handler !== keyPressHandler),
      };
    });
  };

  onAddDocClickHandler = (docClickHandler: (event: MouseEvent) => void) => {
    this.setState((prev) => {
      return { docClickHandlers: [...prev.docClickHandlers, docClickHandler] };
    });
  };

  onRemoveDocClickHandler = (docClickHandler: (event: MouseEvent) => void) => {
    this.setState((prev) => {
      return {
        docClickHandlers: prev.docClickHandlers.filter((handler) => handler !== docClickHandler),
      };
    });
  };

  render() {
    const { overrides = {} } = this.props;
    const [AppContainer, appContainerProps] = getOverrides(
      overrides.AppContainer,
      StyledAppContainer
    );
    const [LayersContainer, layersContainerProps] = getOverrides(
      overrides.LayersContainer,
      StyledLayersContainer
    );
    return (
      <Consumer>
        {({ host }) => {
          if (__DEV__) {
            if (host !== undefined) {
              // eslint-disable-next-line no-console
              console.warn(
                'There is a LayersManager already exists in your application. It is not recommended to have more than one LayersManager in an application.'
              );
            }
          }
          return (
            <Provider
              value={{
                host: host || this.host.current,
                zIndex: this.props.zIndex,
                addEscapeHandler: this.onAddEscapeHandler,
                removeEscapeHandler: this.onRemoveEscapeHandler,
                addKeyDownHandler: this.onAddKeyDownHandler,
                removeKeyDownHandler: this.onRemoveKeyDownHandler,
                addKeyUpHandler: this.onAddKeyUpHandler,
                removeKeyUpHandler: this.onRemoveKeyUpHandler,
                addKeyPressHandler: this.onAddKeyPressHandler,
                removeKeyPressHandler: this.onRemoveKeyPressHandler,
                addDocClickHandler: this.onAddDocClickHandler,
                removeDocClickHandler: this.onRemoveDocClickHandler,
              }}
            >
              <AppContainer {...appContainerProps} ref={this.containerRef}>
                {this.props.children}
              </AppContainer>

              <LayersContainer {...layersContainerProps} ref={this.host} />
            </Provider>
          );
        }}
      </Consumer>
    );
  }
}
