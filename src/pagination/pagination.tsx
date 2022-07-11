/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import * as React from 'react';
import memoize from 'memoize-one';
// Files
import { LocaleContext } from '../locale/index';
import { ThemeContext } from '../styles/theme-provider';
import { Select as BaseSelect } from '../select/index';
import { Button, KIND } from '../button/index';
import { StyledRoot, StyledMaxLabel, StyledDropdownContainer } from './styled-components';
import ChevronLeft from '../icon/chevron-left';
import ChevronRight from '../icon/chevron-right';
import { getOverrides } from '../helpers/overrides';
import type { PaginationPropsT } from './types';
import type { LocaleT } from '../locale/types';
import { isFocusVisible, forkFocus, forkBlur } from '../utils/focusVisible';

import type { SyntheticEvent } from 'react';

type PageOptionT = {
  label: number;
};

export default class Pagination extends React.PureComponent<
  PaginationPropsT,
  {
    isFocusVisible: boolean;
  }
> {
  static defaultProps = {
    labels: {},
    overrides: {},
  };

  state = { isFocusVisible: false };
  handleFocus = (event: SyntheticEvent) => {
    if (isFocusVisible(event)) {
      this.setState({ isFocusVisible: true });
    }
  };

  handleBlur = (event: SyntheticEvent) => {
    if (this.state.isFocusVisible !== false) {
      this.setState({ isFocusVisible: false });
    }
  };

  getMenuOptions = memoize((numPages: number) => {
    const menuOptions = [];
    for (let i = 1; i <= numPages; i++) {
      menuOptions.push({ label: i });
    }
    return menuOptions;
  });

  onMenuItemSelect = (data: { value: ReadonlyArray<PageOptionT> }) => {
    const item = data.value[0];
    const { onPageChange, currentPage } = this.props;
    const page = item.label;
    if (page !== currentPage) {
      onPageChange && onPageChange({ nextPage: page, prevPage: currentPage });
    }
  };

  onPrevClick = (event: SyntheticEvent) => {
    const { currentPage, onPageChange, onPrevClick } = this.props;
    if (currentPage > 1) {
      onPageChange && onPageChange({ nextPage: currentPage - 1, prevPage: currentPage });
      onPrevClick && onPrevClick({ event });
    }
  };

  onNextClick = (event: SyntheticEvent) => {
    const { currentPage, numPages, onPageChange, onNextClick } = this.props;
    if (currentPage < numPages) {
      onPageChange && onPageChange({ nextPage: currentPage + 1, prevPage: currentPage });
      onNextClick && onNextClick({ event });
    }
  };

  constructAriaWayfinderLabel = (locale: LocaleT, prefix: string) => {
    const { currentPage, numPages, labels } = this.props;
    return (
      prefix +
      ' ' +
      currentPage +
      ' ' +
      `${labels && labels.preposition ? labels.preposition : locale.pagination.preposition}` +
      ' ' +
      numPages
    );
  };

  render() {
    const { overrides = {}, currentPage, labels, numPages, size } = this.props;

    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [MaxLabel, maxLabelProps] = getOverrides(overrides.MaxLabel, StyledMaxLabel);
    const [DropdownContainer, dropdownContainerProps] = getOverrides(
      overrides.DropdownContainer,
      StyledDropdownContainer
    );
    const [Select, selectProps] = getOverrides(overrides.Select, BaseSelect);

    const options = this.getMenuOptions(numPages);

    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <LocaleContext.Consumer>
            {(locale) => (
              <Root data-baseweb="pagination" {...rootProps}>
                <Button
                  aria-label={this.constructAriaWayfinderLabel(
                    locale,
                    'previous page. current page'
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
                  size={size}
                >
                  {labels && labels.prevButton ? labels.prevButton : locale.pagination.prev}
                </Button>
                <DropdownContainer
                  $isFocusVisible={this.state.isFocusVisible}
                  {...dropdownContainerProps}
                  onFocus={forkFocus(dropdownContainerProps, this.handleFocus)}
                  onBlur={forkBlur(dropdownContainerProps, this.handleBlur)}
                >
                  <Select
                    aria-label={this.constructAriaWayfinderLabel(locale, 'page')}
                    options={options}
                    labelKey="label"
                    valueKey="label"
                    onChange={this.onMenuItemSelect}
                    searchable={false}
                    clearable={false}
                    value={[{ label: currentPage }]}
                    maxDropdownHeight="200px"
                    size={size}
                    overrides={{
                      ControlContainer: {
                        style: ({ $theme, $disabled, $isOpen, $error }) => ({
                          borderLeftColor: 'transparent',
                          borderRightColor: 'transparent',
                          borderTopColor: 'transparent',
                          borderBottomColor: 'transparent',
                          boxShadow: 'none',
                          backgroundColor: $disabled
                            ? $theme.colors.buttonDisabledFill
                            : $isOpen
                            ? $theme.colors.buttonTertiaryHover
                            : $error
                            ? $theme.colors.negative50
                            : $theme.colors.buttonTertiaryFill,
                          ':hover': {
                            backgroundColor: $theme.colors.buttonTertiaryHover,
                          },
                        }),
                      },
                      InputContainer: {
                        style: {
                          marginLeft: 0,
                        },
                      },
                      ValueContainer: {
                        style: {
                          flexBasis: 'auto',
                        },
                      },
                      SingleValue: {
                        style: ({ $theme }) => ({
                          position: 'relative',
                          paddingTop: '0',
                          paddingBottom: '0',
                          paddingLeft: $theme.sizing.scale200,
                          paddingRight: $theme.sizing.scale500,
                          color: $theme.colors.buttonTertiaryText,
                          ...$theme.typography.font350,
                          lineHeight: 'unset',
                        }),
                      },
                      SelectArrow: {
                        style: ({ $theme }) => ({
                          width: '24px',
                          height: '24px',
                          color: $theme.colors.buttonTertiaryText,
                        }),
                      },
                    }}
                    {...selectProps}
                  />
                </DropdownContainer>
                <MaxLabel {...maxLabelProps} aria-hidden={true}>
                  {`${
                    labels && labels.preposition
                      ? labels.preposition
                      : locale.pagination.preposition || ''
                  } ${numPages}`}
                </MaxLabel>
                <Button
                  aria-label={this.constructAriaWayfinderLabel(locale, 'next page. current page')}
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
                  size={size}
                >
                  {labels && labels.nextButton ? labels.nextButton : locale.pagination.next}
                </Button>
              </Root>
            )}
          </LocaleContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
}
