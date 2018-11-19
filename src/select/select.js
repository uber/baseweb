/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  StyledRoot,
  StyledControlContainer,
  StyledPlaceholder,
  StyledValueContainer,
  StyledInputContainer,
  StyledSelectArrow,
  StyledClearIcon,
  StyledSearchIcon,
} from './styled-components';
import AutosizeInput from './autosize-input';
import Value from './value';
import MultiValue from './multi-value';
import SelectDropDown from './dropdown';
import defaultFilterOptions from './utils/default-filter-options';
import {shouldShowValue, shouldShowPlaceholder, expandValue} from './utils';
import {TYPE, STATE_CHANGE_TYPE} from './constants';
import {getOverrides} from '../helpers/overrides';
import {Spinner} from '../spinner';
import {
  Delete as DeleteIcon,
  TriangleDown as TriangleDownIcon,
  Search as SearchIconComponent,
} from '../icon';

import type {
  PropsT,
  SelectStateT,
  ValueT,
  OptionT,
  ChangeActionT,
} from './types';

class Select extends React.Component<PropsT, SelectStateT> {
  static defaultProps = {
    autoFocus: false,
    backspaceRemoves: true,
    clearable: true,
    closeOnSelect: true,
    deleteRemoves: true,
    disabled: false,
    error: false,
    escapeClearsValue: true,
    filterOptions: defaultFilterOptions,
    // can omit this prop in favor of filterOptions customization when needed
    filterOutSelected: true,
    getOptionLabel: null,
    getValueLabel: null,
    id: '',
    isLoading: false,
    labelKey: 'label',
    maxDropdownHeight: '900px',
    multi: false,
    noResultsMsg: 'No results found',
    onBlur: () => {},
    onBlurResetsInput: true,
    onChange: () => {},
    onFocus: () => {},
    onInputChange: () => {},
    onCloseResetsInput: true,
    onSelectResetsInput: true,
    onOpen: null,
    onClose: null,
    openOnClick: true,
    options: [],
    overrides: {},
    placeholder: 'Select...',
    required: false,
    searchable: true,
    query: '',
    type: TYPE.select,
    value: [],
    valueKey: 'id',
  };

  wrapper: ?HTMLElement;
  input: ?HTMLInputElement;
  dragging: boolean;
  focusAfterClear: boolean;
  openAfterFocus: boolean;

  state = {
    inputValue: '',
    isFocused: false,
    isOpen: false,
    isPseudoFocused: false,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  componentDidUpdate(prevProps: PropsT, prevState: SelectStateT) {
    if (prevState.isOpen !== this.state.isOpen) {
      this.toggleTouchOutsideEvent(this.state.isOpen);
      const handler = this.state.isOpen
        ? this.props.onOpen
        : this.props.onClose;
      handler && handler();
    }
  }

  componentWillUnmount() {
    this.toggleTouchOutsideEvent(false);
  }

  toggleTouchOutsideEvent(enabled: boolean) {
    if (__BROWSER__) {
      if (enabled) {
        document.addEventListener('touchstart', this.handleTouchOutside);
      } else {
        document.removeEventListener('touchstart', this.handleTouchOutside);
      }
    }
  }

  handleTouchOutside = (event: Event) => {
    // handle touch outside on ios to dismiss menu
    // $FlowFixMe
    if (this.wrapper && !this.wrapper.contains(event.target)) {
      this.closeMenu();
    }
  };

  focus() {
    if (!this.input) return;
    this.input.focus();
  }

  handleTouchMove = () => {
    // Set a flag that the view is being dragged
    this.dragging = true;
  };

  handleTouchStart = () => {
    // Set a flag that the view is not being dragged
    this.dragging = false;
  };

  handleTouchEnd = (event: Event) => {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this.dragging) return;
    // Fire the mouse events
    this.handleMouseDown(event);
  };

