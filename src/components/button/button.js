/* eslint-disable flowtype/require-valid-file-annotation, react/prop-types */
import * as React from 'react';
import {
  PrimaryButton as StyledPrimaryButton,
  ButtonLabel as StyledButtonLabel,
  StartEnhancer as StyledStartEnhancer,
  EndEnhancer as StyledEndEnhancer,
} from './styled-components';

export default function Button({
  onClick = () => {},
  disabled,
  label,
  startEnhancer,
  endEnhancer,
  overrides = {},
}) {
  // Base UI override logic goes here
  const BaseButton = overrides.BaseButton || StyledPrimaryButton;
  const ButtonLabel = overrides.ButtonLabel || StyledButtonLabel;
  const StartEnhancer = overrides.StartEnhancer || StyledStartEnhancer;
  const EndEnhancer = overrides.EndEnhancer || StyledEndEnhancer;
  return (
    <BaseButton onClick={onClick} disabled={disabled}>
      {startEnhancer && (
        <StartEnhancer>
          {typeof startEnhancer === 'function'
            ? startEnhancer()
            : startEnhancer}
        </StartEnhancer>
      )}
      {label && (
        <ButtonLabel>
          {typeof label === 'function' ? label() : label}
        </ButtonLabel>
      )}
      {endEnhancer && (
        <EndEnhancer>
          {typeof endEnhancer === 'function' ? endEnhancer() : endEnhancer}
        </EndEnhancer>
      )}
    </BaseButton>
  );
}
