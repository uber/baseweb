/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as React from 'react';
import {getOverrides} from '../helpers/overrides.js';
import {
  Label as StyledLabel,
  Caption as StyledCaption,
  ControlContainer as StyledControlContainer,
} from './styled-components.js';
import type {FormControlPropsT} from './types.js';

function chooseRenderedHint(caption, error, positive, sharedProps) {
  if (error && typeof error !== 'boolean') {
    return typeof error === 'function' ? error(sharedProps) : error;
  }

  if (positive && typeof positive !== 'boolean') {
    return typeof positive === 'function' ? positive(sharedProps) : positive;
  }

  if (caption) {
    return typeof caption === 'function' ? caption(sharedProps) : caption;
  }

  return null;
}

export default class FormControl extends React.Component<FormControlPropsT> {
  static defaultProps = {
    overrides: {},
    label: null,
    caption: null,
    error: false,
    positive: false,
  };

  render() {
    const {
      overrides: {
        Label: LabelOverride,
        Caption: CaptionOverride,
        ControlContainer: ControlContainerOverride,
      },
      label,
      caption,
      disabled,
      error,
      positive,
      children,
    } = this.props;

    const onlyChildProps = React.Children.only(children).props;

    const sharedProps = {
      $disabled: !!disabled,
      $error: !!error,
      $positive: !!positive,
    };

    const [Label, getLabelProps] = getOverrides(LabelOverride, StyledLabel);
    const [Caption, getCaptionProps] = getOverrides(
      CaptionOverride,
      StyledCaption,
    );
    const [ControlContainer, getControlContainerProps] = getOverrides(
      ControlContainerOverride,
      StyledControlContainer,
    );

    const hint = chooseRenderedHint(caption, error, positive, sharedProps);

    if (__DEV__) {
      if (error && positive) {
        // eslint-disable-next-line no-console
        console.warn(
          `[FormControl] \`error\` and \`positive\` are both set to \`true\`. \`error\` will take precedence but this may not be what you want.`,
        );
      }
    }

    return (
      <React.Fragment>
        {label && (
          <Label
            {...getLabelProps({
              'data-baseweb': 'form-control-label',
              htmlFor: onlyChildProps.id,
              ...sharedProps,
            })}
          >
            {typeof label === 'function' ? label(sharedProps) : label}
          </Label>
        )}
        <ControlContainer
          {...getControlContainerProps({
            'data-baseweb': 'form-conrol-container',
            ...sharedProps,
          })}
        >
          {children}
          {(caption || error || positive) && (
            <Caption {...getCaptionProps(sharedProps)}>{hint}</Caption>
          )}
        </ControlContainer>
      </React.Fragment>
    );
  }
}
