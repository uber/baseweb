/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow
import * as t from '@babel/types';
import {withJsFiles} from '@dubstep/core';

const THEME_TYPOGRAPHY_MAP = {
  font100: 'font100',
  font200: 'font100',
  font250: 'font150',
  font300: 'font200',
  font350: 'font250',
  font400: 'font300',
  font450: 'font350',
  font460: 'font400',
  font470: 'font450',
  font500: 'font550',
  font600: 'font650',
  font700: 'font750',
  font800: 'font1050',
  font900: 'font1350',
  font1000: 'font1350',
  font1100: 'font1450',
};

const THEME_COLOR_MAP = {
  mono100: 'white',
  mono200: 'mono50',
  mono300: 'mono100',
  mono400: 'mono200',
  mono500: 'mono300',
  mono600: 'mono400',
  mono700: 'mono500',
  mono800: 'mono600',
  mono900: 'mono700',
  mono1000: 'black',
};

const THEME_MAP = {
  ...THEME_TYPOGRAPHY_MAP,
  ...THEME_COLOR_MAP,
};

const OLD_TYPOGRAPHY_COMPONENTS = [
  'Display',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'Label1',
  'Label2',
  'Paragraph1',
  'Paragraph2',
];

const COMPONENT_MAP = {
  Display: 'Display1',
  Label1: 'Label3',
  Paragraph1: 'Paragraph3',
  Caption1: 'Paragraph4',
  Caption2: 'Label4',
};

const CAPTIONS = ['Caption1', 'Caption2'];

async function codemod(options: {dir: string}) {
  await withJsFiles(`${options.dir}/**/*.js`, async path => {
    path.traverse({
      JSXOpeningElement(path) {
        if (CAPTIONS.includes(path.node.name.name)) {
          // Captions are deprecated in favor of Paragraph4 and Label4.
          // Captions used to have a lower contrast color via `colorSecondary`.
          // We can try to update the `color` prop to keep this color consistent.
          // If the `color` prop is already set though we should leave it as is.
          let shouldSetCaptionColor = true;
          path.traverse({
            JSXIdentifier(path) {
              // If `color` is already set, don't change it...
              if (path.node.name === 'color') shouldSetCaptionColor = false;
            },
          });
          if (shouldSetCaptionColor) {
            const colorAttribute = t.jsxAttribute(
              t.jsxIdentifier('color'),
              t.StringLiteral('colorSecondary'),
            );
            path.node.attributes.push(colorAttribute);
          }
        }
      },
      JSXIdentifier(path) {
        // `Block` and typography components accept `font` and `color` props which need to be updated...
        if (
          path.node.name === 'Block' ||
          OLD_TYPOGRAPHY_COMPONENTS.includes(path.node.name)
        ) {
          path.parentPath.traverse({
            JSXIdentifier(path) {
              if (path.node.name === 'font' || path.node.name === 'color') {
                path.parentPath.traverse({
                  StringLiteral(path) {
                    const newValue = THEME_MAP[path.node.value];
                    if (newValue) path.node.value = newValue;
                  },
                });
              }
            },
          });
        }
        // Update typography components based on mapping
        if (Object.keys(COMPONENT_MAP).includes(path.node.name)) {
          path.node.name = COMPONENT_MAP[path.node.name];
        }
      },
      Identifier(path) {
        if (Object.keys(THEME_MAP).includes(path.node.name)) {
          const newValue = THEME_MAP[path.node.name];
          if (newValue) path.node.name = newValue;
        }
      },
      ImportDeclaration(path) {
        path.traverse({
          StringLiteral(path) {
            if (path.node.value === 'baseui/typography') {
              path.parentPath.traverse({
                ImportSpecifier(path) {
                  if (
                    Object.keys(COMPONENT_MAP).includes(path.node.imported.name)
                  ) {
                    const newName = COMPONENT_MAP[path.node.imported.name];
                    const hasLocalAlias =
                      path.node.imported.name !== path.node.local.name;

                    if (
                      CAPTIONS.includes(path.node.imported.name) &&
                      hasLocalAlias
                    ) {
                      const localAlias = path.node.local.name;
                      path.parentPath.parentPath.traverse({
                        JSXOpeningElement(path) {
                          if (path.node.name.name === localAlias) {
                            // Captions are deprecated in favor of Paragraph4 and Label4.
                            // Captions used to have a lower contrast color via `colorSecondary`.
                            // We can try to update the `color` prop to keep this color consistent.
                            // If the `color` prop is already set though we should leave it as is.
                            let shouldSetCaptionColor = true;
                            path.traverse({
                              JSXIdentifier(path) {
                                // If `color` is already set, don't change it...
                                if (path.node.name === 'color')
                                  shouldSetCaptionColor = false;
                              },
                            });
                            if (shouldSetCaptionColor) {
                              const colorAttribute = t.jsxAttribute(
                                t.jsxIdentifier('color'),
                                t.StringLiteral('colorSecondary'),
                              );
                              path.node.attributes.push(colorAttribute);
                            }
                          }
                        },
                      });
                    }

                    path.node.imported.name = newName;
                    if (!hasLocalAlias) path.node.local.name = newName;
                  }
                },
              });
            }
          },
        });
      },
    });
  });
}

export default codemod;
