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
import {Layer, TetherBehavior, TETHER_PLACEMENT} from '../layer/index.js';
import {Button, StyledBaseButton, KIND} from '../button/index.js';
import {StatefulMenu as Menu} from '../menu/index.js';
import {mergeStyleOverrides} from '../helpers/overrides.js';
import {
  StyledRoot,
  StyledMaxLabel,
  StyledDropdownContainer,
  StyledDropdownMenu,
  StyledDropdownButton,
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

  state = {
    isMenuOpen: false,
    layerIsMounted: false,
    tetherOffset: {top: 0, left: 0},
  };

  dropdownAnchorRef = (React.createRef(): {current: ?HTMLDivElement});
  dropdownRef = (React.createRef(): {current: ?HTMLDivElement});
  dropdownContainerRef = (React.createRef(): {current: ?HTMLDivElement});

  onPageClick = (event: MouseEvent) => {
    const select: ?HTMLDivElement = this.dropdownContainerRef.current;
    const dropdown: ?HTMLDivElement = this.dropdownRef.current;
    if (
      select &&
      dropdown &&
      /* eslint-disable flowtype/no-weak-types */
      !select.contains((event.target: any)) &&
      !dropdown.contains((event.target: any))
      /* eslint-enable flowtype/no-weak-types */
    ) {
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
          <Root data-baseweb="pagination" {...rootProps}>
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
                          color: $theme.colors.paginationTriangleDown,
                        }),
                      },
                    }}
                    size={24}
                  />
                )}
                kind={KIND.tertiary}
                overrides={{
                  BaseButton: {
                    component: DropdownButton,
                    props: {
                      $ref: this.dropdownAnchorRef,
                    },
                  },
                }}
                {...dropdownButtonProps}
              >
                {currentPage}
              </Button>
              {isMenuOpen && (
                // setting the layerIsMounted onMount to trigger the update
                <Layer
                  onMount={() => this.setState({layerIsMounted: true})}
                  onUnmount={() => this.setState({layerIsMounted: false})}
                >
                  <TetherBehavior
                    anchorRef={this.dropdownAnchorRef.current}
                    popperRef={this.dropdownRef.current}
                    onPopperUpdate={(offsets, data) => {
                      this.setState({tetherOffset: offsets.popper});
                      return data;
                    }}
                    placement={TETHER_PLACEMENT.bottom}
                  >
                    <DropdownMenu
                      items={options}
                      onItemSelect={this.onMenuItemSelect}
                      initialState={{
                        highlightedIndex: Math.max(currentPage - 1, 0),
                      }}
                      rootRef={this.dropdownRef}
                      overrides={{
                        List: {
                          component: StyledDropdownMenu,
                          // ---------------------------
                          // This is out of the normal override pattern aproach that we choose
                          // to pass the style overrides passes to the DropdownMenu component
                          // to its List styled element. Since the DropdownMenu is an override
                          // for a composable component and not a single styled element
                          // ---------------------------
                          // Access $style manually because it has gone through transformation
                          // from the override helper function already
                          // $FlowFixMe
                          style: mergeStyleOverrides(dropdownMenuProps.$style, {
                            top: `${this.state.tetherOffset.top}px`,
                            left: `${this.state.tetherOffset.left}px`,
                            width: this.dropdownAnchorRef.current
                              ? `${
                                  this.dropdownAnchorRef.current.clientWidth
                                }px`
                              : null,
                          }),
                        },
                      }}
                      {...dropdownMenuProps}
                    />
                  </TetherBehavior>
                </Layer>
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
