/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {shallow} from 'enzyme';
import {
  StyledRoot,
  StyledCalendarContainer,
  StyledHeader,
  StyledMonthHeader,
  StyledMonth,
  StyledWeek,
  StyledDay,
} from '../index.js';
import {calculateBorderRadius as calcRadius} from '../styled-components.js';

const styledComponents = [
  [StyledRoot, 'StyledRoot'],
  [StyledCalendarContainer, 'StyledCalendarContainer'],
  [StyledHeader, 'StyledHeader'],
  [StyledMonthHeader, 'StyledMonthHeader'],
  [StyledMonth, 'StyledMonth'],
  [StyledWeek, 'StyledWeek'],
  [StyledDay, 'StyledDay'],
];

const props = [
  ['$disabled'],
  ['$isHighlighted'],
  ['$isHovered'],
  ['$outsideMonth'],
  ['$selected'],
];

describe('Component styled components', () => {
  test.each(styledComponents)('Basic render', (Component, name) => {
    const component = shallow(<Component />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `${name} has correct styles`,
    );
  });

  test.each(props)('Prop based styles', prop => {
    const component = shallow(<StyledDay {...{[prop]: true}} />);
    expect(component.instance().getStyles()).toMatchSnapshot(
      `StyledDay has correct styles when ${prop} is set to true`,
    );
  });
});

describe('Border radius calculation', () => {
  function getProps(overrides: any) {
    return {
      $date: new Date(),
      $isHighlighted: false,
      $pseudoHighlighted: false,
      $pseudoSelected: false,
      $selected: false,
      $startDate: false,
      $isRange: true,
      $hasRangeHighlighted: false,
      $hasRangeOnRight: false,
      $hasRangeSelected: false,
      $theme: {
        borders: {
          useRoundedCorners: true,
          radius200: '4px',
        },
      },
      ...overrides,
    };
  }

  type BorderRadiusT = {
    borderTopLeftRadius: string | number,
    borderBottomLeftRadius: string | number,
    borderTopRightRadius: string | number,
    borderBottomRightRadius: string | number,
  };

  function toStrVal(obj: ?BorderRadiusT) {
    return obj
      ? `${obj.borderTopLeftRadius} ${obj.borderTopRightRadius} ${
          obj.borderBottomRightRadius
        } ${obj.borderBottomLeftRadius}`
      : null;
  }

  test('isRange and useRoundedCorners', () => {
    expect(toStrVal(calcRadius(getProps()))).toEqual('4px 4px 4px 4px');
  });
  test('!useRoundedCorners', () => {
    // !useRoundedCorners
    expect(
      toStrVal(
        calcRadius(
          getProps({
            $theme: {
              borders: {useRoundedCorners: false, radius200: '4px'},
            },
          }),
        ),
      ),
    ).toEqual('0 0 0 0');
  });
  test('$selected', () => {
    // $selected
    expect(toStrVal(calcRadius(getProps({$selected: true})))).toEqual(
      '4px 4px 4px 4px',
    );
  });
  test('$selected and !isRange', () => {
    // $selected/!$isRange
    expect(
      toStrVal(calcRadius(getProps({$selected: true, $isRange: false}))),
    ).toEqual('4px 4px 4px 4px');
  });
  test('$selected, $hasRangeSelected, and $startDate', () => {
    // $selected/$hasRangeSelected/$startDate
    expect(
      toStrVal(
        calcRadius(
          getProps({
            $selected: true,
            $hasRangeSelected: true,
            $startDate: true,
          }),
        ),
      ),
    ).toEqual('4px 0 0 4px');
  });
  test('$selected, $hasRangeSelected, and !$startDate (endDate)', () => {
    // $selected/$hasRangeSelected/!$startDate(means endDate)
    expect(
      toStrVal(
        calcRadius(
          getProps({
            $selected: true,
            $hasRangeSelected: true,
          }),
        ),
      ),
    ).toEqual('0 4px 4px 0');
  });
  test('$selected, $hasRangeHighlighted, and $hasRangeOnRight', () => {
    // $selected/$hasRangeHighlighted/$hasRangeOnRight
    expect(
      toStrVal(
        calcRadius(
          getProps({
            $selected: true,
            $hasRangeHighlighted: true,
            $hasRangeOnRight: true,
          }),
        ),
      ),
    ).toEqual('4px 0 0 4px');
  });
  test('$selected, $hasRangeHighlighted, and !$hasRangeOnRight(heighlighted range is on the left)', () => {
    // $selected/$hasRangeHighlighted/!$hasRangeOnRight(means heighlighted range is on the left)
    expect(
      toStrVal(
        calcRadius(
          getProps({
            $selected: true,
            $hasRangeHighlighted: true,
          }),
        ),
      ),
    ).toEqual('0 4px 4px 0');
  });
  test('$pseudoHighlighted', () => {
    expect(toStrVal(calcRadius(getProps({$pseudoHighlighted: true})))).toEqual(
      '0 0 0 0',
    );
  });
  test('$pseudoSelected', () => {
    expect(toStrVal(calcRadius(getProps({$pseudoSelected: true})))).toEqual(
      '0 0 0 0',
    );
  });
  test('$isHighlighted and !$isRange', () => {
    expect(
      toStrVal(calcRadius(getProps({$isHighlighted: true, $isRange: false}))),
    ).toEqual('4px 4px 4px 4px');
  });
  test('$isHighlighted and $hasRangeHighlighted', () => {
    expect(
      toStrVal(
        calcRadius(
          getProps({$isHighlighted: true, $hasRangeHighlighted: true}),
        ),
      ),
    ).toEqual('4px 0 0 4px');
  });
  test('$isHighlighted, $hasRangeHighlighted, and $hasRangeOnRight', () => {
    expect(
      toStrVal(
        calcRadius(
          getProps({
            $isHighlighted: true,
            $hasRangeHighlighted: true,
            $hasRangeOnRight: true,
          }),
        ),
      ),
    ).toEqual('0 4px 4px 0');
  });
  test('$isHighlighted and $pseudoSelected', () => {
    expect(
      toStrVal(
        calcRadius(
          getProps({
            $isHighlighted: true,
            $pseudoSelected: true,
          }),
        ),
      ),
    ).toEqual('0 0 0 0');
  });
  test('$isHighlighted', () => {
    expect(
      toStrVal(
        calcRadius(
          getProps({
            $isHighlighted: true,
          }),
        ),
      ),
    ).toEqual('4px 4px 4px 4px');
  });
});
