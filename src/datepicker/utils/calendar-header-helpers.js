/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {OptionT} from './types.js';
import {DEFAULT_MONTHS} from '../constants.js';

type GetMonthItemsArgsT = {
  filterMonthsList: number[] | null,
  formatMonthLabel: number => string,
};

const getDefaultMonthItems = (
  defaultMonths: number[],
  formatMonthLabel: number => string,
) =>
  defaultMonths.map<OptionT>(month => ({
    id: month.toString(),
    label: formatMonthLabel(month),
  }));

const filterMonthItems = (monthItems: OptionT[], filterList: number[]) =>
  monthItems.map<OptionT>(month => {
    if (!filterList.includes(Number(month.id))) {
      return {
        ...month,
        disabled: true,
      };
    }
    return month;
  });

export const getMonthItems = ({
  filterMonthsList,
  formatMonthLabel,
}: GetMonthItemsArgsT) => {
  let monthItems = getDefaultMonthItems(DEFAULT_MONTHS, formatMonthLabel);

  if (filterMonthsList) {
    monthItems = filterMonthItems(monthItems, filterMonthsList);
  }

  return monthItems;
};
