/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as React from 'react';
import {getOverride, getOverrideProps} from '../helpers/overrides.js';
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

    const Label = getOverride(LabelOverride) || StyledLabel;
    const Caption = getOverride(CaptionOverride) || StyledCaption;
    const ControlContainer =
      getOverride(ControlContainerOverride) || StyledControlContainer;

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
            data-baseweb="form-control-label"
            htmlFor={onlyChildProps.id}
            {...sharedProps}
            {...getOverrideProps(LabelOverride)}
          >
            {typeof label === 'function' ? label(sharedProps) : label}
          </Label>
        )}
        <ControlContainer
          data-baseweb="form-control-container"
          {...sharedProps}
          {...getOverrideProps(ControlContainerOverride)}
        >
          {React.Children.map(children, (child, index) => {
            if (!child) return;

            const key = child.key || String(index);
            return React.cloneElement(child, {
              key,
              disabled:
                typeof onlyChildProps.disabled !== 'undefined'
                  ? onlyChildProps.disabled
                  : disabled,
              error:
                typeof onlyChildProps.error !== 'undefined'
                  ? onlyChildProps.error
                  : error,
              positive:
                typeof onlyChildProps.positive !== 'undefined'
                  ? onlyChildProps.positive
                  : positive,
            });
          })}
          {(caption || error || positive) && (
            <Caption {...sharedProps} {...getOverrideProps(CaptionOverride)}>
              {hint}
            </Caption>
          )}
        </ControlContainer>
      </React.Fragment>
    );
  }
}
