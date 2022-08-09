/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import { parseOverrides } from '../custom-props';
import { toggleOverrideSharedProps } from '../ast';

describe('parseOverrides', () => {
  test('get overrides active state and value', () => {
    const overrides = `{
      Root: {
        style: ({ $theme }) => ({
          outline: \`\${$theme.colors.warning200} solid\`,
          backgroundColor: $theme.colors.warning200
        })
      },
      Tag: {
        props: {
          overrides: {
            Action: {
              style: ({ $theme }) => ({
                outline: \`\${$theme.colors.warning200} dashed\`,
                backgroundColor:
                  $theme.colors.warning200
              })
            }
          }
        }
      }
    }`;
    expect(parseOverrides(overrides)).toEqual({
      Root: {
        active: true,
        style: `({ $theme }) => ({
  outline: \`\${$theme.colors.warning200} solid\`,
  backgroundColor: $theme.colors.warning200
})`,
      },
      Tag: {
        active: true,
        nestedValue: {
          Action: {
            active: true,
            style: `({ $theme }) => ({
  outline: \`\${$theme.colors.warning200} dashed\`,
  backgroundColor: $theme.colors.warning200
})`,
          },
        },
      },
    });
  });
});

describe('toggleOverrideSharedProps', () => {
  test('adding them', () => {
    const overrides = `{
    Root: {
      style: ({ $theme }) => {
        return {
          outline: \`\${$theme.colors.warning200} solid\`,
          backgroundColor: $theme.colors.warning200
        };
      }
    }
  }`;
    expect(toggleOverrideSharedProps(overrides, ['$isActive'])).toEqual(`({
  $theme,
  $isActive
}) => {
  return {
    outline: \`\${$theme.colors.warning200} solid\`,
    backgroundColor: $theme.colors.warning200
  };
}`);
  });

  test('removing them', () => {
    const overrides = `{
    Root: {
      style: ({ $theme, $isActive }) => {
        return {
          outline: \`\${$theme.colors.warning200} solid\`,
          backgroundColor: $theme.colors.warning200
        };
      }
    }
  }`;
    expect(toggleOverrideSharedProps(overrides, ['$isActive'])).toEqual(`({
  $theme
}) => {
  return {
    outline: \`\${$theme.colors.warning200} solid\`,
    backgroundColor: $theme.colors.warning200
  };
}`);
  });
});
