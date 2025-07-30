import { getBackgroundColorType } from '../utils';
import { primitiveColors as colors } from '../../tokens';
import { BACKGROUND_COLOR_TYPE } from '../constants';

let __DEV__ = true;
global.__DEV__ = __DEV__;

jest.spyOn(console, 'warn').mockImplementation(() => {});

describe('getBackgroundColorType', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when __DEV__ is true', () => {
    beforeEach(() => {
      __DEV__ = true;
      global.__DEV__ = __DEV__;
    });

    it('should return BACKGROUND_COLOR_TYPE.light for colors in LIGHT_COLORS', () => {
      const lightColors = [colors.red50, colors.green100, colors.blue200, colors.gray400];

      lightColors.forEach((color) => {
        expect(getBackgroundColorType(color)).toBe(BACKGROUND_COLOR_TYPE.light);
      });
    });

    it('should return BACKGROUND_COLOR_TYPE.dark for colors in DARK_COLORS', () => {
      const darkColors = [colors.red700, colors.green800, colors.blue900, colors.black];

      darkColors.forEach((color) => {
        expect(getBackgroundColorType(color)).toBe(BACKGROUND_COLOR_TYPE.dark);
      });
    });

    it('should return null and warn for colors in POOR_CONTRAST_COLORS', () => {
      const poorContrastColors = [colors.gray500, colors.red500, colors.blue500];

      poorContrastColors.forEach((color) => {
        expect(getBackgroundColorType(color)).toBeNull();
        expect(console.warn).toHaveBeenCalledWith(
          expect.stringContaining('The provided value for backgroundColor')
        );
      });
    });
  });

  describe('when __DEV__ is false', () => {
    beforeEach(() => {
      __DEV__ = false;
      global.__DEV__ = __DEV__;
    });

    it('should return null without warning for colors in POOR_CONTRAST_COLORS', () => {
      const poorContrastColors = [colors.gray500, colors.red500, colors.blue500];

      poorContrastColors.forEach((color) => {
        expect(getBackgroundColorType(color)).toBeNull();
        expect(console.warn).not.toHaveBeenCalled();
      });
    });
  });

  it('should return null for colors not in any predefined sets', () => {
    const unknownColors = ['#123456', '#abcdef', '#0000ff'];

    unknownColors.forEach((color) => {
      expect(getBackgroundColorType(color)).toBeNull();
    });
  });
});