  handleTouchEndClearValue = (event: Event) => {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this.dragging) return;
    // Clear the value
    this.clearValue(event);
  };

  handleMouseDown = (event: Event) => {
    // if the event was triggered by a mousedown and not the primary
    // button, or if the component is disabled, ignore it
    if (
      this.props.disabled ||
      // $FlowFixMe
      (event.type === 'mousedown' && event.button !== 0)
    ) {
      return;
    }
    // $FlowFixMe
    if (event.target.tagName === 'INPUT') {
      if (!this.state.isFocused) {
        this.openAfterFocus = this.props.openOnClick;
        this.focus();
      } else if (!this.state.isOpen) {
        this.setState({
          isOpen: true,
          isPseudoFocused: false,
        });
      }
      return;
    }

    event.preventDefault();
    // for the non-searchable select, toggle the menu
    if (!this.props.searchable) {
      // This code means that if a select is searchable,
      // onClick the options menu will not appear, only on
      // subsequent click will it open.
      this.focus();
      return this.setState({
        isOpen: !this.state.isOpen,
      });
    }
    if (this.state.isFocused) {
      // On iOS, we can get into a state where we think the input is
      // focused but it isn't really, since iOS ignores programmatic
      // calls to input.focus() that weren't triggered by a click event.
      // Call focus() again here to be safe.
      this.focus();
      let toOpen = true;
      // clears the value so that the cursor will be at the end of input when the component re-renders
      if (this.input) this.input.value = '';
      if (this.focusAfterClear) {
        toOpen = false;
        this.focusAfterClear = false;
      }
      // if the input is focused, ensure the menu is open
      this.setState({
        isOpen: toOpen,
        isPseudoFocused: false,
      });
    } else {
      // otherwise, focus the input and open the menu
      this.openAfterFocus = this.props.openOnClick;
      this.focus();
    }
  };

  handleMouseDownOnArrow = (event: Event) => {
    // if the event was triggered by a mousedown and not the primary
    // button, or if the component is disabled, ignore it.
    if (
      this.props.disabled ||
      // $FlowFixMe
      (event.type === 'mousedown' && event.button !== 0)
    ) {
      return;
    }
    if (this.state.isOpen) {
      // prevent default event handlers
      event.stopPropagation();
      event.preventDefault();
      this.closeMenu();
    } else {
      // If the menu isn't open, let the event bubble to the main handleMouseDown
      this.setState({
        isOpen: true,
      });
    }
  };

  closeMenu() {
    if (this.props.onCloseResetsInput) {
      this.setState({
        inputValue: '',
        isOpen: false,
        isPseudoFocused: this.state.isFocused && !this.props.multi,
      });
    } else {
      this.setState({
        isOpen: false,
        isPseudoFocused: this.state.isFocused && !this.props.multi,
      });
    }
  }

  handleInputFocus = (event: Event) => {
    if (this.props.disabled) return;

    let toOpen =
      this.state.isOpen || this.openAfterFocus || this.props.openOnFocus;
    //if focus happens after clear values, don't open dropdown yet.
    toOpen = this.focusAfterClear ? false : toOpen;

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    this.setState({
      isFocused: true,
      isOpen: !!toOpen,
    });

    this.focusAfterClear = false;
    this.openAfterFocus = false;
  };

  handleInputBlur = (event: Event) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    const onBlurredState = {
      isFocused: false,
      isOpen: false,
      isPseudoFocused: false,
    };
    if (this.props.onBlurResetsInput) {
      // $FlowFixMe
      onBlurredState.inputValue = '';
    }
    this.setState(onBlurredState);
  };

  handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    let newInputValue = event.target.value;
    this.setState({
      inputValue: newInputValue,
      isOpen: true,
      isPseudoFocused: false,
    });
    if (this.props.onInputChange) {
      this.props.onInputChange(event);
    }
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (this.props.disabled) return;
    switch (event.keyCode) {
      case 8: // backspace
        if (!this.state.inputValue && this.props.backspaceRemoves) {
          event.preventDefault();
          this.popValue();
        }
        break;
      case 13: // enter
        event.preventDefault();
        event.stopPropagation();
        if (!this.state.isOpen) {
          this.setState({isOpen: true});
        }
        break;
      case 27: // escape
        event.preventDefault();
        if (this.state.isOpen) {
          this.closeMenu();
          event.stopPropagation();
        } else if (this.props.clearable && this.props.escapeClearsValue) {
          this.clearValue(event);
          event.stopPropagation();
        }
        break;
      case 32: // space
        if (this.props.searchable) {
          break;
        }
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({isOpen: true});
        }
        break;
      case 38: // up
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({isOpen: true});
        }
        break;
      case 40: // down
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({isOpen: true});
        }
        break;
      case 33: // page up
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({isOpen: true});
        }
        break;
      case 34: // page down
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({isOpen: true});
        }
        break;
      case 35: // end key
        if (event.shiftKey) {
          break;
        }
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({isOpen: true});
        }
        break;
      case 36: // home key
        if (event.shiftKey) {
          break;
        }
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({isOpen: true});
        }
        break;
      case 46: // delete
        if (!this.state.inputValue && this.props.deleteRemoves) {
          event.preventDefault();
          this.popValue();
        }
        break;
    }
  };

  getOptionLabel = ({option}: OptionT) => {
    return option[this.props.labelKey];
  };

  /**
   * Turns a value into an array from the given options
   */
  getValueArray(value: ValueT): Array<OptionT> {
    if (this.props.multi) {
      if (!Array.isArray(value)) {
        if (value === null || value === undefined) return [];
        value = [value];
      }
      return value.map(value => expandValue(value, this.props));
    }
    if (Array.isArray(value)) {
      return value.map(value => expandValue(value, this.props));
    } else {
      const expandedValue = expandValue(value, this.props);
      return expandedValue ? [expandedValue] : [];
    }
  }

  setValue(value: ValueT, option: OptionT, type: ChangeActionT) {
    if (this.props.onChange) {
      this.props.onChange({
        value: Array.isArray(value) ? value : [value],
        option,
        type,
      });
    }
  }

  selectValue = ({item}: {item: OptionT}) => {
    if (item.disabled) {
      return;
    }
    // NOTE: we add/set the value in a callback to make sure the
    // input value is empty to avoid styling issues in Chrome
    const updatedValue = this.props.onSelectResetsInput
      ? ''
      : this.state.inputValue;
    if (this.props.multi) {
      this.setState(
        {
          inputValue: updatedValue,
          isOpen: !this.props.closeOnSelect,
        },
        () => {
          const valueArray = this.getValueArray(this.props.value);
          if (
            valueArray.some(
              i => i[this.props.valueKey] === item[this.props.valueKey],
            )
          ) {
            this.removeValue(item);
          } else {
            this.addValue(item);
          }
        },
      );
    } else {
      this.setState(
        {
          inputValue: updatedValue,
          isOpen: !this.props.closeOnSelect,
          isPseudoFocused: this.state.isFocused,
        },
        () => {
          this.setValue(item, item, STATE_CHANGE_TYPE.select);
        },
      );
    }
  };

  addValue = (value: OptionT) => {
    const valueArray = this.getValueArray(this.props.value);
    this.setValue(valueArray.concat(value), value, STATE_CHANGE_TYPE.select);
  };

  popValue = () => {
    if (this.props.multi) {
      const valueArray = this.getValueArray(this.props.value);
      const valueArrayLength = valueArray.length;
      if (!valueArrayLength) return;
      if (valueArray[valueArrayLength - 1].clearableValue === false) return;
      const item = valueArray.pop();
      this.setValue(valueArray, item, STATE_CHANGE_TYPE.remove);
    }
  };

  removeValue = (value: OptionT) => {
    let valueArray = this.getValueArray(this.props.value);
    this.setValue(
      valueArray.filter(
        i => i[this.props.valueKey] !== value[this.props.valueKey],
      ),
      value,
      STATE_CHANGE_TYPE.remove,
    );
    this.focus();
  };

  clearValue = (event: Event) => {
    // if the event was triggered by a mousedown and not the primary
    // button, ignore it.
    // $FlowFixMe
    if (event && event.type === 'mousedown' && event.button !== 0) {
      return;
    }
    event.preventDefault();
    this.setValue(this.getResetValue());
    this.setState(
      {
        inputValue: '',
        isOpen: false,
      },
      this.focus,
    );
    this.focusAfterClear = true;
  };

  getResetValue() {
    if (this.props.multi) {
      return [];
    } else {
      return null;
    }
  }

  renderLoading() {
    if (!this.props.isLoading) return;
    const sharedProps = this.getSharedProps();
    const {overrides = {}} = this.props;
    const [LoadingIndicator, loadingIndicatorProps] = getOverrides(
      overrides.LoadingIndicator,
      Spinner,
    );
    return (
      <LoadingIndicator size={16} {...sharedProps} {...loadingIndicatorProps} />
    );
  }

  renderValue(valueArray, isOpen) {
    const {overrides = {}} = this.props;
    const sharedProps = this.getSharedProps();
    const renderLabel = this.props.getValueLabel || this.getOptionLabel;
    const [Placeholder, placeholderProps] = getOverrides(
      overrides.Placeholder,
      StyledPlaceholder,
    );
    if (Array.isArray && (!valueArray.length || !valueArray[0])) {
      const showPlaceholder = shouldShowPlaceholder(
        this.state,
        this.props,
        isOpen,
      );
      return showPlaceholder ? (
        <Placeholder {...sharedProps} {...placeholderProps}>
          {this.props.placeholder}
        </Placeholder>
      ) : null;
    }
    if (this.props.multi) {
      return valueArray.map((value, i) => {
        const disabled =
          sharedProps.$disabled || value.clearableValue === false;
        return (
          <MultiValue
            value={value}
            key={`value-${i}-${value[this.props.valueKey]}`}
            removeValue={() => {
              this.removeValue(value);
            }}
            disabled={disabled}
            overrides={{MultiValue: overrides.MultiValue}}
            {...sharedProps}
          >
            {renderLabel({option: value, index: i})}
          </MultiValue>
        );
      });
    } else if (shouldShowValue(this.state, this.props)) {
      return (
        <Value
          value={valueArray[0]}
          disabled={this.props.disabled}
          overrides={{SingleValue: overrides.SingleValue}}
          {...sharedProps}
        >
          {renderLabel({option: valueArray[0]})}
        </Value>
      );
    }
  }

  renderInput(valueArray: ValueT) {
    const {overrides = {}} = this.props;
    const [InputContainer, inputContainerProps] = getOverrides(
      overrides.InputContainer,
      StyledInputContainer,
    );
    const sharedProps = this.getSharedProps();
    const isOpen = this.state.isOpen;
    let value = this.state.inputValue;
    if (value && !this.props.onSelectResetsInput && !this.state.isFocused) {
      // it hides input value when it is not focused and was not reset on select
      value = '';
    }

    const inputProps = {
      'aria-expanded': isOpen,
      'aria-haspopup': isOpen,
      // Do we need the below props in a top-level API?
      // 'aria-label': this.props['aria-label'],
      // 'aria-describedby': this.props['aria-describedby'],
      // 'aria-labelledby': this.props['aria-labelledby'],
      inputRef: ref => (this.input = ref),
      onBlur: this.handleInputBlur,
      onChange: this.handleInputChange,
      onFocus: this.handleInputFocus,
      overrides: {Input: overrides.Input},
      required: this.props.required,
      role: 'combobox',
      value,
    };
    if (this.props.disabled || !this.props.searchable) {
      return (
        <InputContainer
          aria-expanded={isOpen}
          aria-disabled={this.props.disabled}
          // Same here
          // aria-label={this.props['aria-label']}
          // aria-labelledby={this.props['aria-labelledby']}
          onBlur={this.handleInputBlur}
          onFocus={this.handleInputFocus}
          $ref={ref => (this.input = ref)}
          role="combobox"
          tabIndex={0}
          {...sharedProps}
          {...inputContainerProps}
        />
      );
    }
    return (
      <InputContainer {...sharedProps} {...inputContainerProps}>
        <AutosizeInput {...sharedProps} {...inputProps} />
      </InputContainer>
    );
  }

  renderClear() {
    const sharedProps = this.getSharedProps();
    const valueArray = this.getValueArray(this.props.value);
    if (
      !this.props.clearable ||
      !valueArray.length ||
      !valueArray[0] ||
      this.props.disabled ||
      this.props.isLoading
    )
      return;
    const {overrides = {}} = this.props;
    const [ClearIcon, clearIconProps] = getOverrides(
      overrides.ClearIcon,
      DeleteIcon,
    );
    const ariaLabel = this.props.multi ? 'Clear all' : 'Clear value';
    return (
      <ClearIcon
        size={16}
        title={ariaLabel}
        aria-label={ariaLabel}
        onMouseDown={this.clearValue}
        onTouchEnd={this.handleTouchEndClearValue}
        onTouchMove={this.handleTouchMove}
        onTouchStart={this.handleTouchStart}
        overrides={{Svg: StyledClearIcon}}
        {...sharedProps}
        {...clearIconProps}
      />
    );
  }

  renderArrow() {
    if (this.props.type !== TYPE.select) {
      return null;
    }
    const {overrides = {}} = this.props;
    const [SelectArrow, selectArrowProps] = getOverrides(
      overrides.SelectArrow,
      TriangleDownIcon,
    );
    const sharedProps = this.getSharedProps();
    return (
      <SelectArrow
        size={16}
        title={'open'}
        onMouseDown={this.handleMouseDownOnArrow}
        overrides={{Svg: StyledSelectArrow}}
        {...sharedProps}
        {...selectArrowProps}
      />
    );
  }

  renderSearch() {
    if (this.props.type !== TYPE.search) {
      return null;
    }
    const {overrides = {}} = this.props;
    const [SearchIcon, searchIconProps] = getOverrides(
      overrides.SearchIcon,
      SearchIconComponent,
    );
    const sharedProps = this.getSharedProps();
    return (
      <SearchIcon
        size={16}
        title={'search'}
        onMouseDown={this.handleMouseDownOnArrow}
        overrides={{Svg: StyledSearchIcon}}
        {...sharedProps}
        {...searchIconProps}
      />
    );
  }

  filterOptions(excludeOptions: ValueT) {
    const filterValue = this.state.inputValue;
    const options = this.props.options || [];
    if (this.props.filterOptions) {
      return this.props.filterOptions(options, filterValue, excludeOptions, {
        valueKey: this.props.valueKey,
        labelKey: this.props.labelKey,
      });
    } else {
      return options;
    }
  }

  renderMenu(options: Array<OptionT>, valueArray: ValueT) {
    const {
      error,
      getOptionLabel,
      isLoading,
      labelKey,
      maxDropdownHeight,
      multi,
      noResultsMsg,
      overrides,
      size,
      type,
      value = [],
      valueKey,
    } = this.props;
    const dropDownProps = {
      error,
      getOptionLabel: getOptionLabel || this.getOptionLabel,
      isLoading,
      labelKey,
      maxDropdownHeight,
      multi,
      options,
      onItemSelect: this.selectValue,
      overrides,
      size,
      type,
      value,
      valueKey,
    };
    if (options && options.length) {
      return <SelectDropDown {...dropDownProps} />;
    } else if (noResultsMsg) {
      const noResults = {
        [valueKey]: 'NO_RESULTS_FOUND',
        [labelKey]: noResultsMsg,
        disabled: true,
      };
      return <SelectDropDown {...dropDownProps} options={[noResults]} />;
    } else {
      return null;
    }
  }

  getSharedProps() {
    const {
      disabled,
      error,
      isLoading,
      multi,
      required,
      size,
      searchable,
      type,
    } = this.props;
    const {isOpen, isFocused, isPseudoFocused} = this.state;
    return {
      $disabled: disabled,
      $error: error,
      $isFocused: isFocused,
      $isLoading: isLoading,
      $isOpen: isOpen,
      $isPseudoFocused: isPseudoFocused,
      $multi: multi,
      $required: required,
      $searchable: searchable,
      $size: size,
      $type: type,
    };
  }

  render() {
    const {overrides = {}, type, multi, value, filterOutSelected} = this.props;
    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [ControlContainer, controlContainerProps] = getOverrides(
      overrides.ControlContainer,
      StyledControlContainer,
    );
    const [ValueContainer, valueContainerProps] = getOverrides(
      overrides.ValueContainer,
      StyledValueContainer,
    );
    const sharedProps = this.getSharedProps();

    const valueArray = this.getValueArray(value);
    const options = this.filterOptions(
      multi && filterOutSelected ? valueArray : null,
    );
    let isOpen = this.state.isOpen;
    if (multi && !options.length && valueArray.length && !this.state.inputValue)
      isOpen = false;
    sharedProps.$isOpen = isOpen;
    return (
      <Root $ref={ref => (this.wrapper = ref)} {...sharedProps} {...rootProps}>
        <ControlContainer
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          onTouchEnd={this.handleTouchEnd}
          onTouchMove={this.handleTouchMove}
          onTouchStart={this.handleTouchStart}
          {...sharedProps}
          {...controlContainerProps}
        >
          {type === TYPE.search ? this.renderSearch() : null}
          <ValueContainer {...sharedProps} {...valueContainerProps}>
            {this.renderValue(valueArray, isOpen)}
            {this.renderInput(valueArray)}
          </ValueContainer>
          {this.renderLoading()}
          {this.renderClear()}
          {type === TYPE.select ? this.renderArrow() : null}
        </ControlContainer>
        {isOpen ? this.renderMenu(options, valueArray) : null}
      </Root>
    );
  }
}

export default Select;
