/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';

import {getOverrides} from '../helpers/overrides.js';
import {
  Delete as DeleteIcon,
  TriangleDown as TriangleDownIcon,
  Search as SearchIconComponent,
} from '../icon/index.js';
import {LocaleContext} from '../locale/index.js';
import type {LocaleT} from '../locale/types.js';
import {Popover, PLACEMENT} from '../popover/index.js';
import {Spinner} from '../spinner/index.js';

import AutosizeInput from './autosize-input.js';
import {TYPE, STATE_CHANGE_TYPE} from './constants.js';
import defaultProps from './default-props.js';
import SelectDropdown from './dropdown.js';
import MultiValue from './multi-value.js';
import {
  StyledRoot,
  StyledControlContainer,
  StyledPlaceholder,
  StyledValueContainer,
  StyledInputContainer,
  StyledIconsContainer,
  StyledSelectArrow,
  StyledClearIcon,
  getLoadingIconStyles,
  StyledSearchIcon,
} from './styled-components.js';
import type {
  PropsT,
  SelectStateT,
  ValueT,
  OptionT,
  ChangeActionT,
} from './types.js';
import {
  shouldShowValue,
  shouldShowPlaceholder,
  expandValue,
} from './utils/index.js';
import Value from './value.js';

const isClick = event => event.type === 'click';
const isLeftClick = event =>
  event.button !== null && event.button !== undefined && event.button === 0;

export function isInteractive(rootTarget: EventTarget, rootElement: Element) {
  if (rootTarget instanceof Element) {
    let target: ?Element = rootTarget;
    while (target && target !== rootElement) {
      const role = target.getAttribute('role');
      if (role === 'button' || role === 'link') {
        return true;
      }
      if (target.tagName) target = target.parentElement;
    }
  }

  return false;
}

class Select extends React.Component<PropsT, SelectStateT> {
  static defaultProps = defaultProps;

  wrapper: ?HTMLElement;
  input: ?HTMLInputElement;
  dragging: boolean;
  // focusAfterClear is a flag to indicate that the dropdowm menu should open after a selected
  // option has been cleared.
  focusAfterClear: boolean;
  // openAfterFocus is a flag to indicate that the dropdown menu should open when the component is
  // focused. Developers have the option to disable initial clicks opening the dropdown menu. If not
  // disabled, clicks will set this flag true. Upon focusing, look to this to see if the menu should
  // be opened, or only focus.
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

  focus() {
    if (!this.input) return;
    this.input.focus();
  }

  // Handle touch outside on mobile to dismiss menu, ensures that the
  // touch target is not within the wrapper DOM node.
  handleTouchOutside = (event: TouchEvent) => {
    if (__BROWSER__) {
      const containsNode =
        event.target instanceof Node &&
        this.wrapper &&
        this.wrapper.contains(event.target);

      if (this.wrapper && !containsNode) {
        this.closeMenu();
      }
    }
  };

  // Track dragging state to filter false-positive actions where a user
  // intends to drag/scroll the page.
  handleTouchMove = () => (this.dragging = true);
  handleTouchStart = () => (this.dragging = false);
  handleTouchEnd = (event: TouchEvent) => {
    if (this.dragging) return;
    this.handleClick(event);
  };
  handleTouchEndClearValue = (event: TouchEvent) => {
    if (this.dragging) return;
    this.clearValue(event);
  };

