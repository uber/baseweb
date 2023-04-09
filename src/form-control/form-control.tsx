/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { getOverride, getOverrideProps } from '../helpers/overrides';
import { UIDConsumer } from 'react-uid';
import {
  Label as StyledLabel,
  LabelEndEnhancer as StyledLabelEndEnhancer,
  LabelContainer as StyledLabelContainer,
  Caption as StyledCaption,
  ControlContainer as StyledControlContainer,
} from './styled-components';
import type { FormControlProps, FormControlState, StyleProps } from './types';

// @ts-ignore
function chooseRenderedHint(caption, error, positive, sharedProps) {
  if (!!error && typeof error !== 'boolean') {
    return typeof error === 'function' ? error(sharedProps) : error;
  }

  if (!!positive && typeof positive !== 'boolean') {
    return typeof positive === 'function' ? positive(sharedProps) : positive;
  }

  if (caption) {
    return typeof caption === 'function' ? caption(sharedProps) : caption;
  }

  return null;
}

export default class FormControl extends React.Component<FormControlProps, FormControlState> {
  static defaultProps = {
    overrides: {},
    // @ts-ignore
    label: null,
    // @ts-ignore
    caption: null,
    disabled: false,
    counter: false,
  };

  render() {
    const {
      overrides: {
        // @ts-ignore
        Label: LabelOverride,
        // @ts-ignore
        LabelEndEnhancer: LabelEndEnhancerOverride,
        // @ts-ignore
        LabelContainer: LabelContainerOverride,
        // @ts-ignore
        Caption: CaptionOverride,
        // @ts-ignore
        ControlContainer: ControlContainerOverride,
      },
      label,
      caption,
      disabled,
      error,
      positive,
      htmlFor,
      children,
      counter,
    } = this.props;

    // @ts-expect-error todo(flow->ts): looks dangerous
    const onlyChildProps = React.Children.only(children).props;

    const sharedProps: StyleProps = {
      $disabled: !!disabled,
      $error: !!error,
      $positive: !!positive,
    };

    const Label = getOverride(LabelOverride) || StyledLabel;
    const LabelEndEnhancer = getOverride(LabelEndEnhancerOverride) || StyledLabelEndEnhancer;
    const LabelContainer = getOverride(LabelContainerOverride) || StyledLabelContainer;
    const Caption = getOverride(CaptionOverride) || StyledCaption;
    const ControlContainer = getOverride(ControlContainerOverride) || StyledControlContainer;

    const hint = chooseRenderedHint(caption, error, positive, sharedProps);

    if (__DEV__) {
      if (error && positive) {
        // eslint-disable-next-line no-console
        console.warn(
          `[FormControl] \`error\` and \`positive\` are both set to \`true\`. \`error\` will take precedence but this may not be what you want.`
        );
      }
    }

    let labelEndEnhancer = this.props.labelEndEnhancer;
    if (counter) {
      // inferred values are preferred but if the user specifies the value
      // that is then used as the default.
      let maxLength: number | undefined | null = null;
      let length: number | undefined | null = null;
      let counterError: boolean | undefined | null = null;

      if (typeof counter === 'object') {
        length = counter.length;
        maxLength = counter.maxLength;
        counterError = counter.error;
      }

      maxLength = maxLength ? maxLength : onlyChildProps.maxLength;
      if (length == null && typeof onlyChildProps.value === 'string') {
        length = onlyChildProps.value.length;
      }

      if (length == null) {
        length = 0;
        if (__DEV__) {
          console.warn(
            `[FromControl] \`length\` must either be explicitly set via \`counter\` object property, or \`value\` string property on the child component.`
          );
        }
      }

      sharedProps.$length = length;
      if (maxLength == null) {
        if (!labelEndEnhancer) labelEndEnhancer = `${length}`;
      } else {
        sharedProps.$maxLength = length;
        if (!labelEndEnhancer) labelEndEnhancer = `${length}/${maxLength}`;
        if (length > maxLength && counterError == null) counterError = true;
      }

      if (counterError) {
        sharedProps.$error = true;
        sharedProps.$counterError = true;
      }
    }

    return (
      <React.Fragment>
        {label && (
          <LabelContainer {...sharedProps} {...getOverrideProps(LabelContainerOverride)}>
            <Label
              data-baseweb="form-control-label"
              htmlFor={htmlFor || onlyChildProps.id}
              {...sharedProps}
              {...getOverrideProps(LabelOverride)}
            >
              {typeof label === 'function' ? label(sharedProps) : label}
            </Label>
            {!!labelEndEnhancer && (
              <LabelEndEnhancer {...sharedProps} {...getOverrideProps(LabelEndEnhancerOverride)}>
                {typeof labelEndEnhancer === 'function'
                  ? labelEndEnhancer(sharedProps)
                  : labelEndEnhancer}
              </LabelEndEnhancer>
            )}
          </LabelContainer>
        )}
        <UIDConsumer>
          {(captionId: string) => (
            <ControlContainer
              data-baseweb="form-control-container"
              {...sharedProps}
              {...getOverrideProps(ControlContainerOverride)}
            >
              {React.Children.map(children, (child, index) => {
                if (!child) return;

                // @ts-expect-error
                const key = child.key || String(index);
                // @ts-expect-error todo(flow->ts): looks dangerous -- can be possible error
                return React.cloneElement(child, {
                  key,
                  'aria-errormessage': error ? captionId : null,
                  'aria-describedby': caption || positive ? captionId : null,
                  disabled: onlyChildProps.disabled || disabled,
                  error:
                    typeof onlyChildProps.error !== 'undefined'
                      ? onlyChildProps.error
                      : sharedProps.$error === false
                      ? undefined
                      : sharedProps.$error,
                  positive:
                    typeof onlyChildProps.positive !== 'undefined'
                      ? onlyChildProps.positive
                      : sharedProps.$positive === false
                      ? undefined
                      : sharedProps.$positive,
                });
              })}
              {(!!caption || !!error || positive) && (
                <Caption
                  data-baseweb="form-control-caption"
                  id={captionId}
                  {...sharedProps}
                  {...getOverrideProps(CaptionOverride)}
                >
                  {hint}
                </Caption>
              )}
            </ControlContainer>
          )}
        </UIDConsumer>
      </React.Fragment>
    );
  }
}
