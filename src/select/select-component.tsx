/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';

import { getOverrides, mergeOverrides } from '../helpers/overrides';
import DeleteAlt from '../icon/delete-alt';
import TriangleDownIcon from '../icon/triangle-down';
import SearchIconComponent from '../icon/search';
import { LocaleContext } from '../locale';
import type { Locale } from '../locale';
import { Popover, PLACEMENT, ACCESSIBILITY_TYPE } from '../popover';
import { UIDConsumer } from 'react-uid';

import AutosizeInput from './autosize-input';
import { TYPE, STATE_CHANGE_TYPE, SIZE } from './constants';
import defaultProps from './default-props';
import SelectDropdown from './dropdown';
import {
  StyledRoot,
  StyledControlContainer,
  StyledPlaceholder,
  StyledValueContainer,
  StyledInputContainer,
  StyledIconsContainer,
  StyledSearchIconContainer,
  StyledLoadingIndicator,
} from './styled-components';
import type { SelectProps, SelectState, Value, Option, ChangeAction } from './types';
import { expandValue, normalizeOptions } from './utils';

import type { SyntheticEvent, ChangeEvent } from 'react';

// @ts-ignore
function Noop() {
  return null;
}

// @ts-ignore
const isClick = (event) => event.type === 'click';
// @ts-ignore
const isLeftClick = (event) =>
  event.button !== null && event.button !== undefined && event.button === 0;

// @ts-ignore
const containsNode = (parent, child) => {
  if (__BROWSER__) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return child && parent && parent.contains(child as any);
  }
};

