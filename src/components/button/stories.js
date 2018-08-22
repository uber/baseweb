/* global module */
/* eslint-disable flowtype/require-valid-file-annotation, react/prop-types */
import React from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {styled} from '../../styles';

import Button from './button';
import {
  SecondaryButton,
  TertiaryButton,
  MinimalButton,
} from './styled-components';

function CloudComponent() {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      style={{width: 24, height: 24}}
    >
      <rect width={24} height={24} fill="white" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 5C12.8755 5 11.4519 5.86084 10.6609 7.15112C10.2905 7.05249 9.90137 7 9.5 7C7.14185 7 5.20752 8.81372 5.01562 11.1221C3.28247 11.5605 2 13.1304 2 15C2 17.2092 3.79077 19 6 19H11V14.4143L9.70703 15.707C9.31665 16.0977 8.68335 16.0977 8.29297 15.707C7.90234 15.3167 7.90234 14.6833 8.29297 14.293L11.293 11.293C11.6833 10.9023 12.3167 10.9023 12.707 11.293L15.707 14.293C16.0977 14.6833 16.0977 15.3167 15.707 15.707C15.3167 16.0977 14.6833 16.0977 14.293 15.707L13 14.4143V19H17C19.7615 19 22 16.7615 22 14C22 11.9492 20.7656 10.187 18.9993 9.41577C18.9543 6.96924 16.9573 5 14.5 5Z"
        fill="black"
      />
    </svg>
  );
}

const ButtonContainer = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  flexDirection: 'column',
});

const ButtonTypeLabel = styled('div', {
  ':not(:first-child)': {
    marginTop: '20px',
  },
});

const ButtonRow = styled('div', {
  display: 'flex',
});

const ButtonRowItem = styled('div', {
  ':not(:first-child)': {
    marginLeft: '20px',
  },
});

storiesOf('Button', module)
  .add('Basic Buttons', () => (
    <ButtonContainer>
      <ButtonTypeLabel>Primary Button</ButtonTypeLabel>
      <Button onClick={action('primary button click')} label="Primary" />
      <ButtonTypeLabel>Secondary Button</ButtonTypeLabel>
      <Button
        onClick={action('secondary button click')}
        label="Secondary"
        overrides={{BaseButton: SecondaryButton}}
      />
      <ButtonTypeLabel>Tertiary Button</ButtonTypeLabel>
      <Button
        onClick={action('tertiary button click')}
        label="Tertiary"
        overrides={{BaseButton: TertiaryButton}}
      />
      <ButtonTypeLabel>Minimal Button</ButtonTypeLabel>
      <Button
        onClick={action('minimal button click')}
        label="Minimal"
        overrides={{BaseButton: MinimalButton}}
      />
      <ButtonTypeLabel>Disabled Button</ButtonTypeLabel>
      <Button
        onClick={action('disabled button click')}
        disabled={true}
        label="Disabled"
        overrides={{BaseButton: MinimalButton}}
      />
    </ButtonContainer>
  ))
  .add('With Enhancers', () => (
    <ButtonContainer>
      <ButtonTypeLabel>Start Enhancer</ButtonTypeLabel>
      <ButtonRow>
        <ButtonRowItem>
          <Button label="Primary" startEnhancer={CloudComponent} />
        </ButtonRowItem>
        <ButtonRowItem>
          <Button
            label="Secondary"
            startEnhancer={CloudComponent}
            overrides={{BaseButton: SecondaryButton}}
          />
        </ButtonRowItem>
        <ButtonRowItem>
          <Button
            label="Tertiary"
            startEnhancer={CloudComponent}
            overrides={{BaseButton: TertiaryButton}}
          />
        </ButtonRowItem>
        <ButtonRowItem>
          <Button
            label="Minimal"
            startEnhancer={CloudComponent}
            overrides={{BaseButton: MinimalButton}}
          />
        </ButtonRowItem>
      </ButtonRow>
      <ButtonTypeLabel>End Enhancer</ButtonTypeLabel>
      <ButtonRow>
        <ButtonRowItem>
          <Button label="Primary" endEnhancer={CloudComponent} />
        </ButtonRowItem>
        <ButtonRowItem>
          <Button
            label="Secondary"
            endEnhancer={CloudComponent}
            overrides={{BaseButton: SecondaryButton}}
          />
        </ButtonRowItem>
        <ButtonRowItem>
          <Button
            label="Tertiary"
            endEnhancer={CloudComponent}
            overrides={{BaseButton: TertiaryButton}}
          />
        </ButtonRowItem>
        <ButtonRowItem>
          <Button
            label="Minimal"
            endEnhancer={CloudComponent}
            overrides={{BaseButton: MinimalButton}}
          />
        </ButtonRowItem>
      </ButtonRow>
    </ButtonContainer>
  ));
