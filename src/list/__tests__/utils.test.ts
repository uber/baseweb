import { artworkSizeToValue } from '../utils';
import { ARTWORK_SIZES } from '../constants';

describe('artworkSizeToValue', () => {
  describe('when isSublist is true', () => {
    it('returns 24 when artworkSize is LARGE', () => {
      expect(artworkSizeToValue(ARTWORK_SIZES.LARGE, true)).toBe(24);
    });

    it('returns 16 when artworkSize is not LARGE', () => {
      expect(artworkSizeToValue(ARTWORK_SIZES.SMALL, true)).toBe(16);
    });
  });

  describe('when isSublist is false', () => {
    it('returns 16 when artworkSize is SMALL', () => {
      expect(artworkSizeToValue(ARTWORK_SIZES.SMALL, false)).toBe(16);
    });

    it('returns 24 when artworkSize is MEDIUM', () => {
      expect(artworkSizeToValue(ARTWORK_SIZES.MEDIUM, false)).toBe(24);
    });

    it('returns 36 when artworkSize is LARGE', () => {
      expect(artworkSizeToValue(ARTWORK_SIZES.LARGE, false)).toBe(36);
    });
  });
});
