/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

// baseui imports
import {
  useStyletron,
  createTheme,
  lightThemePrimitives,
  darkThemePrimitives,
  ThemeProvider,
} from 'baseui';
import {Card} from 'baseui/card';
import {Spinner} from 'baseui/spinner';
import {useRouter} from 'next/router';

import {useView, Compiler, Error} from 'react-view';

// yard (baseweb customization of react-view)
import {getProvider, getThemeFromContext, TProviderValue} from './provider';
import {customProps, TCustomPropFields} from './custom-props';
import ThemeEditor from './theme-editor';
import Overrides from './overrides';
import Editor from './editor';
import ActionButtons from './action-buttons';
import Knobs from './knobs';
import {YardTabs, YardTab} from './styled-components';
import {countProps, countOverrides, countThemeValues} from './utils';
import PropsTooltip from './props-tooltip';
import {TYardProps} from './types';

const Yard: React.FC<TYardProps> = ({
  componentName,
  placeholderHeight,
  scope,
  props,
  theme,
  imports,
  queryStringName,
  mapTokensToProps,
}) => {
  const [css, baseTheme] = useStyletron();
  const componentTheme = getThemeFromContext(baseTheme, theme);
  const themePrimitives =
    baseTheme.name && baseTheme.name.startsWith('dark-theme')
      ? 'darkThemePrimitives'
      : 'lightThemePrimitives';
  const provider = getProvider(componentTheme, themePrimitives);
  const {query, push, pathname} = useRouter();

  const initialCode = (typeof queryStringName !== 'undefined'
    ? query[queryStringName]
    : query.code) as string;

  const params = useView<TProviderValue, TCustomPropFields>({
    componentName,
    props,
    scope: {
      ...scope,
      ThemeProvider,
      lightThemePrimitives,
      darkThemePrimitives,
      createTheme,
    },
    imports,
    provider,
    customProps,
    initialCode,
    onUpdate: ({code}) => {
      const query = queryStringName || 'code';
      push({
        pathname,
        query: {
          [query]: code,
        },
      });
    },
  });

  const activeProps = countProps(params.knobProps.state, props);
  const activeOverrides = countOverrides(params.knobProps.state.overrides);
  const activeThemeValues = countThemeValues(params.providerValue);

  const showOverrides =
    props.overrides.custom.names && props.overrides.custom.names.length > 0;
  const showTheme = theme.length > 0;
  return (
    <Card>
      <Compiler
        {...params.compilerProps}
        minHeight={placeholderHeight}
        placeholder={() => (
          <div
            className={css({
              height: `${placeholderHeight}px`,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            })}
          >
            <Spinner size={placeholderHeight > 50 ? 50 : placeholderHeight} />
          </div>
        )}
      />
      <Error msg={params.errorProps.msg} isPopup />
      {showOverrides || showTheme ? (
        <YardTabs>
          <YardTab title={`Props${activeProps > 0 ? ` (${activeProps})` : ''}`}>
            <Knobs {...params.knobProps} />
          </YardTab>
          {showOverrides && (
            <YardTab
              title={`Style Overrides${
                activeOverrides > 0 ? ` (${activeOverrides})` : ''
              }`}
            >
              <Overrides
                componentName={componentName}
                componentConfig={props}
                overrides={params.knobProps.state.overrides}
                set={(propValue: any) => {
                  params.knobProps.set(propValue, 'overrides');
                }}
              />
            </YardTab>
          )}
          {showTheme && (
            <YardTab
              title={`Theme ${
                activeThemeValues > 0 ? `(${activeThemeValues})` : ''
              }`}
            >
              <ThemeEditor
                theme={params.providerValue || {}}
                themeInit={componentTheme}
                set={params.actions.updateProvider}
                componentName={componentName}
              />
            </YardTab>
          )}
        </YardTabs>
      ) : (
        <Knobs {...params.knobProps} />
      )}
      <Editor
        {...params.editorProps}
        transformToken={tokenProps => {
          const token = tokenProps.children.trim();
          if (mapTokensToProps && mapTokensToProps[token]) {
            return (
              <PropsTooltip
                {...tokenProps}
                typeDefinition={mapTokensToProps[token]}
              />
            );
          }
          return <span {...tokenProps} />;
        }}
      />
      <Error {...params.errorProps} />
      <ActionButtons
        {...params.actions}
        code={params.editorProps.code}
        componentName={componentName}
        importsConfig={imports}
      />
    </Card>
  );
};

export default Yard;
