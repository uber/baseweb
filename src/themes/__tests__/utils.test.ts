import { getFoundationColorOverrides } from '../utils';

describe('getFoundationColorOverrides', () => {
  it('should return an object with foundation colors present in colors', () => {
    const colors = {
      primaryA: '#FFFFFF',
      primaryB: '#000000',
      primary: '#FF0000',
      accent: '#00FF00',
      negative: '#0000FF',
      warning: '#FFFF00',
      positive: '#00FFFF',
    };
    expect(getFoundationColorOverrides(colors)).toEqual(colors);
  });

  it('should return only foundation colors when colors contain both foundation and non-foundation keys', () => {
    const colors = {
      primaryA: '#FFFFFF',
      primaryB: '#000000',
      extraColor1: '#ABCDEF',
      extraColor2: '#FEDCBA',
    };
    const expected = {
      primaryA: '#FFFFFF',
      primaryB: '#000000',
    };
    expect(getFoundationColorOverrides(colors)).toEqual(expected);
  });

  it('should return an empty object when colors contain only non-foundation keys', () => {
    const colors = {
      extraColor1: '#ABCDEF',
      extraColor2: '#FEDCBA',
    };
    expect(getFoundationColorOverrides(colors)).toEqual({});
  });
});
