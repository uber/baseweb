import {formatBabelError} from '../utils';

describe('formatBabelError', () => {
  test('decrease the line number by one', () => {
    const source = `SyntaxError: Unexpected token, expected "jsxTagEnd" (10:5)`;
    expect(formatBabelError(source)).toBe(
      `SyntaxError: Unexpected token, expected "jsxTagEnd" (9:5)`,
    );
  });

  test('make all adjustments', () => {
    const source = `SyntaxError: Unexpected token, expected "jsxTagEnd" (3:17)
  1 | /* @babel/template */;
  2 | <><Tab title="Tab Link 1">
> 3 |   Content 1</Tab /></>
    |                 ^`;
    expect(formatBabelError(source))
      .toBe(`SyntaxError: Unexpected token, expected "jsxTagEnd" (2:17)
  
  1 | <Tab title="Tab Link 1">
> 2 |   Content 1</Tab />
    |                 ^`);
  });
});
