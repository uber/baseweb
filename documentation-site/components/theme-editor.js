/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env browser */

import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
  styled,
  createTheme,
  DarkTheme,
  DarkThemeMove,
  LightTheme,
  LightThemeMove,
} from 'baseui';
import {FormControl} from 'baseui/form-control';
import {StatefulInput as Input} from 'baseui/input';
import {Button, KIND} from 'baseui/button';
import {Block} from 'baseui/block';
import {H1} from 'baseui/typography';
import {Accordion, StatefulPanel as Panel} from 'baseui/accordion';

const Container = styled('div', ({$theme, $open}) => ({
  backgroundColor: $theme.colors.background,
  filter: 'drop-shadow(0 0 10px #eee)',
  padding: $theme.sizing.scale500,
  position: 'fixed',
  right: 0,
  top: '100px',
  transform: `translate(${$open ? 0 : '100%'})`,
  transition: `transform ${$theme.animation.timing100}`,
  width: '300px',
  zIndex: 2,
}));

const ThemeForm = styled('div', {
  maxHeight: '60vh',
  overflow: 'auto',
});

const HiddenFormElement = styled('a', () => ({
  display: 'none',
  visibility: 'hidden',
}));

const copyToClipboard = theme => {
  const faker = document.createElement('textarea');
  faker.value = JSON.stringify(theme);
  faker.readonly = true;
  faker.style = {
    ...faker.style,
    left: '100%',
    position: 'absolute',
    visibility: 'hidden',
  };
  document.body.appendChild(faker);
  faker.select();
  document.execCommand('copy');
  document.body.removeChild(faker);
};

const exportToJSON = (anchor, theme) => {
  anchor.setAttribute('download', 'baseweb.json');
  anchor.setAttribute(
    'href',
    `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(theme))}`,
  );
  anchor.click();
};

const THEME_MAP = {
  'dark-theme': createTheme({}, DarkTheme),
  'light-theme': createTheme({}, LightTheme),
  'dark-theme-with-move': createTheme({}, DarkThemeMove),
  'light-theme-with-move': createTheme({}, LightThemeMove),
};

const ThemeEditor = ({current, setTheme, resetTheme}) => {
  const editedTheme = useRef(null);
  const resetButton = useRef(null);
  const fileReader = useRef(null);
  const importer = useRef(null);
  const exporter = useRef(null);
  const [open, setOpen] = useState(false);

  const updateTheme = ({target: {name, value}}) => {
    resetButton.current.removeAttribute('disabled');
    const keys = name.split('.');
    keys.reduce(function(o, s, i) {
      return (o[s] = i === keys.length - 1 ? value : o[s]);
    }, editedTheme.current);
  };

  const copy = () => {
    copyToClipboard(JSON.stringify(editedTheme.current));
  };

  const reset = () => {
    resetButton.current.setAttribute('disabled', true);
    resetTheme();
  };

  const exportTheme = () => {
    exportToJSON(exporter.current, editedTheme.current);
  };

  const update = () => {
    setTheme(editedTheme.current);
  };

  const syncReset = () => {
    if (JSON.stringify(THEME_MAP[current.name]) === JSON.stringify(current)) {
      resetButton.current.setAttribute('disabled', true);
    } else {
      resetButton.current.removeAttribute('disabled');
    }
  };

  const importTheme = e => {
    const file = e.target.files[0];
    if (
      window.File &&
      window.FileReader &&
      window.FileList &&
      window.Blob &&
      (file.type.match('application/json') || file.name.indexOf('.json') !== -1)
    ) {
      if (!fileReader.current) {
        fileReader.current = new FileReader();
        fileReader.current.onloadend = e => {
          editedTheme.current = createTheme(
            {},
            {
              ...THEME_MAP[current.name],
              ...JSON.parse(e.target.result),
              name: current.name,
            },
          );
          importer.current.value = null;
          update();
        };
      }
      fileReader.current.readAsText(file);
    }
  };

  useEffect(
    () => {
      syncReset();
      // Quickest way to deep clone?
      editedTheme.current = createTheme({}, current);
    },
    [current],
  );

  const renderForm = (theme, parent) => {
    return (
      <Fragment>
        {Object.entries(theme).map(([key, value]) => {
          if (key === 'name') return null;
          if (typeof value === 'string' || typeof value === 'number') {
            const id = `theme-control-${key}-${value}`;
            return (
              <FormControl key={id} label={key}>
                <Input
                  name={`${parent ? parent : ''}.${key}`}
                  onChange={updateTheme}
                  type={typeof value === 'string' ? 'text' : 'number'}
                  initialState={{value}}
                />
              </FormControl>
            );
          }
          if (typeof value === 'object') {
            return (
              <Panel
                key={key}
                title={key}
                overrides={{
                  Header: {
                    style: {
                      width: '100%',
                    },
                  },
                  Content: {
                    style: ({$theme}) => ({
                      backgroundColor: $theme.colors.background,
                      width: '100%',
                    }),
                  },
                }}
              >
                {renderForm(theme[key], parent ? `${parent}.${key}` : key)}
              </Panel>
            );
          }
        })}
      </Fragment>
    );
  };

  return (
    <Container $open={open}>
      <HiddenFormElement
        $as="input"
        $ref={importer}
        type="file"
        onChange={importTheme}
      />
      <HiddenFormElement $ref={exporter} />
      <Button
        kind={KIND.minimal}
        overrides={{
          BaseButton: {
            style: ({$theme}) => ({
              backgroundColor: $theme.colors.background,
              position: 'absolute',
              height: $theme.sizing.scale1200,
              width: $theme.sizing.scale1200,
              top: 0,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              right: '100%',
              ':hover': {
                backgroundColor: $theme.colors.background,
              },
              ':focus': {
                backgroundColor: $theme.colors.background,
              },
              ':active': {
                backgroundColor: $theme.colors.background,
              },
            }),
          },
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? 'X' : 'T'}
      </Button>
      <H1
        overrides={{
          Block: {
            style: ({$theme}) => ({
              paddingLeft: $theme.sizing.scale700,
              ...$theme.typography.font450,
              textAlign: 'center',
            }),
          },
        }}
      >{`Edit ${current.name}`}</H1>
      <ThemeForm>
        <Accordion>{renderForm(current)}</Accordion>
      </ThemeForm>
      <Block
        overrides={{
          Block: {
            style: ({$theme}) => ({
              padding: $theme.sizing.scale700,
            }),
          },
        }}
      >
        <Button onClick={update}>Update</Button>
        <Button
          overrides={{
            BaseButton: {
              props: {
                $ref: resetButton,
              },
            },
          }}
          onClick={reset}
        >
          Reset
        </Button>
        <Button onClick={copy}>Copy</Button>
        <Button onClick={exportTheme}>Export</Button>
        <Button onClick={() => importer.current.click()}>Import</Button>
      </Block>
    </Container>
  );
};

export default ThemeEditor;
