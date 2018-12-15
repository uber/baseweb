/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {ArrowLeft, ArrowRight} from '../icon/index.js';
import {Select} from '../select/index.js';
import {StyledHeader} from './styled-components.js';
import {
  addMonths,
  getMonth,
  getMonthInLocale,
  getYear,
  monthDisabledBefore,
  monthDisabledAfter,
  setMonth,
  setYear,
  subMonths,
} from './utils/index.js';
import type {HeaderPropsT} from './types.js';

export default class CalendarHeader extends React.Component<HeaderPropsT> {
  static defaultProps = {
    date: new Date(),
    locale: null,
    maxDate: null,
    minDate: null,
    onMonthChange: () => {},
    onYearChange: () => {},
    setActiveState: () => {},
  };

  handleMonthChange = ({value}: {value: Array<{id: number}>}) => {
    this.props.onMonthChange({date: setMonth(this.props.date, value[0].id)});
  };

  handleYearChange = ({value}: {value: Array<{id: number}>}) => {
    this.props.onYearChange({date: setYear(this.props.date, value[0].id)});
  };

  increaseMonth = () => {
    this.props.onMonthChange({date: addMonths(this.props.date, 1)});
  };

  decreaseMonth = () => {
    this.props.onMonthChange({date: subMonths(this.props.date, 1)});
  };

  renderPreviousMonthButton = () => {
    const allPrevDaysDisabled = monthDisabledBefore(
      this.props.date,
      this.props,
    );
    if (allPrevDaysDisabled) {
      return;
    }
    let clickHandler = this.decreaseMonth;
    if (allPrevDaysDisabled) {
      clickHandler = null;
    }
    return (
      <ArrowLeft
        role="button"
        onClick={clickHandler}
        overrides={{Svg: {style: {cursor: 'pointer'}}}}
      />
    );
  };

  renderNextMonthButton = () => {
    const allNextDaysDisabled = monthDisabledAfter(this.props.date, this.props);
    if (allNextDaysDisabled) {
      return;
    }
    let clickHandler = this.increaseMonth;
    if (allNextDaysDisabled) {
      clickHandler = null;
    }
    return (
      <ArrowRight
        role="button"
        onClick={clickHandler}
        overrides={{Svg: {style: {cursor: 'pointer'}}}}
      />
    );
  };

  getSelectOverrides({width}: {width: string}) {
    return {
      ControlContainer: {
        style: props => {
          const {
            $isFocused,
            $isPseudoFocused,
            $theme: {colors},
          } = props;
          return {
            width,
            backgroundColor: colors.primary,
            color: colors.white,
            borderColor:
              $isFocused || $isPseudoFocused ? colors.white : colors.primary,
          };
        },
      },
      IconsContainer: {
        style: {
          paddingRight: '0',
        },
      },
      SelectArrow: {
        style: ({$theme: {colors}}) => ({
          color: 'inherit',
        }),
      },
      ValueContainer: {
        style: ({$theme: {sizing}}) => ({
          paddingTop: '0',
          paddingBottom: '0',
          paddingLeft: sizing.scale200,
          paddingRight: '0',
        }),
      },
      SingleValue: {
        style: ({$theme: {sizing}}) => ({
          paddingTop: '0',
          paddingBottom: '0',
          paddingLeft: sizing.scale200,
          paddingRight: '0',
        }),
      },
    };
  }

  setActive = () => {
    this.props.setActiveState(true);
  };

  setInactive = () => {
    this.props.setActiveState(false);
  };

  renderMonthDropdown() {
    const monthOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(M => ({
      id: M,
      label: getMonthInLocale(M, this.props.locale),
    }));
    return (
      <Select
        onOpen={this.setInactive}
        onClose={this.setActive}
        overrides={this.getSelectOverrides({width: '115px'})}
        clearable={false}
        value={[{id: getMonth(this.props.date)}]}
        maxDropdownHeight={'300px'}
        // $FlowFixMe
        onChange={this.handleMonthChange}
        options={monthOptions}
        searchable={false}
      />
    );
  }

  renderYearDropdown() {
    const minYear = this.props.minDate ? getYear(this.props.minDate) : 1900;
    const maxYear = this.props.maxDate ? getYear(this.props.maxDate) : 2100;
    const yearOptions = [];
    for (let i = minYear; i <= maxYear; i++) {
      yearOptions.push({id: i, label: i});
    }
    return (
      <Select
        onOpen={this.setInactive}
        onClose={this.setActive}
        overrides={this.getSelectOverrides({width: '80px'})}
        clearable={false}
        value={[{id: getYear(this.props.date)}]}
        maxDropdownHeight={'300px'}
        // $FlowFixMe
        onChange={this.handleYearChange}
        options={yearOptions}
        searchable={false}
      />
    );
  }

  render() {
    return (
      <StyledHeader>
        {this.renderPreviousMonthButton()}
        {this.renderMonthDropdown()}
        {this.renderYearDropdown()}
        {this.renderNextMonthButton()}
      </StyledHeader>
    );
  }
}