  handleClick = (event: MouseEvent | TouchEvent) => {
    if (this.props.disabled || !isClick(event) || !isLeftClick(event)) {
      return;
    }

    // Case comes up when text has been typed into the input field. If no text provided,
    // the 'input' element will have essentially 0 width therefore will not be clickable.
    // When click outside does not reset input, text provided will stay rendered after clicks away
    // from the select component. Upon subsequent clicks on the provided text, open the dropdown
    // menu, in addition to text edit operations.
    if (event.target === this.input) {
      // CHASE: not sure why this condition is here. I cannot replicate a situation where clicks
      // on provided text break into here.
      if (!this.state.isFocused) {
        this.openAfterFocus = this.props.openOnClick;
        this.focus();
        return;
      }

      if (!this.state.isOpen) {
        this.setState({
          isOpen: true,
          isPseudoFocused: false,
        });
        return;
      }
    }

    // Ensures that interactive elements within the Select component do not trigger the outer click
    // handler. For example, after an option is selected clicks on the 'clear' icon call here. We
    // should ignore those events. This comes after case where click is on input element, so that
    // those are handled on their own.
    if (this.input && isInteractive(event.target, this.input)) {
      return;
    }

    // For the simple case where clicking on the Select does not allow for providing
    // text input to filter the dropdown options.
    if (!this.props.searchable) {
      this.focus();
      this.setState(prev => ({isOpen: !prev.isOpen}));
      return;
    }

    // Cases below only apply to searchable Select component.
    if (this.state.isFocused) {
      // iOS ignores programmaitc calls to input.focus() that were not triggered by a click event.
      // This component can get into a state where isFocused is true, but the DOM node is not
      // focused. Call focus here again to ensure.
      this.focus();

      // Case comes up when click outside does not reset input - once text has been provided to
      // the input, and the user closes the dropdown menu the provided text is maintained. After
      // this, if the user focuses back into the select component then clicks on the component,
      // the provided text highlights rather than position's the cursor at the end of the input.
      if (this.input) this.input.value = '';

      this.setState(prev => ({
        isOpen: this.focusAfterClear ? false : !prev.isOpen,
        isPseudoFocused: false,
      }));

      this.focusAfterClear = false;
    } else {
      this.openAfterFocus = this.props.openOnClick;
      this.focus();
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

  handleInputFocus = (event: SyntheticEvent<HTMLElement>) => {
    if (this.props.disabled) return;
    if (this.props.onFocus) this.props.onFocus(event);

    let toOpen = this.state.isOpen || this.openAfterFocus;
    // if focus happens after clear values, don't open dropdown yet.
    toOpen = this.focusAfterClear ? false : toOpen;

    this.setState({
      isFocused: true,
      isOpen: !!toOpen,
    });

    this.focusAfterClear = false;
    this.openAfterFocus = false;
  };

  handleClickOutside = (event: MouseEvent) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    const onBlurredState: $Shape<SelectStateT> = {
      isFocused: false,
      isOpen: false,
      isPseudoFocused: false,
    };

    if (this.props.onBlurResetsInput) {
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
      case 9: // tab
        this.setState(prevState => ({
          isPseudoFocused: false,
          isFocused: false,
          isOpen: false,
          inputValue: this.props.onCloseResetsInput ? '' : prevState.inputValue,
        }));
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

  getOptionLabel = ({
    option,
  }: {
    option: OptionT,
    optionState: {
      $selected: boolean,
      $disabled: boolean,
      $isHighlighted: boolean,
    },
  }): React.Node => {
    return option[this.props.labelKey];
  };

  getValueLabel = ({option}: {option: OptionT}): React.Node => {
    return option[this.props.labelKey];
  };

  /**
   * Extends the value into an array from the given options
   */
  getValueArray(value: ValueT): Array<OptionT> {
    if (!Array.isArray(value)) {
      if (value === null || value === undefined) return [];
      value = [value];
    }
    return value.map(value => expandValue(value, this.props));
  }

  setValue(value: ValueT, option: ?OptionT, type: ChangeActionT) {
    if (this.props.onChange) {
      this.props.onChange({
        value,
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
          const valueArray = this.props.value;
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
          this.setValue([item], item, STATE_CHANGE_TYPE.select);
        },
      );
    }
  };

  addValue = (item: OptionT) => {
    const valueArray = [...this.props.value];
    this.setValue(valueArray.concat(item), item, STATE_CHANGE_TYPE.select);
  };

  popValue = () => {
    if (this.props.multi) {
      const valueArray = [...this.props.value];
      const valueLength = valueArray.length;
      if (!valueLength) return;
      if (valueArray[valueLength - 1].clearableValue === false) return;
      const item = valueArray.pop();
      this.setValue(valueArray, item, STATE_CHANGE_TYPE.remove);
    }
  };

  removeValue = (item: OptionT) => {
    const valueArray = [...this.props.value];
    this.setValue(
      valueArray.filter(
        i => i[this.props.valueKey] !== item[this.props.valueKey],
      ),
      item,
      STATE_CHANGE_TYPE.remove,
    );
    this.focus();
  };

  clearValue = (event: KeyboardEvent | MouseEvent | TouchEvent) => {
    if (isClick(event) && !isLeftClick(event)) return;

    const resetValue = this.props.value.filter(
      item => item.clearableValue === false,
    );
    this.setValue(resetValue, null, STATE_CHANGE_TYPE.clear);
    this.setState({
      inputValue: '',
      isOpen: false,
    });

    this.focus();
    this.focusAfterClear = true;
  };

  renderLoading() {
    if (!this.props.isLoading) return;
    const sharedProps = this.getSharedProps();
    const {overrides = {}} = this.props;
    const [LoadingIndicator, loadingIndicatorProps] = getOverrides(
      overrides.LoadingIndicator,
      Spinner,
    );
    return (
      <LoadingIndicator
        size={16}
        overrides={{Svg: {style: getLoadingIconStyles}}}
        {...sharedProps}
        {...loadingIndicatorProps}
      />
    );
  }

  renderValue(
    valueArray: ValueT,
    isOpen: boolean,
    locale: LocaleT,
  ): ?React.Node | Array<?React.Node> {
    const {overrides = {}} = this.props;
    const sharedProps = this.getSharedProps();
    const renderLabel = this.props.getValueLabel || this.getValueLabel;
    const [Placeholder, placeholderProps] = getOverrides(
      overrides.Placeholder,
      StyledPlaceholder,
    );
    if (!valueArray.length) {
      const showPlaceholder = shouldShowPlaceholder(
        this.state,
        this.props,
        isOpen,
      );
      return showPlaceholder ? (
        <Placeholder {...sharedProps} {...placeholderProps}>
          {this.props.placeholder || locale.select.placeholder}
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
            removeValue={() => this.removeValue(value)}
            disabled={disabled}
            overrides={{MultiValue: overrides.MultiValue}}
            {...sharedProps}
            $disabled={disabled}
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

  renderInput() {
    const {overrides = {}} = this.props;
    const [InputContainer, inputContainerProps] = getOverrides(
      overrides.InputContainer,
      StyledInputContainer,
    );
    const sharedProps = this.getSharedProps();
    const isOpen = this.state.isOpen;
    let value = this.state.inputValue;
    if (value && !this.props.onSelectResetsInput && !this.state.isFocused) {
      // It hides input value when it is not focused and was not reset on select
      value = '';
    }

    if (!this.props.searchable) {
      return (
        <InputContainer
          aria-expanded={isOpen}
          aria-disabled={this.props.disabled}
          aria-label={this.props['aria-label']}
          aria-labelledby={this.props['aria-labelledby']}
          aria-required={this.props.required || null}
          onFocus={this.handleInputFocus}
          $ref={ref => (this.input = ref)}
          tabIndex={0}
          {...sharedProps}
          {...inputContainerProps}
        />
      );
    }

    return (
      <InputContainer {...sharedProps} {...inputContainerProps}>
        <AutosizeInput
          aria-autocomplete="list"
          aria-describedby={this.props['aria-describedby']}
          aria-disabled={this.props.disabled || null}
          aria-expanded={isOpen}
          aria-haspopup={isOpen}
          aria-label={this.props['aria-label']}
          aria-labelledby={this.props['aria-labelledby']}
          aria-required={this.props.required || null}
          disabled={this.props.disabled || null}
          inputRef={ref => (this.input = ref)}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          overrides={{Input: overrides.Input}}
          required={(this.props.required && !this.props.value.length) || null}
          role="combobox"
          value={value}
          {...sharedProps}
        />
      </InputContainer>
    );
  }

  renderClear() {
    const sharedProps = this.getSharedProps();
    const value = this.props.value;
    if (
      !this.props.clearable ||
      !value ||
      !value.length ||
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
        onClick={this.clearValue}
        onTouchEnd={this.handleTouchEndClearValue}
        onTouchMove={this.handleTouchMove}
        onTouchStart={this.handleTouchStart}
        overrides={{Svg: StyledClearIcon}}
        role="button"
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
        overrides={{Svg: StyledSearchIcon}}
        {...sharedProps}
        {...searchIconProps}
      />
    );
  }

  filterOptions(excludeOptions: ?ValueT) {
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

  getSharedProps() {
    const {
      clearable,
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
      $clearable: clearable,
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
    const [IconsContainer, iconsContainerProps] = getOverrides(
      overrides.IconsContainer,
      StyledIconsContainer,
    );
    const sharedProps = this.getSharedProps();

    const valueArray = this.getValueArray(value);
    const options = this.filterOptions(
      multi && filterOutSelected ? valueArray : null,
    );
    let isOpen = this.state.isOpen;
    if (
      multi &&
      !options.length &&
      valueArray.length &&
      !this.state.inputValue
    ) {
      isOpen = false;
    }
    sharedProps.$isOpen = isOpen;

    return (
      <LocaleContext.Consumer>
        {locale => (
          <Popover
            onClickOutside={this.handleClickOutside}
            isOpen={isOpen}
            content={({anchor}) => {
              const dropdownProps = {
                error: this.props.error,
                getOptionLabel:
                  this.props.getOptionLabel || this.getOptionLabel,
                isLoading: this.props.isLoading,
                labelKey: this.props.labelKey,
                maxDropdownHeight: this.props.maxDropdownHeight,
                multi,
                onItemSelect: this.selectValue,
                options,
                overrides,
                required: this.props.required,
                searchable: this.props.searchable,
                size: this.props.size,
                type,
                value: valueArray,
                valueKey: this.props.valueKey,
                width: anchor ? anchor.clientWidth : null,
              };

              if (options && options.length) {
                return <SelectDropdown {...dropdownProps} />;
              } else if (this.props.noResultsMsg) {
                const noResults = {
                  [this.props.valueKey]: 'NO_RESULTS_FOUND',
                  [this.props.labelKey]:
                    this.props.noResultsMsg || locale.select.noResultsMsg,
                  disabled: true,
                };
                return (
                  <SelectDropdown {...dropdownProps} options={[noResults]} />
                );
              } else {
                return null;
              }
            }}
            placement={PLACEMENT.bottom}
          >
            <Root
              $ref={ref => (this.wrapper = ref)}
              {...sharedProps}
              {...rootProps}
            >
              <ControlContainer
                onKeyDown={this.handleKeyDown}
                onClick={this.handleClick}
                onTouchEnd={this.handleTouchEnd}
                onTouchMove={this.handleTouchMove}
                onTouchStart={this.handleTouchStart}
                {...sharedProps}
                {...controlContainerProps}
              >
                {type === TYPE.search ? this.renderSearch() : null}
                <ValueContainer {...sharedProps} {...valueContainerProps}>
                  {this.renderValue(valueArray, isOpen, locale)}
                  {this.renderInput()}
                </ValueContainer>
                <IconsContainer {...sharedProps} {...iconsContainerProps}>
                  {this.renderLoading()}
                  {this.renderClear()}
                  {type === TYPE.select ? this.renderArrow() : null}
                </IconsContainer>
              </ControlContainer>
            </Root>
          </Popover>
        )}
      </LocaleContext.Consumer>
    );
  }
}

export default Select;
