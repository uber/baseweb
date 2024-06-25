import { DarkTheme } from '../dark-theme';
import createDarkTheme from '../create-dark-theme';

describe('createDarkTheme', () => {
  test('without any overrides, returns the same value as DarkTheme variable', () => {
    expect(createDarkTheme()).toEqual(DarkTheme);
  });

  test('ensure property `name` is populated', () => {
    expect(createDarkTheme().name).toEqual('dark-theme');
  });
});