export function isInteractive(rootTarget: EventTarget, rootElement: Element) {
  if (rootTarget instanceof Element) {
    let target: Element | undefined | null = rootTarget;
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

class Select extends React.Component<SelectProps, SelectState> {
  static defaultProps = defaultProps;

  // anchor is a ref that refers to the outermost element rendered when the dropdown menu is not
  // open. This is required so that we can check if clicks are on/off the anchor element.
  anchor = React.createRef<HTMLElement>();
  // dropdown is a ref that refers to the popover element. This is required so that we can check if
  // clicks are on/off the dropdown element.
  dropdown = React.createRef<HTMLElement>();
  input?: HTMLInputElement;
  // dragging is a flag to track whether a mobile device is currently scrolling versus clicking.
  // @ts-ignore
  dragging: boolean;
  // focusAfterClear is a flag to indicate that the dropdowm menu should open after a selected
  // option has been cleared.
  // @ts-ignore
  focusAfterClear: boolean;
  // openAfterFocus is a flag to indicate that the dropdown menu should open when the component is
  // focused. Developers have the option to disable initial clicks opening the dropdown menu. If not
  // disabled, clicks will set this flag to true. Upon focusing, look to this to see if the menu should
  // be opened, or only focus.
  // @ts-ignore
  openAfterFocus: boolean;
  // When an item is selected, it also triggers handleClickOutside and since the selected item is
  // already out of the menu (DOM), it will not recognize it as a subnode and triggers handleBlur
  // that sets isOpen to false. That's a faulty logic causing visible problems when
  // closeOnSelect is false. This flag helps to detect that selection was just made.
  // @ts-ignore
  justSelected: boolean;

  // the select components can accept an array of options or an object where properties are optgroups
  // and values are arrays of options. this class property is constructed and updated in a normalized
  // shape where optgroup titles are stored on the option in the __optgroup field.
  options: Value = [];

  constructor(props: SelectProps) {
    super(props);
    this.options = normalizeOptions(props.options);
  }

  // @ts-ignore
  state = {
    // @ts-ignore
    activeDescendant: null,
    inputValue: '',
    isFocused: false,
    isOpen: this.props.startOpen,
    isPseudoFocused: false,
    openedViaKeyboard: false,
  };

  isItMounted = false;

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
    this.isItMounted = true;

    const { controlRef } = this.props;
    if (controlRef && typeof controlRef !== 'function') {
      controlRef.current = {
        setDropdownOpen: this.handleDropdownOpen.bind(this),
        setInputValue: this.handleSetInputValue.bind(this),
        setInputFocus: this.handleSetInputFocus.bind(this),
        setInputBlur: this.handleSetInputBlur.bind(this),
        // `focus` & `blur` below are for backwards compatibility and may be removed. Use setInputFocus and setInputBlur instead.
        focus: this.handleSetInputFocus.bind(this),
        blur: this.handleSetInputBlur.bind(this),
      };
    }
  }

  componentDidUpdate(prevProps: SelectProps, prevState: SelectState) {
    if (__BROWSER__) {
      if (prevState.isOpen !== this.state.isOpen) {
        if (this.state.isOpen) {
          this.props.onOpen && this.props.onOpen();
          document.addEventListener('touchstart', this.handleTouchOutside);
        } else {
          this.props.onClose && this.props.onClose();
          document.removeEventListener('touchstart', this.handleTouchOutside);
        }
      }

      if (!prevState.isFocused && this.state.isFocused) {
        setTimeout(() => document.addEventListener('click', this.handleClickOutside), 0);
      }
    }
  }

  componentWillUnmount() {
    if (__BROWSER__) {
      document.removeEventListener('touchstart', this.handleTouchOutside);
      document.removeEventListener('click', this.handleClickOutside);
    }
    this.isItMounted = false;
  }

  focus() {
    if (!this.input) return;
    this.input.focus();
  }

  handleDropdownOpen(nextOpenState: boolean) {
    this.setState({
      isOpen: nextOpenState,
    });
  }

  handleSetInputValue(newInputValue: string) {
    this.setState({
      inputValue: newInputValue,
    });
  }

  handleSetInputFocus() {
    // @ts-ignore
    this.input.focus();
  }

  handleSetInputBlur() {
    // @ts-ignore
    this.input.blur();
  }

  // Handle touch outside on mobile to dismiss menu, ensures that the
  // touch target is not within the anchor DOM node.
  handleTouchOutside = (event: TouchEvent) => {
    if (containsNode(this.dropdown.current, event.target)) return;
    if (!containsNode(this.anchor.current, event.target)) {
      this.closeMenu();
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

  handleClick = (event: MouseEvent | TouchEvent) => {
    if (this.props.disabled || (!isClick(event) && !isLeftClick(event))) {
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
        // @ts-ignore
        this.openAfterFocus = this.props.openOnClick;
        this.focus();
      }

      if (!this.state.isOpen) {
        this.setState({
          isOpen: true,
          isFocused: true,
          isPseudoFocused: false,
        });
      }

      return;
    }

    // Ensures that interactive elements within the Select component do not trigger the outer click
    // handler. For example, after an option is selected clicks on the 'clear' icon call here. We
    // should ignore those events. This comes after case where click is on input element, so that
    // those are handled on their own.
    // @ts-ignore
    if (this.input && isInteractive(event.target, this.input)) {
      return;
    }

    // For the simple case where clicking on the Select does not allow for providing
    // text input to filter the dropdown options.
    if (!this.props.searchable) {
      this.focus();
      if (this.state.isOpen) {
        this.setState({ isOpen: false, isFocused: false, openedViaKeyboard: false });
      } else {
        this.setState({ isOpen: true, isFocused: true, openedViaKeyboard: false });
      }

      return;
    }

    // Cases below only apply to searchable Select component.
    if (this.state.isFocused) {
      // iOS ignores programmatic calls to input.focus() that were not triggered by a click event.
      // This component can get into a state where isFocused is true, but the DOM node is not
      // focused. Call focus here again to ensure.
      this.focus();

      // Case comes up when click outside does not reset input - once text has been provided to
      // the input, and the user closes the dropdown menu the provided text is maintained. After
      // this, if the user focuses back into the select component then clicks on the component,
      // the provided text highlights rather than position's the cursor at the end of the input.
      if (this.input) this.input.value = '';

      this.setState((prev) => ({
        isOpen: !this.focusAfterClear && !prev.isOpen,
        isPseudoFocused: false,
      }));

      this.focusAfterClear = false;
    } else {
      // When clear button is clicked, need to click twice to open control container - https://github.com/uber/baseweb/issues/4285
      // Setting focusAfterClear to false, resolves the issue
      this.focusAfterClear = false;
      // @ts-ignore
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
        openedViaKeyboard: false,
      });
    } else {
      this.setState({
        isOpen: false,
        isPseudoFocused: this.state.isFocused && !this.props.multi,
        openedViaKeyboard: false,
      });
    }
  }

  handleInputFocus = (event: SyntheticEvent<HTMLElement>) => {
    if (this.props.disabled) return;
    if (this.props.onFocus) this.props.onFocus(event);

    let toOpen = this.state.isOpen || this.openAfterFocus;
    // if focus happens after clear values, don't open dropdown yet.
    toOpen = !this.focusAfterClear && toOpen;

    this.setState({
      isFocused: true,
      isOpen: !!toOpen,
      openedViaKeyboard: false,
    });

    this.focusAfterClear = false;
    this.openAfterFocus = false;
  };

  handleBlur = (event: React.FocusEvent | MouseEvent) => {
    if (event.relatedTarget) {
      if (
        containsNode(this.anchor.current, event.relatedTarget) ||
        containsNode(this.dropdown.current, event.relatedTarget)
      ) {
        return;
      }
    } else if (containsNode(this.anchor.current, event.target)) {
      return;
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    if (this.isItMounted) {
      this.setState({
        isFocused: false,
        isOpen: false,
        isPseudoFocused: false,
        inputValue: this.props.onBlurResetsInput ? '' : this.state.inputValue,
        openedViaKeyboard: false,
      });
    }
  };

  handleClickOutside = (event: MouseEvent) => {
    if (this.justSelected) {
      this.justSelected = false;
      return;
    }
    if (containsNode(this.dropdown.current, event.target)) return;

    const isFocused = this.state.isFocused || this.state.isPseudoFocused;
    if (isFocused && !containsNode(this.anchor.current, event.target)) {
      this.handleBlur(event);
    }
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newInputValue = event.target.value;
    this.setState({
      inputValue: newInputValue,
      isOpen: true,
      isPseudoFocused: false,
      openedViaKeyboard: false,
    });
    if (this.props.onInputChange) {
      this.props.onInputChange(event);
    }
  };

  handleKeyDown = (event: KeyboardEvent) => {
    if (this.props.disabled) return;
    switch (event.keyCode) {
      case 8: // backspace
        if (!this.state.inputValue && this.props.clearable && this.props.backspaceRemoves) {
          event.preventDefault();
          this.backspaceValue();
        }
        break;
      case 9: // tab
        this.setState((prevState) => ({
          isPseudoFocused: false,
          isFocused: false,
          isOpen: false,
          openedViaKeyboard: false,
          inputValue:
            !this.props.onCloseResetsInput || !this.props.onBlurResetsInput
              ? prevState.inputValue
              : '',
        }));
        break;
      case 27: // escape
        if (!this.state.isOpen && this.props.clearable && this.props.escapeClearsValue) {
          this.clearValue(event);
          this.setState({ isFocused: false, isPseudoFocused: false });
        }
        break;
      case 32: // space
        if (this.props.searchable) {
          break;
        }
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({ isOpen: true, openedViaKeyboard: true });
        }
        break;
      case 38: // up
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({ isOpen: true, openedViaKeyboard: true });
        }
        break;
      case 40: // down
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({ isOpen: true, openedViaKeyboard: true });
        }
        break;
      case 33: // page up
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({ isOpen: true, openedViaKeyboard: true });
        }
        break;
      case 34: // page down
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({ isOpen: true, openedViaKeyboard: true });
        }
        break;
      case 35: // end key
        if (event.shiftKey) {
          break;
        }
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({ isOpen: true, openedViaKeyboard: true });
        }
        break;
      case 36: // home key
        if (event.shiftKey) {
          break;
        }
        event.preventDefault();
        if (!this.state.isOpen) {
          this.setState({ isOpen: true, openedViaKeyboard: true });
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

  getOptionLabel = (
    locale: Locale,
    {
      option,
    }: {
      option: Option;
      optionState: {
        $selected: boolean;
        $disabled: boolean;
        $isHighlighted: boolean;
      };
    }
  ): React.ReactNode =>
    option.isCreatable
      ? // @ts-ignore
        `${locale.select.create} “${option[this.props.labelKey]}”`
      : // @ts-ignore
        option[this.props.labelKey];

  getValueLabel = ({ option }: { option: Option }): React.ReactNode => {
    // @ts-ignore
    return option[this.props.labelKey];
  };

  /**
   * Extends the value into an array from the given options
   */
  getValueArray(value: Value): Array<Option> {
    if (!Array.isArray(value)) {
      if (value === null || value === undefined) return [];
      value = [value];
    }
    return value.map((value) => expandValue(value, this.props));
  }

  setValue(value: Value, option: Option | undefined | null, type: ChangeAction) {
    if (this.props.onChange) {
      this.props.onChange({
        value,
        option,
        type,
      });
    }
  }

  handleActiveDescendantChange = (id?: string) => {
    if (id) {
      this.setState({ activeDescendant: id });
    } else {
      this.setState({ activeDescendant: null });
    }
  };

  handleInputRef = (input: HTMLInputElement) => {
    this.input = input;

    if (typeof this.props.inputRef === 'function') {
      this.props.inputRef(input);
    } else if (this.props.inputRef) {
      // @ts-expect-error todo(flow->ts) MutableRefObject
      this.props.inputRef.current = input;
    }

    if (this.props.controlRef && typeof this.props.controlRef === 'function') {
      // @ts-expect-error todo(flow->ts) according to types this code is not reachable
      this.props.controlRef(input);
    }
  };

  selectValue = ({ item }: { item: Option }) => {
    if (item.disabled) {
      return;
    }
    this.justSelected = true;
    // NOTE: we add/set the value in a callback to make sure the
    // input value is empty to avoid styling issues in Chrome
    const updatedValue = this.props.onSelectResetsInput ? '' : this.state.inputValue;
    if (this.props.multi) {
      this.setState(
        {
          inputValue: updatedValue,
          isOpen: !this.props.closeOnSelect,
        },
        () => {
          const valueArray = this.props.value;
          // @ts-ignore
          if (valueArray.some((i) => i[this.props.valueKey] === item[this.props.valueKey])) {
            this.removeValue(item);
          } else {
            this.addValue(item);
          }
        }
      );
    } else {
      this.focus();
      this.setState(
        {
          inputValue: updatedValue,
          isOpen: !this.props.closeOnSelect,
          isFocused: true,
          isPseudoFocused: false,
        },
        () => {
          this.setValue([item], item, STATE_CHANGE_TYPE.select);
        }
      );
    }
  };

  addValue = (item: Option) => {
    const valueArray = [...this.props.value];
    this.setValue(valueArray.concat(item), item, STATE_CHANGE_TYPE.select);
  };

  backspaceValue = () => {
    const item = this.popValue();
    if (!item) {
      return;
    }
    // @ts-ignore
    const valueLength = this.props.value.length;
    const renderLabel = this.props.getValueLabel || this.getValueLabel;
    const labelForInput = renderLabel({ option: item, index: valueLength - 1 });
    // label might not be a string, it might be a Node of another kind.
    if (!this.props.backspaceClearsInputValue && typeof labelForInput === 'string') {
      const remainingInput = labelForInput.slice(0, -1);
      this.setState({
        inputValue: remainingInput,
        isOpen: true,
      });
    }
  };

  popValue = () => {
    // @ts-ignore
    const valueArray = [...this.props.value];
    const valueLength = valueArray.length;
    if (!valueLength) return;
    if (valueArray[valueLength - 1].clearableValue === false) return;
    const item = valueArray.pop();
    this.setValue(valueArray, item, STATE_CHANGE_TYPE.remove);
    return item;
  };

  removeValue = (item: Option) => {
    const valueArray = [...this.props.value];
    this.setValue(
      // @ts-ignore
      valueArray.filter((i) => i[this.props.valueKey] !== item[this.props.valueKey]),
      item,
      STATE_CHANGE_TYPE.remove
    );
    this.focus();
  };

  clearValue = (event: KeyboardEvent | MouseEvent | TouchEvent) => {
    if (isClick(event) && !isLeftClick(event)) return;

    if (this.props.value) {
      const resetValue = this.props.value.filter((item) => item.clearableValue === false);
      this.setValue(resetValue, null, STATE_CHANGE_TYPE.clear);
    }
    this.setState({
      inputValue: '',
      isOpen: false,
      openedViaKeyboard: false,
    });

    this.focus();
    this.focusAfterClear = true;
  };

  shouldShowPlaceholder = () => {
    return !(this.state.inputValue || (this.props.value && this.props.value.length));
  };

  shouldShowValue = () => {
    return !this.state.inputValue;
  };

  renderLoading() {
    if (!this.props.isLoading) return;
    const { overrides = {} } = this.props;
    const [LoadingIndicator, loadingIndicatorProps] = getOverrides(
      overrides.LoadingIndicator,
      StyledLoadingIndicator
    );

    return (
      <LoadingIndicator role="status" {...loadingIndicatorProps}>
        {/* Offscreen content could be defined as styled-component and
          overridable, but I can't think of a good reason for doing so.
          LoadingIndicator children can be overriden if required. */}
        <span
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap',
            border: 0,
          }}
        >
          Loading
        </span>
      </LoadingIndicator>
    );
  }

  renderValue(
    valueArray: Value
  ): React.ReactNode | undefined | null | Array<React.ReactNode | undefined | null> {
    const { overrides = {} } = this.props;
    const sharedProps = this.getSharedProps();
    const renderLabel = this.props.getValueLabel || this.getValueLabel;
    const Value = this.props.valueComponent || Noop;
    if (!valueArray.length) {
      return null;
    }
    if (this.props.multi) {
      return valueArray.map((value, i) => {
        const disabled = sharedProps.$disabled || value.clearableValue === false;
        return (
          <Value
            value={value}
            // @ts-ignore
            key={`value-${i}-${value[this.props.valueKey]}`}
            removeValue={() => this.removeValue(value)}
            disabled={disabled}
            overrides={{ Tag: overrides.Tag, MultiValue: overrides.MultiValue }}
            {...sharedProps}
            $disabled={disabled}
          >
            {renderLabel({ option: value, index: i })}
          </Value>
        );
      });
    } else if (this.shouldShowValue()) {
      return (
        <Value
          // @ts-ignore
          value={valueArray[0][this.props.valueKey]}
          disabled={this.props.disabled}
          overrides={{ SingleValue: overrides.SingleValue }}
          {...sharedProps}
        >
          {renderLabel({ option: valueArray[0] })}
        </Value>
      );
    }
  }

  renderInput(listboxId: string) {
    const { overrides = {} } = this.props;
    const [InputContainer, inputContainerProps] = getOverrides(
      overrides.InputContainer,
      StyledInputContainer
    );
    const sharedProps = this.getSharedProps();
    const isOpen = this.state.isOpen;
    // @ts-ignore
    const selected = this.getValueArray(this.props.value)
      // @ts-ignore
      .map((v) => v[this.props.labelKey])
      .join(', ');
    const selectedLabel = selected.length ? `Selected ${selected}. ` : '';
    const label = `${selectedLabel}${this.props['aria-label'] || ''}`;

    if (!this.props.searchable) {
      return (
        <InputContainer
          aria-activedescendant={this.state.activeDescendant}
          aria-describedby={this.props['aria-describedby']}
          aria-errormessage={this.props['aria-errormessage']}
          aria-disabled={this.props.disabled}
          aria-labelledby={this.props['aria-labelledby']}
          aria-label={label}
          aria-owns={this.state.isOpen ? listboxId : null}
          aria-required={this.props.required || null}
          onFocus={this.handleInputFocus}
          tabIndex={0}
          {...sharedProps}
          {...inputContainerProps}
        >
          {/* $FlowExpectedError[cannot-spread-inexact] */}
          <input
            aria-hidden
            role="combobox"
            // @ts-ignore
            id={this.props.id || null}
            ref={this.handleInputRef}
            style={{
              opacity: 0,
              width: 0,
              overflow: 'hidden',
              border: 'none',
              padding: 0,
            }}
            tabIndex={-1}
            {...(overrides.Input
              ? overrides.Input.props
                ? // $FlowExpectedError[not-an-object]
                  overrides.Input.props
                : {}
              : {})}
          />
        </InputContainer>
      );
    }

    return (
      <InputContainer {...sharedProps} {...inputContainerProps}>
        {/* @ts-ignore */}
        <AutosizeInput
          aria-activedescendant={this.state.activeDescendant}
          aria-autocomplete="list"
          aria-controls={this.state.isOpen ? listboxId : null}
          aria-describedby={this.props['aria-describedby']}
          aria-errormessage={this.props['aria-errormessage']}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={label}
          aria-labelledby={this.props['aria-labelledby']}
          aria-required={this.props.required || null}
          disabled={this.props.disabled || null}
          id={this.props.id || null}
          inputRef={this.handleInputRef}
          onChange={this.handleInputChange}
          onFocus={this.handleInputFocus}
          overrides={{ Input: overrides.Input }}
          // @ts-ignore
          required={(this.props.required && !this.props.value.length) || null}
          role="combobox"
          value={this.state.inputValue}
          tabIndex={0}
          {...sharedProps}
        />
      </InputContainer>
    );
  }

  renderClear() {
    const isValueEntered = Boolean(
      (this.props.value && this.props.value.length) || this.state.inputValue
    );

    if (!this.props.clearable || this.props.disabled || this.props.isLoading || !isValueEntered) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $size, ...sharedProps } = this.getSharedProps();
    const { overrides = {} } = this.props;
    const [ClearIcon, clearIconProps] = getOverrides(overrides.ClearIcon, DeleteAlt);

    const ariaLabel = this.props.multi ? 'Clear all' : 'Clear value';
    const sizes = {
      [SIZE.mini]: 15,
      [SIZE.compact]: 15,
      [SIZE.default]: 18,
      [SIZE.large]: 22,
    };

    return (
      <ClearIcon
        title={ariaLabel}
        aria-label={ariaLabel}
        onClick={this.clearValue}
        role="button"
        // @ts-ignore
        size={sizes[this.props.size] || sizes[SIZE.default]}
        {...sharedProps}
        {...clearIconProps}
      />
    );
  }

  renderArrow() {
    if (this.props.type !== TYPE.select) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { $size, ...sharedProps } = this.getSharedProps();
    const { overrides = {} } = this.props;
    const [SelectArrow, selectArrowProps] = getOverrides(overrides.SelectArrow, TriangleDownIcon);
    selectArrowProps.overrides = mergeOverrides(
      {
        Svg: {
          style: ({ $theme, $disabled }) => {
            return {
              color: $disabled ? $theme.colors.inputTextDisabled : $theme.colors.contentPrimary,
            };
          },
        },
      },
      selectArrowProps.overrides
    );

    const sizes = {
      [SIZE.mini]: 16,
      [SIZE.compact]: 16,
      [SIZE.default]: 20,
      [SIZE.large]: 24,
    };

    return (
      <SelectArrow
        // @ts-ignore
        size={sizes[this.props.size] || sizes[SIZE.default]}
        title={'open'}
        {...sharedProps}
        {...selectArrowProps}
      />
    );
  }

  renderSearch() {
    if (this.props.type !== TYPE.search) {
      return null;
    }
    const { overrides = {} } = this.props;
    const [SearchIconContainer, searchIconContainerProps] = getOverrides(
      overrides.SearchIconContainer,
      StyledSearchIconContainer
    );
    const [SearchIcon, searchIconProps] = getOverrides(overrides.SearchIcon, SearchIconComponent);
    const sharedProps = this.getSharedProps();

    return (
      <SearchIconContainer {...sharedProps} {...searchIconContainerProps}>
        <SearchIcon size={16} title={'search'} {...sharedProps} {...searchIconProps} />
      </SearchIconContainer>
    );
  }

  filterOptions(excludeOptions?: Value | null) {
    const filterValue = this.state.inputValue.trim();
    // apply filter function
    if (this.props.filterOptions) {
      this.options = this.props.filterOptions(this.options, filterValue, excludeOptions, {
        // @ts-ignore
        valueKey: this.props.valueKey,
        // @ts-ignore
        labelKey: this.props.labelKey,
      });
    }
    // can user create a new option + there's no exact match already
    const filterDoesNotMatchOption = this.props.ignoreCase
      ? // @ts-ignore
        (opt) => opt[this.props.labelKey].toLowerCase() !== filterValue.toLowerCase().trim()
      : // @ts-ignore
        (opt) => opt[this.props.labelKey] !== filterValue.trim();
    if (
      filterValue &&
      this.props.creatable &&
      // @ts-ignore
      this.options.concat(this.props.value).every(filterDoesNotMatchOption)
    ) {
      // @ts-expect-error todo(flow->ts) this.options is typed as a read-only array
      this.options.push({
        id: filterValue,
        // @ts-ignore
        [this.props.labelKey]: filterValue,
        // @ts-ignore
        [this.props.valueKey]: filterValue,
        isCreatable: true,
      });
    }
    return this.options;
  }

  getSharedProps() {
    const {
      clearable,
      creatable,
      disabled,
      error,
      positive,
      isLoading,
      multi,
      required,
      size,
      searchable,
      type,
      value,
    } = this.props;
    const { isOpen, isFocused, isPseudoFocused } = this.state;
    return {
      $clearable: clearable,
      $creatable: creatable,
      $disabled: disabled,
      $error: error,
      $positive: positive,
      $isFocused: isFocused,
      $isLoading: isLoading,
      $isOpen: isOpen,
      $isPseudoFocused: isPseudoFocused,
      $multi: multi,
      $required: required,
      $searchable: searchable,
      $size: size,
      $type: type,
      // @ts-ignore
      $isEmpty: !this.getValueArray(value).length,
    };
  }

  render() {
    this.options = normalizeOptions(this.props.options);

    const { overrides = {}, type, multi, noResultsMsg, value, filterOutSelected } = this.props;

    if (__DEV__) {
      // value may be nullish, only warn if value is defined
      if (value && !Array.isArray(value)) {
        console.warn(
          'The Select component expects an array as the value prop. For more information, please visit the docs at https://baseweb.design/components/select/'
        );
      }
    }

    const [Root, rootProps] = getOverrides(overrides.Root, StyledRoot);
    const [ControlContainer, controlContainerProps] = getOverrides(
      overrides.ControlContainer,
      StyledControlContainer
    );
    const [ValueContainer, valueContainerProps] = getOverrides(
      overrides.ValueContainer,
      StyledValueContainer
    );
    const [IconsContainer, iconsContainerProps] = getOverrides(
      overrides.IconsContainer,
      StyledIconsContainer
    );
    const [PopoverOverride, popoverProps] = getOverrides(overrides.Popover, Popover);
    const [Placeholder, placeholderProps] = getOverrides(overrides.Placeholder, StyledPlaceholder);
    const sharedProps = this.getSharedProps();

    // @ts-ignore
    const valueArray = this.getValueArray(value);
    const options = this.filterOptions(multi && filterOutSelected ? valueArray : null);
    const isOpen = this.state.isOpen;
    sharedProps.$isOpen = isOpen;

    if (__DEV__) {
      if (this.props.error && this.props.positive) {
        // eslint-disable-next-line no-console
        console.warn(
          `[Select] \`error\` and \`positive\` are both set to \`true\`. \`error\` will take precedence but this may not be what you want.`
        );
      }
    }

    return (
      <UIDConsumer>
        {(listboxId: string) => (
          <LocaleContext.Consumer>
            {(locale) => (
              <PopoverOverride
                // Popover does not provide ability to forward refs through, and if we were to simply
                // apply the ref to the Root component below it would be overwritten before the popover
                // renders it. Using this strategy, we will get a ref to the popover, then reuse its
                // anchorRef so we can check if clicks are on the select component or not.
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                innerRef={(ref: any) => {
                  if (!ref) return;
                  this.anchor = ref.anchorRef;
                }}
                accessibilityType={ACCESSIBILITY_TYPE.none}
                autoFocus={false}
                focusLock={false}
                mountNode={this.props.mountNode}
                onEsc={() => this.closeMenu()}
                isOpen={isOpen}
                popoverMargin={0}
                content={() => {
                  const dropdownProps = {
                    error: this.props.error,
                    positive: this.props.positive,
                    getOptionLabel:
                      this.props.getOptionLabel || this.getOptionLabel.bind(this, locale),
                    id: listboxId,
                    isLoading: this.props.isLoading,
                    labelKey: this.props.labelKey,
                    maxDropdownHeight: this.props.maxDropdownHeight,
                    multi,
                    noResultsMsg,
                    onActiveDescendantChange: this.handleActiveDescendantChange,
                    onItemSelect: this.selectValue,
                    options,
                    overrides,
                    required: this.props.required,
                    searchable: this.props.searchable,
                    size: this.props.size,
                    type,
                    value: valueArray,
                    valueKey: this.props.valueKey,
                    width: this.anchor.current ? this.anchor.current.clientWidth : null,
                    keyboardControlNode: this.anchor,
                    openedViaKeyboard: this.state.openedViaKeyboard,
                  };

                  // @ts-ignore
                  return <SelectDropdown innerRef={this.dropdown} {...dropdownProps} />;
                }}
                placement={PLACEMENT.bottom}
                {...popoverProps}
              >
                <Root
                  onBlur={this.handleBlur}
                  data-baseweb="select"
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
                      {this.renderValue(valueArray)}
                      {this.renderInput(listboxId)}
                      {this.shouldShowPlaceholder() ? (
                        <Placeholder {...sharedProps} {...placeholderProps}>
                          {typeof this.props.placeholder !== 'undefined'
                            ? this.props.placeholder
                            : locale.select.placeholder}
                        </Placeholder>
                      ) : null}
                    </ValueContainer>

                    <IconsContainer {...sharedProps} {...iconsContainerProps}>
                      {this.renderLoading()}
                      {this.renderClear()}
                      {type === TYPE.select ? this.renderArrow() : null}
                    </IconsContainer>
                  </ControlContainer>
                </Root>
              </PopoverOverride>
            )}
          </LocaleContext.Consumer>
        )}
      </UIDConsumer>
    );
  }
}

export default Select;
