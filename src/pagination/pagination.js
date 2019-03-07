/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global document */
import * as React from 'react';
import memoize from 'memoize-one';
// Files
import {LocaleContext} from '../locale/index.js';
import {Button, StyledBaseButton, KIND} from '../button/index.js';
import {StatefulMenu as Menu} from '../menu/index.js';
import {
  Root as StyledRoot,
  MaxLabel as StyledMaxLabel,
  DropdownContainer as StyledDropdownContainer,
  DropdownMenu as StyledDropdownMenu,
  DropdownButton as StyledDropdownButton,
} from './styled-components.js';
import TriangleDown from '../icon/triangle-down.js';
import ChevronLeft from '../icon/chevron-left.js';
import ChevronRight from '../icon/chevron-right.js';
import {getOverrides} from '../helpers/overrides.js';
import type {PaginationPropsT, PaginationStateT} from './types.js';
import type {OnItemSelectFnT} from '../menu/types.js';

type MenuItemT = {
  label: number,
};

export default class Pagination extends React.PureComponent<
  PaginationPropsT,
  PaginationStateT,
> {
  static defaultProps = {
    labels: {},
    overrides: {},
  };

  state = {isMenuOpen: false};

  dropdownContainerRef = (React.createRef(): {current: ?HTMLDivElement});

  onPageClick = (event: MouseEvent) => {
    const el: ?HTMLDivElement = this.dropdownContainerRef.current;
    /* eslint-disable-next-line flowtype/no-weak-types */
    if (el && !el.contains((event.target: any))) {
      this.setState({isMenuOpen: false});
    }
  };

  getMenuOptions = memoize((numPages: number) => {
    const menuOptions = [];
    for (let i = 1; i <= numPages; i++) {
      menuOptions.push(({label: i}: MenuItemT));
    }
    return menuOptions;
  });

  onMenuItemSelect: OnItemSelectFnT = ({item}) => {
    const {onPageChange, currentPage} = this.props;
    const page = item.label;
    if (page !== currentPage) {
      onPageChange && onPageChange({nextPage: page, prevPage: currentPage});
      this.onDropdownButtonClick();
    }
  };

  onPrevClick = (event: SyntheticEvent<>) => {
    const {currentPage, onPageChange, onPrevClick} = this.props;
    onPageChange &&
      onPageChange({nextPage: currentPage - 1, prevPage: currentPage});
    onPrevClick && onPrevClick({event});
  };

  onNextClick = (event: SyntheticEvent<>) => {
    const {currentPage, onPageChange, onNextClick} = this.props;
    onPageChange &&
      onPageChange({nextPage: currentPage + 1, prevPage: currentPage});
    onNextClick && onNextClick({event});
  };

  onDropdownButtonClick = () => {
    const isMenuOpen = !this.state.isMenuOpen;
    // no __BROWSER__ check because click only happens client-side
    if (isMenuOpen) {
      document.addEventListener('click', this.onPageClick, {
        capture: true,
      });
    } else {
      document.removeEventListener('click', this.onPageClick, {
        capture: true,
      });
    }
    this.setState({isMenuOpen});
  };

  render() {
    const {overrides = {}, currentPage, labels, numPages} = this.props;
    const {isMenuOpen} = this.state;

    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [PrevButton, prevButtonProps] = getOverrides(
      overrides.PrevButton,
      StyledBaseButton,
    );
    const [NextButton, nextButtonProps] = getOverrides(
      overrides.NextButton,
      StyledBaseButton,
    );
    const [MaxLabel, maxLabelProps] = getOverrides(
      overrides.MaxLabel,
      StyledMaxLabel,
    );
    const [DropdownContainer, dropdownContainerProps] = getOverrides(
      overrides.DropdownContainer,
      StyledDropdownContainer,
    );
    const [DropdownButton, dropdownButtonProps] = getOverrides(
      overrides.DropdownButton,
      StyledDropdownButton,
    );
    const [DropdownMenu, dropdownMenuProps] = getOverrides(
      overrides.DropdownMenu,
      Menu,
    );

    const options = this.getMenuOptions(numPages);

    return (
      <LocaleContext.Consumer>
        {locale => (
          <Root {...rootProps}>
            <Button
              onClick={this.onPrevClick}
              startEnhancer={() => <ChevronLeft title={''} size={24} />}
              kind={KIND.tertiary}
              overrides={{
                BaseButton: PrevButton,
              }}
              {...prevButtonProps}
            >
              {labels && labels.prevButton
                ? labels.prevButton
                : locale.pagination.prev}
            </Button>
            <DropdownContainer
              $ref={this.dropdownContainerRef}
              {...dropdownContainerProps}
            >
              <Button
                onClick={this.onDropdownButtonClick}
                endEnhancer={() => (
                  <TriangleDown
                    title={''}
                    overrides={{
                      Svg: {
                        style: ({$theme}) => ({
                          color: $theme.colors.mono800,
                        }),
                      },
                    }}
                    size={24}
                  />
                )}
                kind={KIND.tertiary}
                overrides={{
                  BaseButton: DropdownButton,
                }}
                {...dropdownButtonProps}
              >
                {currentPage}
              </Button>
              {isMenuOpen && (
                // $FlowFixMe
                <DropdownMenu
                  items={options}
                  onItemSelect={this.onMenuItemSelect}
                  initialState={{
                    highlightedIndex: Math.max(currentPage - 1, 0),
                  }}
                  overrides={{
                    List: {
                      component: StyledDropdownMenu,
                      // Access $style manually because it has gone through transformation
                      // from the override helper function already
                      // $FlowFixMe
                      style: dropdownMenuProps.$style,
                    },
                  }}
                  {...dropdownMenuProps}
                />
              )}
            </DropdownContainer>
            <MaxLabel {...maxLabelProps}>
              {`${
                labels && labels.preposition
                  ? labels.preposition
                  : locale.pagination.preposition || ''
              } ${numPages}`}
            </MaxLabel>
            <Button
              onClick={this.onNextClick}
              endEnhancer={() => <ChevronRight title={''} size={24} />}
              kind={KIND.tertiary}
              overrides={{
                BaseButton: NextButton,
              }}
              {...nextButtonProps}
            >
              {labels && labels.nextButton
                ? labels.nextButton
                : locale.pagination.next}
            </Button>
          </Root>
        )}
      </LocaleContext.Consumer>
    );
  }
}
