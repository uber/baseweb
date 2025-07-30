import { groupedOptionsToArray } from '../utils';
import type { Optgroups, Value } from '../types';

describe('groupedOptionsToArray', () => {
  it('should convert grouped options to a flat array with __optgroup property', () => {
    const groupedOptions: Optgroups = {
      Group1: [
        { id: 1, label: 'Option 1' },
        { id: 2, label: 'Option 2' },
      ],
      Group2: [{ id: 3, label: 'Option 3' }],
    };

    const expected: Value = [
      { id: 1, label: 'Option 1', __optgroup: 'Group1' },
      { id: 2, label: 'Option 2', __optgroup: 'Group1' },
      { id: 3, label: 'Option 3', __optgroup: 'Group2' },
    ];

    const result = groupedOptionsToArray(groupedOptions);

    expect(result).toEqual(expected);
  });

  it('should handle empty grouped options', () => {
    const groupedOptions: Optgroups = {};

    const expected: Value = [];

    const result = groupedOptionsToArray(groupedOptions);

    expect(result).toEqual(expected);
  });

  it('should handle ungrouped options under __ungrouped', () => {
    const groupedOptions: Optgroups = {
      __ungrouped: [
        { id: 4, label: 'Option 4' },
        { id: 5, label: 'Option 5' },
      ],
    };

    const expected: Value = [
      { id: 4, label: 'Option 4', __optgroup: '__ungrouped' },
      { id: 5, label: 'Option 5', __optgroup: '__ungrouped' },
    ];

    const result = groupedOptionsToArray(groupedOptions);

    expect(result).toEqual(expected);
  });
});
