/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import memoize from 'memoize-one';
// Files
import {Button, StyledBaseButton, KIND, SIZE} from '../button';
import DefaultSelect from './select';
import {
  Root as StyledRoot,
  MaxLabel as StyledMaxLabel,
  DropdownContainer as StyledDropdownContainer,
} from './styled-components';
import {ArrowLeft, ArrowRight} from './icons';
import {getOverrideObject} from '../helpers/overrides';
import type {
  PaginationPropsT,
  PaginationStateT,
  SelectMenuItemT,
} from './types';
import type {PropsT} from '../select/types';

export default class Pagination extends React.PureComponent<
  PaginationPropsT,
  PaginationStateT,
> {
  static defaultProps = {
    prepositionLabel: 'of',
    overrides: {},
  };

  getMenuOptions = memoize(numPages => {
    const menuOptions = [];
    for (let i = 1; i <= numPages; i++) {
      menuOptions.push(({id: String(i), label: i}: SelectMenuItemT));
    }
    return menuOptions;
  });

  onItemSelect: $PropertyType<PropsT, 'onChange'> = (e, {label}) => {
    const {onPageChange, currentPage} = this.props;
    if (label && label !== currentPage) {
      onPageChange && onPageChange(label, currentPage);
    }
  };

  onPrevClick = (...args: *) => {
    const {currentPage, onPageChange, onPrevClick} = this.props;
    onPageChange && onPageChange(currentPage - 1, currentPage);
    onPrevClick && onPrevClick(args);
  };

  onNextClick = (...args: *) => {
    const {currentPage, onPageChange, onNextClick} = this.props;
    onPageChange && onPageChange(currentPage + 1, currentPage);
    onNextClick && onNextClick(args);
  };

  render() {
    const {
      overrides = {},
      currentPage,
      prepositionLabel = '',
      numPages,
    } = this.props;

    const {component: Root, props: rootProps} = getOverrideObject(
      overrides.Root,
      StyledRoot,
    );
    const {component: PrevButton, props: prevButtonProps} = getOverrideObject(
      overrides.PrevButton,
      StyledBaseButton,
    );
    const {component: NextButton, props: nextButtonProps} = getOverrideObject(
      overrides.NextButton,
      StyledBaseButton,
    );
    const {component: MaxLabel, props: maxLabelProps} = getOverrideObject(
      overrides.MaxLabel,
      StyledMaxLabel,
    );
    const {component: Select, props: selectProps} = getOverrideObject(
      overrides.Select,
      DefaultSelect,
    );
    const {
      component: DropdownContainer,
      props: dropdownContainerProps,
    } = getOverrideObject(overrides.DropdownContainer, StyledDropdownContainer);

    const options = this.getMenuOptions(numPages);

    return (
      <Root {...rootProps}>
        <Button
          onClick={this.onPrevClick}
          startEnhancer={ArrowLeft}
          kind={KIND.tertiary}
          size={SIZE.condensed}
          overrides={{
            BaseButton: PrevButton,
          }}
          {...prevButtonProps}
        >
          Prev
        </Button>
        <DropdownContainer {...dropdownContainerProps}>
          <Select
            currentPage={currentPage}
            options={options}
            onChange={this.onItemSelect}
            {...selectProps}
          />
        </DropdownContainer>
        <MaxLabel
          {...maxLabelProps}
        >{`${prepositionLabel} ${numPages}`}</MaxLabel>
        <Button
          onClick={this.onNextClick}
          endEnhancer={ArrowRight}
          kind={KIND.tertiary}
          size={SIZE.condensed}
          overrides={{
            BaseButton: NextButton,
          }}
          {...nextButtonProps}
        >
          Next
        </Button>
      </Root>
    );
  }
}
