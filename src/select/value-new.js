// @flow
/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import {SelectValue} from './styled-components';

export default class Value extends React.Component {
  onRemove = event => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onRemove(this.props.value);
  };

  handleTouchEndRemove = event => {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this.dragging) return;
    // Fire the mouse events
    this.onRemove(event);
  };

  handleTouchMove = () => {
    // Set a flag that the view is being dragged
    this.dragging = true;
  };

  handleTouchStart = () => {
    // Set a flag that the view is not being dragged
    this.dragging = false;
  };

  renderRemoveIcon() {
    if (this.props.disabled || !this.props.onRemove) return;
    return (
      <span
        aria-hidden="true"
        onMouseDown={this.onRemove}
        onTouchEnd={this.handleTouchEndRemove}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
      >
        &times;
      </span>
    );
  }

  render() {
    return (
      <SelectValue role="option" aria-selected="true">
        {/* {this.renderRemoveIcon()} */}
        {this.props.children}
      </SelectValue>
    );
  }
}
