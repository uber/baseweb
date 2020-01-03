/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import memoize from 'memoize-one';
// Files
import {LocaleContext} from '../locale/index.js';
import {ThemeContext} from '../styles/theme-provider.js';
import {Select as BaseSelect} from '../select/index.js';
import {Button, KIND} from '../button/index.js';
import {
  StyledRoot,
  StyledMaxLabel,
  StyledDropdownContainer,
} from './styled-components.js';
import ChevronLeft from '../icon/chevron-left.js';
import ChevronRight from '../icon/chevron-right.js';
import {getOverrides} from '../helpers/overrides.js';
import type {PaginationPropsT} from './types.js';
import type {LocaleT} from '../locale/types.js';

type PageOptionT = {
  label: number,
};

export default class Pagination extends React.PureComponent<PaginationPropsT> {
  static defaultProps = {
    labels: {},
    overrides: {},
  };

  getMenuOptions = memoize((numPages: number) => {
    const menuOptions = [];
    for (let i = 1; i <= numPages; i++) {
      menuOptions.push({label: i});
    }
    return menuOptions;
  });

  onMenuItemSelect = (data: {value: $ReadOnlyArray<PageOptionT>}) => {
    const item = data.value[0];
    const {onPageChange, currentPage} = this.props;
    const page = item.label;
    if (page !== currentPage) {
      onPageChange && onPageChange({nextPage: page, prevPage: currentPage});
    }
  };

  onPrevClick = (event: SyntheticEvent<>) => {
    const {currentPage, onPageChange, onPrevClick} = this.props;
    if (currentPage > 1) {
      onPageChange &&
        onPageChange({nextPage: currentPage - 1, prevPage: currentPage});
      onPrevClick && onPrevClick({event});
    }
  };

  onNextClick = (event: SyntheticEvent<>) => {
    const {currentPage, numPages, onPageChange, onNextClick} = this.props;
    if (currentPage < numPages) {
      onPageChange &&
        onPageChange({nextPage: currentPage + 1, prevPage: currentPage});
      onNextClick && onNextClick({event});
    }
  };

  constructAriaWayfinderLabel = (locale: LocaleT, prefix: string) => {
    const {currentPage, numPages, labels} = this.props;
    return (
      prefix +
      ' ' +
      currentPage +
      ' ' +
      `${
        labels && labels.preposition
          ? labels.preposition
          : locale.pagination.preposition
      }` +
      ' ' +
      numPages
    );
  };

  render() {
    const {overrides = {}, currentPage, labels, numPages} = this.props;

    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [MaxLabel, maxLabelProps] = getOverrides(
      overrides.MaxLabel,
      StyledMaxLabel,
    );
    const [DropdownContainer, dropdownContainerProps] = getOverrides(
      overrides.DropdownContainer,
      StyledDropdownContainer,
    );
    const [Select, selectProps] = getOverrides(overrides.Select, BaseSelect);

    const options = this.getMenuOptions(numPages);

    return (
      <ThemeContext.Consumer>
        {theme => (
          <LocaleContext.Consumer>
            {locale => (
              <Root
                aria-label="pagination"
                data-baseweb="pagination"
                {...rootProps}
              >
                <Button
                  aria-label={this.constructAriaWayfinderLabel(
                    locale,
                    'previous page. current page',
                  )}
                  disabled={currentPage <= 1}
                  onClick={this.onPrevClick}
                  startEnhancer={() => {
                    return theme.direction === 'rtl' ? (
                      <ChevronRight title={''} size={24} />
                    ) : (
                      <ChevronLeft title={''} size={24} />
                    );
                  }}
                  kind={KIND.tertiary}
                  overrides={{
                    BaseButton: overrides.PrevButton,
                  }}
                >
                  {labels && labels.prevButton
                    ? labels.prevButton
                    : locale.pagination.prev}
                </Button>
                <DropdownContainer {...dropdownContainerProps}>
                  <Select
                    options={options}
                    labelKey="label"
                    valueKey="label"
                    onChange={this.onMenuItemSelect}
                    searchable={false}
                    clearable={false}
                    value={[{label: currentPage}]}
                    maxDropdownHeight="200px"
                    overrides={{
                      ControlContainer: {
                        style: ({
                          $theme,
                          $disabled,
                          $isFocused,
                          $isPseudoFocused,
                          $error,
                        }) => ({
                          borderColor: 'transparent',
                          boxShadow: 'none',
                          backgroundColor: $disabled
                            ? $theme.colors.buttonDisabledFill
                            : $isFocused || $isPseudoFocused
                            ? $theme.colors.buttonTertiaryHover
                            : $error
                            ? $theme.colors.negative50
                            : $theme.colors.buttonTertiaryFill,
                        }),
                      },
                      InputContainer: {
                        style: {
                          marginLeft: 0,
                        },
                      },
                      ValueContainer: {
                        style: ({$theme}) => ({
                          flexBasis: 'auto',
                        }),
                      },
                      SingleValue: {
                        style: ({$theme}) => ({
                          position: 'relative',
                          paddingTop: '0',
                          paddingBottom: '0',
                          paddingLeft: $theme.sizing.scale200,
                          paddingRight: $theme.sizing.scale500,
                          color: $theme.colors.buttonTertiaryText,
                          ...$theme.typography.font350,
                        }),
                      },
                      SelectArrow: {
                        style: ({$theme}) => ({
                          width: '24px',
                          height: '24px',
                          color: $theme.colors.buttonTertiaryText,
                        }),
                      },
                    }}
                    {...selectProps}
                  />
                </DropdownContainer>
                <MaxLabel
                  aria-label={this.constructAriaWayfinderLabel(locale, 'page')}
                  {...maxLabelProps}
                >
                  {`${
                    labels && labels.preposition
                      ? labels.preposition
                      : locale.pagination.preposition || ''
                  } ${numPages}`}
                </MaxLabel>
                <Button
                  aria-label={this.constructAriaWayfinderLabel(
                    locale,
                    'next page. current page',
                  )}
                  disabled={currentPage >= numPages}
                  onClick={this.onNextClick}
                  endEnhancer={() => {
                    return theme.direction === 'rtl' ? (
                      <ChevronLeft title={''} size={24} />
                    ) : (
                      <ChevronRight title={''} size={24} />
                    );
                  }}
                  kind={KIND.tertiary}
                  overrides={{
                    BaseButton: overrides.NextButton,
                  }}
                >
                  {labels && labels.nextButton
                    ? labels.nextButton
                    : locale.pagination.next}
                </Button>
              </Root>
            )}
          </LocaleContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}
