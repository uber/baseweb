import {parseOverrides} from '../custom-props';
import {toggleOverrideSharedProps} from '../ast';

describe('parseOverrides', () => {
  test('get overrides active state and value', () => {
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
    expect(parseOverrides(overrides, ['Root'])).toEqual({
      Root: {
        active: true,
        style: `({ $theme }) => {
  return {
    outline: \`\${\$theme.colors.warning200} solid\`,
    backgroundColor: $theme.colors.warning200
  };
}`,
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
