import { LightTheme } from '../light-theme';
import createLightTheme from '../create-light-theme';

describe('createLightTheme', () => {
  test('without any overrides, returns the same value as LightTheme variable', () => {
    expect(createLightTheme()).toEqual(LightTheme);
  });

  test('ensure property `name` is populated', () => {
    expect(createLightTheme().name).toEqual('light-theme');
  });
});
