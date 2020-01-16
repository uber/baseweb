/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
/* eslint-disable no-prototype-builtins */
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
  font800: 'font850',
  font900: 'font950',
  font1000: 'font1050',
  font1100: 'font1450',
};

const COMPONENT_TYPOGRAPHY_MAP = {
  Display: 'Display1',
  Label1: 'Label3',
  Paragraph1: 'Paragraph3',
  Caption1: 'Paragraph4',
  Caption2: 'Label4',
};

const CAPTIONS = ['Caption1', 'Caption2'];

// Captions set the `color` prop on the underlying `Block` (`color="contentSecondary"`).
// We will try to update the `color` prop so that when the component is updated
// the "contentSecondary" color will still be applied.
function updateCaptionColorAttributes(path, localAlias = null) {
  path.traverse({
    JSXOpeningElement(path) {
      // If we find a Caption or the local alias for a Caption...
      if (
        localAlias === path.node.name.name ||
        CAPTIONS.includes(path.node.name.name)
      ) {
        let shouldSetCaptionColor = true;
        // Check if the color prop is already set.
        path.traverse({
          JSXIdentifier(path) {
            // We don't want to override anything already set.
            if (path.node.name === 'color') shouldSetCaptionColor = false;
          },
        });
        if (shouldSetCaptionColor) {
          // Create a new JSX attribute...
          const colorAttribute = t.jsxAttribute(
            t.jsxIdentifier('color'),
            t.StringLiteral('contentSecondary'),
          );
          // Add it to the opening element.
          path.node.attributes.push(colorAttribute);
        }
      }
    },
  });
}

function updateFontAttributes(path) {
  path.traverse({
    JSXIdentifier(path) {
      if (path.node.name === 'font') {
        path.parentPath.traverse({
          StringLiteral(path) {
            const newValue = THEME_TYPOGRAPHY_MAP[path.node.value];
            if (newValue) path.node.value = newValue;
          },
        });
      }
    },
  });
}

function updateTypographyComponents(path) {
  path.traverse({
    JSXIdentifier(path) {
      if (COMPONENT_TYPOGRAPHY_MAP.hasOwnProperty(path.node.name)) {
        path.node.name = COMPONENT_TYPOGRAPHY_MAP[path.node.name];
      }
    },
  });
}

function updateFontIdentifiers(path) {
  path.traverse({
    Identifier(path) {
      if (THEME_TYPOGRAPHY_MAP.hasOwnProperty(path.node.name)) {
        const newValue = THEME_TYPOGRAPHY_MAP[path.node.name];
        if (newValue) path.node.name = newValue;
      }
    },
  });
}

function updateTypographyComponentImports(path) {
  path.traverse({
    ImportDeclaration(path) {
      path.traverse({
        StringLiteral(path) {
          if (path.node.value === 'baseui/typography') {
            path.parentPath.traverse({
              ImportSpecifier(path) {
                if (
                  COMPONENT_TYPOGRAPHY_MAP.hasOwnProperty(
                    path.node.imported.name,
                  )
                ) {
                  const newName =
                    COMPONENT_TYPOGRAPHY_MAP[path.node.imported.name];
                  const hasLocalAlias =
                    path.node.imported.name !== path.node.local.name;

                  if (
                    CAPTIONS.includes(path.node.imported.name) &&
                    hasLocalAlias
                  ) {
                    updateCaptionColorAttributes(
                      path.parentPath.parentPath,
                      path.node.local.name,
                    );
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
}

async function codemod(options: {dir: string}) {
  await withJsFiles(`${options.dir}/**/*.js`, async path => {
    updateCaptionColorAttributes(path);
    updateFontAttributes(path);
    updateTypographyComponents(path);
    updateFontIdentifiers(path);
    updateTypographyComponentImports(path);
  });
}

export default codemod;
