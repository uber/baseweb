/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* eslint-disable cup/no-undef */
import * as React from 'react';

import {getOverrides} from '../helpers/overrides.js';
import DeleteAlt from '../icon/delete-alt.js';
import TriangleDownIcon from '../icon/triangle-down.js';
import SearchIconComponent from '../icon/search.js';
import {LocaleContext} from '../locale/index.js';
import type {LocaleT} from '../locale/types.js';
import {Popover, PLACEMENT} from '../popover/index.js';
import {Spinner} from '../spinner/index.js';
import getBuiId from '../utils/get-bui-id.js';

import AutosizeInput from './autosize-input.js';
import {TYPE, STATE_CHANGE_TYPE, SIZE} from './constants.js';
import SelectDropdown from './dropdown.js';
import defaultFilterOptions from './utils/default-filter-options.js';
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
  StyledSearchIconContainer,
} from './styled-components.js';
import type {PropsT, ValueT, OptionT, ChangeActionT} from './types.js';
import {expandValue, normalizeOptions} from './utils/index.js';

function Noop() {
  return null;
}

const isClick = event => event.type === 'click';
const isLeftClick = event =>
  event.button !== null && event.button !== undefined && event.button === 0;

const containsNode = (parent, child) => {
  if (__BROWSER__) {
    // eslint-disable-next-line flowtype/no-weak-types
    return child && parent && parent.contains((child: any));
  }
};

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

// eslint-disable-next-line flowtype/no-weak-types
function Select({
  // 'aria-label' = null,
  // 'aria-describedby' = null,
  // 'aria-errormessage' = null,
  // 'aria-labelledby' = null,
  autoFocus = false,
  backspaceRemoves = true,
  clearable = true,
  closeOnSelect = true,
  creatable = false,
  deleteRemoves = true,
  disabled = false,
  error = false,
  positive = false,
  escapeClearsValue = true,
  filterOptions = defaultFilterOptions,
  filterOutSelected = true,
  getValueLabel = null,
  ignoreCase = true,
  isLoading = false,
  labelKey = 'label',
  maxDropdownHeight = '900px',
  multi = false,
  onBlur = () => {},
  onBlurResetsInput = true,
  onChange = () => {},
  onFocus = () => {},
  onInputChange = () => {},
  onCloseResetsInput = true,
  onSelectResetsInput = true,
  onOpen = null,
  onClose = null,
  openOnClick = true,
  startOpen = false,
  overrides = {},
  required = false,
  searchable = true,
  size = SIZE.default,
  type = TYPE.select,
  value = [],
  valueKey = 'id',
  ...restProps
}: PropsT) {
  // anchor is a ref that refers to the outermost element rendered when the dropdown menu is not
  // open. This is required so that we can check if clicks are on/off the anchor element.
  const anchor: {current: HTMLElement | null} = React.useRef(null);
  // dropdown is a ref that refers to the popover element. This is required so that we can check if
  // clicks are on/off the dropdown element.
  const dropdown: {current: HTMLElement | null} = React.useRef(null);
  const input: React.ElementRef<*> = React.useRef();
  // dragging is a flag to track whether a mobile device is currently scrolling versus clicking.
  const dragging = React.useRef(false);
  // focusAfterClear is a flag to indicate that the dropdowm menu should open after a selected
  // option has been cleared.
  const focusAfterClear = React.useRef(false);
  // openAfterFocus is a flag to indicate that the dropdown menu should open when the component is
  // focused. Developers have the option to disable initial clicks opening the dropdown menu. If not
  // disabled, clicks will set this flag to true. Upon focusing, look to this to see if the menu should
  // be opened, or only focus.
  const openAfterFocus = React.useRef(false);
  // When an item is selected, it also triggers handleClickOutside and since the selected item is
  // already out of the menu (DOM), it will not recognize it as a subnode and triggers handleBlur
  // that sets isOpen to false. That's a faulty logic causing visible problems when
  // closeOnSelect is false. This flag helps to detect that selection was just made.
  const justSelected = React.useRef(false);

  // id generated for the listbox. used by screenreaders to associate the input with the menu it controls
  const listboxId = React.useRef(getBuiId());

  const isMounted = React.useRef(false);

  // the select components can accept an array of options or an object where properties are optgroups
  // and values are arrays of options. this class property is constructed and updated in a normalized
  // shape where optgroup titles are stored on the option in the __optgroup field.
  const options = React.useRef<ValueT>(
    normalizeOptions(restProps.options || []),
  );

  const [activeDescendant, setActiveDescendant] = React.useState(null);
  const [inputValue, setInputValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(startOpen);
  const [isPseudoFocused, setIsPseudoFocused] = React.useState(false);

  React.useEffect(() => {
    if (autoFocus) {
      focus();
    }
    isMounted.current = true;
    return () => {
      if (__BROWSER__) {
        document.removeEventListener('touchstart', handleTouchOutside);
        document.removeEventListener('click', handleClickOutside);
      }
      isMounted.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (__BROWSER__) {
      if (isOpen) {
        onOpen && onOpen();
        document.addEventListener('touchstart', handleTouchOutside);
      } else {
        onClose && onClose();
        document.removeEventListener('touchstart', handleTouchOutside);
      }
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (__BROWSER__) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [isFocused]);

  const focus = () => {
    if (!input.current) return;
    input.current.focus();
  };

  // Handle touch outside on mobile to dismiss menu, ensures that the
  // touch target is not within the anchor DOM node.
  const handleTouchOutside = (event: TouchEvent) => {
    if (containsNode(dropdown.current, event.target)) return;
    if (!containsNode(anchor.current, event.target)) {
      closeMenu();
    }
  };

  // Track dragging state to filter false-positive actions where a user
  // intends to drag/scroll the page.
  const handleTouchMove = () => (dragging.current = true);
  const handleTouchStart = () => (dragging.current = false);
  const handleTouchEnd = (event: TouchEvent) => {
    if (dragging.current) return;
    handleClick(event);
  };

  const handleTouchEndClearValue = (event: TouchEvent) => {
    if (dragging.current) return;
    clearValue(event);
  };

  const handleClick = (event: MouseEvent | TouchEvent) => {
    if (disabled || (!isClick(event) && !isLeftClick(event))) {
      return;
    }

    // Case comes up when text has been typed into the input field. If no text provided,
    // the 'input' element will have essentially 0 width therefore will not be clickable.
    // When click outside does not reset input, text provided will stay rendered after clicks away
    // from the select component. Upon subsequent clicks on the provided text, open the dropdown
    // menu, in addition to text edit operations.
    if (event.target === input.current) {
      // CHASE: not sure why this condition is here. I cannot replicate a situation where clicks
      // on provided text break into here.
      if (!isFocused) {
        openAfterFocus.current = openOnClick;
        focus();
        return;
      }

      if (!isOpen) {
        setIsOpen(true);
        setIsPseudoFocused(false);
        return;
      }
    }

    // Ensures that interactive elements within the Select component do not trigger the outer click
    // handler. For example, after an option is selected clicks on the 'clear' icon call here. We
    // should ignore those events. This comes after case where click is on input element, so that
    // those are handled on their own.
    if (input.current && isInteractive(event.target, input.current)) {
      return;
    }

    // For the simple case where clicking on the Select does not allow for providing
    // text input to filter the dropdown options.
    if (!searchable) {
      focus();
      setIsOpen(!isOpen);
      return;
    }

    // Cases below only apply to searchable Select component.
    if (isFocused) {
      // iOS ignores programmatic calls to input.focus() that were not triggered by a click event.
      // This component can get into a state where isFocused is true, but the DOM node is not
      // focused. Call focus here again to ensure.
      focus();

      // Case comes up when click outside does not reset input - once text has been provided to
      // the input, and the user closes the dropdown menu the provided text is maintained. After
      // this, if the user focuses back into the select component then clicks on the component,
      // the provided text highlights rather than position's the cursor at the end of the input.
      if (input.current) input.current.value = '';

      setIsOpen(!focusAfterClear.current && !isOpen);
      setIsPseudoFocused(false);
      focusAfterClear.current = false;
    } else {
      openAfterFocus.current = openOnClick;
      focus();
    }
  };

  const closeMenu = () => {
    if (onCloseResetsInput) {
      setInputValue('');
      setIsOpen(false);
      setIsPseudoFocused(isFocused && !multi);
    } else {
      setIsOpen(false);
      setIsPseudoFocused(isFocused && !multi);
    }
  };

  const handleInputFocus = (event: SyntheticEvent<HTMLElement>) => {
    if (disabled) return;
    if (onFocus) onFocus(event);

    let toOpen = isOpen || openAfterFocus.current;
    // if focus happens after clear values, don't open dropdown yet.
    toOpen = !focusAfterClear.current && toOpen;

    setIsFocused(true);
    setIsOpen(!!toOpen);

    focusAfterClear.current = false;
    openAfterFocus.current = false;
  };

  const handleBlur = (event: FocusEvent | MouseEvent) => {
    if (event.relatedTarget) {
      if (
        containsNode(anchor.current, event.relatedTarget) ||
        containsNode(dropdown.current, event.relatedTarget)
      ) {
        return;
      }
    } else if (containsNode(anchor.current, event.target)) {
      return;
    }

    if (onBlur) {
      onBlur(event);
    }

    if (isMounted.current) {
      setIsFocused(false);
      setIsOpen(false);
      setIsPseudoFocused(false);
      setInputValue(onBlurResetsInput ? '' : inputValue);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (justSelected.current) {
      justSelected.current = false;
      return;
    }
    if (containsNode(dropdown.current, event.target)) return;

    if (
      (isFocused || isPseudoFocused) &&
      !containsNode(anchor.current, event.target)
    ) {
      handleBlur(event);
    }
  };

  const handleInputChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    let newInputValue = event.target.value;
    setInputValue(newInputValue);
    setIsOpen(true);
    setIsPseudoFocused(false);
    if (onInputChange) {
      onInputChange(event);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (disabled) return;
    switch (event.keyCode) {
      case 8: // backspace
        if (!inputValue && backspaceRemoves) {
          event.preventDefault();
          backspaceValue();
        }
        break;
      case 9: // tab
        setIsPseudoFocused(false);
        setIsFocused(false);
        setIsOpen(false);
        setInputValue(
          !onCloseResetsInput || !onBlurResetsInput ? inputValue : '',
        );
        break;
      case 27: // escape
        if (!isOpen && clearable && escapeClearsValue) {
          clearValue(event);
          setIsFocused(false);
          setIsPseudoFocused(false);
        }
        break;
      case 32: // space
        if (searchable) {
          break;
        }
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 38: // up
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 40: // down
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 33: // page up
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 34: // page down
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 35: // end key
        if (event.shiftKey) {
          break;
        }
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 36: // home key
        if (event.shiftKey) {
          break;
        }
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 46: // delete
        if (!inputValue && deleteRemoves) {
          event.preventDefault();
          popValue();
        }
        break;
    }
  };

  const getOptionLabel = (
    locale: LocaleT,
    {
      option,
    }: {
      option: OptionT,
      optionState: {
        $selected: boolean,
        $disabled: boolean,
        $isHighlighted: boolean,
      },
    },
  ): React.Node =>
    option.isCreatable
      ? `${locale.select.create} “${option[labelKey]}”`
      : option[labelKey];

  const renderGetValueLabel = ({option}: {option: OptionT}): React.Node => {
    return option[labelKey];
  };

  /**
   * Extends the value into an array from the given options
   */
  const getValueArray = (value: ValueT): Array<OptionT> => {
    if (!Array.isArray(value)) {
      if (value === null || value === undefined) return [];
      value = [value];
    }
    return value.map(value => expandValue(value, restProps.options, valueKey));
  };

  const setValue = (value: ValueT, option: ?OptionT, type: ChangeActionT) => {
    if (onChange) {
      onChange({
        value,
        option,
        type,
      });
    }
  };

  const handleActiveDescendantChange = (id?: string) => {
    if (id) {
      setActiveDescendant(id);
    } else {
      setActiveDescendant(null);
    }
  };

  const handleInputRef = (_input: React.ElementRef<*>) => {
    input.current = _input;
    if (restProps.controlRef) {
      if (typeof restProps.controlRef === 'function') {
        restProps.controlRef(_input);
      } else {
        restProps.controlRef.current = _input;
      }
    }
  };

  const selectValue = ({item}: {item: OptionT}) => {
    if (item.disabled) {
      return;
    }
    justSelected.current = true;
    // NOTE: we add/set the value in a callback to make sure the
    // input value is empty to avoid styling issues in Chrome
    const updatedValue = onSelectResetsInput ? '' : inputValue;
    if (multi) {
      setInputValue(updatedValue);
      setIsOpen(!closeOnSelect);
      const valueArray = value;
      if (valueArray.some(i => i[valueKey] === item[valueKey])) {
        removeValue(item);
      } else {
        addValue(item);
      }
    } else {
      focus();
      setInputValue(updatedValue);
      setIsOpen(!closeOnSelect);
      setIsFocused(true);
      setIsPseudoFocused(false);
      setValue([item], item, STATE_CHANGE_TYPE.select);
    }
  };

  const addValue = (item: OptionT) => {
    const valueArray = [...value];
    setValue(valueArray.concat(item), item, STATE_CHANGE_TYPE.select);
  };

  const backspaceValue = () => {
    const item = popValue();
    if (!item) {
      return;
    }
    const valueLength = value.length;
    const renderLabel = getValueLabel || renderGetValueLabel;
    const labelForInput = renderLabel({option: item, index: valueLength - 1});
    // label might not be a string, it might be a Node of another kind.
    if (
      !restProps.backspaceClearsInputValue &&
      typeof labelForInput === 'string'
    ) {
      const remainingInput = labelForInput.slice(0, -1);
      setInputValue(remainingInput);
      setIsOpen(true);
    }
  };

  const popValue = () => {
    const valueArray = [...value];
    const valueLength = valueArray.length;
    if (!valueLength) return;
    if (valueArray[valueLength - 1].clearableValue === false) return;
    const item = valueArray.pop();
    setValue(valueArray, item, STATE_CHANGE_TYPE.remove);
    return item;
  };

  const removeValue = (item: OptionT) => {
    const valueArray = [...value];
    setValue(
      valueArray.filter(i => i[valueKey] !== item[valueKey]),
      item,
      STATE_CHANGE_TYPE.remove,
    );
    focus();
  };

  const clearValue = (event: KeyboardEvent | MouseEvent | TouchEvent) => {
    if (isClick(event) && !isLeftClick(event)) return;

    if (value) {
      const resetValue = value.filter(item => item.clearableValue === false);
      setValue(resetValue, null, STATE_CHANGE_TYPE.clear);
    }
    setInputValue('');
    setIsOpen(false);
    focus();
    focusAfterClear.current = true;
  };

  const shouldShowPlaceholder = () => {
    return !(inputValue || (value && value.length));
  };

  const shouldShowValue = () => {
    return !inputValue;
  };

  const renderLoading = () => {
    if (!isLoading) return;
    const sharedProps = getSharedProps();
    const [LoadingIndicator, loadingIndicatorProps] = getOverrides(
      overrides.LoadingIndicator,
      Spinner,
    );
    return (
      <LoadingIndicator
        size={16}
        overrides={{Svg: {style: getLoadingIconStyles}}}
        $silenceV11DeprecationWarning
        {...sharedProps}
        {...loadingIndicatorProps}
      />
    );
  };

  const renderValue = (
    valueArray: ValueT,
    isOpen: boolean,
    locale: LocaleT,
  ): ?React.Node | Array<?React.Node> => {
    const sharedProps = getSharedProps();
    const renderLabel = getValueLabel || renderGetValueLabel;
    const Value = restProps.valueComponent || Noop;
    if (!valueArray.length) {
      return null;
    }
    if (multi) {
      return valueArray.map((value, i) => {
        const disabled =
          sharedProps.$disabled || value.clearableValue === false;
        return (
          <Value
            value={value}
            key={`value-${i}-${value[valueKey]}`}
            removeValue={() => removeValue(value)}
            disabled={disabled}
            overrides={{Tag: overrides.Tag, MultiValue: overrides.MultiValue}}
            {...sharedProps}
            $disabled={disabled}
          >
            {renderLabel({option: value, index: i})}
          </Value>
        );
      });
    } else if (shouldShowValue()) {
      return (
        <Value
          value={valueArray[0][valueKey]}
          disabled={disabled}
          overrides={{SingleValue: overrides.SingleValue}}
          {...sharedProps}
        >
          {renderLabel({option: valueArray[0]})}
        </Value>
      );
    }
  };

  const renderInput = () => {
    const [InputContainer, inputContainerProps] = getOverrides(
      overrides.InputContainer,
      StyledInputContainer,
    );
    const sharedProps = getSharedProps();
    const selected = getValueArray(value)
      .map(v => v[labelKey])
      .join(', ');
    const selectedLabel = selected.length ? `Selected ${selected}. ` : '';
    const label = `${selectedLabel}${restProps['aria-label'] || ''}`;

    if (!searchable) {
      return (
        <InputContainer
          aria-activedescendant={activeDescendant}
          aria-expanded={isOpen}
          aria-disabled={disabled}
          aria-label={label}
          aria-labelledby={restProps['aria-labelledby']}
          aria-owns={isOpen ? listboxId.current : null}
          aria-required={required || null}
          onFocus={handleInputFocus}
          ref={handleInputRef}
          tabIndex={0}
          {...sharedProps}
          {...inputContainerProps}
        />
      );
    }

    return (
      <InputContainer {...sharedProps} {...inputContainerProps}>
        <AutosizeInput
          aria-activedescendant={activeDescendant}
          aria-autocomplete="list"
          aria-controls={isOpen ? listboxId.current : null}
          aria-describedby={restProps['aria-describedby']}
          aria-errormessage={restProps['aria-errormessage']}
          aria-disabled={disabled || null}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-label={label}
          aria-labelledby={restProps['aria-labelledby']}
          aria-required={required || null}
          disabled={disabled || null}
          id={restProps.id || null}
          inputRef={handleInputRef}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          overrides={{Input: overrides.Input}}
          required={(required && !value.length) || null}
          role="combobox"
          value={inputValue}
          tabIndex={0}
          {...sharedProps}
        />
      </InputContainer>
    );
  };

  const renderClear = () => {
    const isValueEntered = Boolean((value && value.length) || inputValue);

    if (!clearable || disabled || isLoading || !isValueEntered) {
      return;
    }

    const sharedProps = getSharedProps();
    const [ClearIcon, clearIconProps] = getOverrides(
      overrides.ClearIcon,
      DeleteAlt,
    );
    const ariaLabel = multi ? 'Clear all' : 'Clear value';

    return (
      <ClearIcon
        size={16}
        title={ariaLabel}
        aria-label={ariaLabel}
        onClick={clearValue}
        onTouchEnd={handleTouchEndClearValue}
        onTouchMove={handleTouchMove}
        onTouchStart={handleTouchStart}
        role="button"
        overrides={{
          Svg: {
            component: StyledClearIcon,
            props:
              overrides.ClearIcon && overrides.ClearIcon.props
                ? overrides.ClearIcon.props
                : {},
            style:
              overrides.ClearIcon && overrides.ClearIcon.style
                ? overrides.ClearIcon.style
                : {},
          },
        }}
        {...sharedProps}
        {...clearIconProps}
      />
    );
  };

  const renderArrow = () => {
    if (type !== TYPE.select) {
      return null;
    }
    const [SelectArrow, selectArrowProps] = getOverrides(
      overrides.SelectArrow,
      TriangleDownIcon,
    );
    const sharedProps = getSharedProps();
    return (
      <SelectArrow
        size={16}
        title={'open'}
        overrides={{
          Svg: {
            component: StyledSelectArrow,
            props:
              overrides.SelectArrow && overrides.SelectArrow.props
                ? overrides.SelectArrow.props
                : {},
            style:
              overrides.SelectArrow && overrides.SelectArrow.style
                ? overrides.SelectArrow.style
                : {},
          },
        }}
        {...sharedProps}
        {...selectArrowProps}
      />
    );
  };

  const renderSearch = () => {
    if (type !== TYPE.search) {
      return null;
    }
    const [SearchIconContainer, searchIconContainerProps] = getOverrides(
      overrides.SearchIconContainer,
      StyledSearchIconContainer,
    );
    const [SearchIcon, searchIconProps] = getOverrides(
      overrides.SearchIcon,
      SearchIconComponent,
    );
    const sharedProps = getSharedProps();

    return (
      // TODO(v11): remove searchIconProps from SearchIconContainer
      <SearchIconContainer
        {...sharedProps}
        {...searchIconProps}
        {...searchIconContainerProps}
      >
        <SearchIcon size={16} title={'search'} {...searchIconProps} />
      </SearchIconContainer>
    );
  };

  const renderFilterOptions = (excludeOptions: ?ValueT) => {
    const filterValue = inputValue;
    // apply filter function
    if (filterOptions) {
      options.current = filterOptions(
        options.current,
        filterValue,
        excludeOptions,
        {
          valueKey,
          labelKey,
        },
      );
    }
    // can user create a new option + there's no exact match already
    const filterDoesNotMatchOption = ignoreCase
      ? opt => opt[labelKey].toLowerCase() !== filterValue.toLowerCase().trim()
      : opt => opt[labelKey] !== filterValue.trim();
    if (
      filterValue &&
      creatable &&
      options.current.concat(value).every(filterDoesNotMatchOption)
    ) {
      // $FlowFixMe - this.options is typed as a read-only array
      options.current.push({
        id: filterValue,
        [labelKey]: filterValue,
        [valueKey]: filterValue,
        isCreatable: true,
      });
    }
    return options.current;
  };

  const getSharedProps = () => {
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
      $isEmpty: !getValueArray(value).length,
    };
  };

  if (__DEV__) {
    // value may be nullish, only warn if value is defined
    if (value && !Array.isArray(value)) {
      console.warn(
        'The Select component expects an array as the value prop. For more information, please visit the docs at https://baseweb.design/components/select/',
      );
    }
  }

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
  const [PopoverOverride, popoverProps] = getOverrides(
    overrides.Popover,
    Popover,
  );
  const [Placeholder, placeholderProps] = getOverrides(
    overrides.Placeholder,
    StyledPlaceholder,
  );
  const sharedProps = getSharedProps();
  const valueArray = getValueArray(value);
  const renderOptions = renderFilterOptions(
    multi && filterOutSelected ? valueArray : null,
  );
  sharedProps.$isOpen = isOpen;

  if (__DEV__) {
    if (error && positive) {
      // eslint-disable-next-line no-console
      console.warn(
        `[Select] \`error\` and \`positive\` are both set to \`true\`. \`error\` will take precedence but this may not be what you want.`,
      );
    }
  }

  return (
    <LocaleContext.Consumer>
      {locale => (
        <PopoverOverride
          // Popover does not provide ability to forward refs through, and if we were to simply
          // apply the ref to the Root component below it would be overwritten before the popover
          // renders it. Using this strategy, we will get a ref to the popover, then reuse its
          // anchorRef so we can check if clicks are on the select component or not.
          // eslint-disable-next-line flowtype/no-weak-types
          ref={(ref: any) => {
            if (!ref) return;
            anchor.current = ref.anchorRef.current;
          }}
          focusLock={false}
          mountNode={undefined /* this.props.mountNode  todo */}
          onEsc={() => closeMenu()}
          isOpen={isOpen}
          popoverMargin={0}
          content={() => {
            const dropdownProps = {
              error,
              positive,
              getOptionLabel:
                restProps.getOptionLabel || getOptionLabel.bind(this, locale),
              id: listboxId.current,
              isLoading,
              labelKey,
              maxDropdownHeight,
              multi,
              //noResultsMsg, todo
              onActiveDescendantChange: handleActiveDescendantChange,
              onItemSelect: selectValue,
              options: renderOptions,
              overrides,
              required,
              searchable,
              size,
              type,
              value: valueArray,
              valueKey,
              width: anchor.current ? anchor.current.clientWidth : null,
              keyboardControlNode: anchor,
            };

            return (
              <SelectDropdown innerRef={dropdown.current} {...dropdownProps} />
            );
          }}
          placement={PLACEMENT.bottom}
          {...popoverProps}
        >
          <Root
            onBlur={handleBlur}
            data-baseweb="select"
            {...sharedProps}
            {...rootProps}
          >
            <ControlContainer
              onKeyDown={handleKeyDown}
              onClick={handleClick}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchMove}
              onTouchStart={handleTouchStart}
              {...sharedProps}
              {...controlContainerProps}
            >
              {type === TYPE.search ? renderSearch() : null}
              <ValueContainer {...sharedProps} {...valueContainerProps}>
                {renderValue(valueArray, isOpen, locale)}
                {renderInput()}
                {shouldShowPlaceholder() ? (
                  <Placeholder {...sharedProps} {...placeholderProps}>
                    {typeof restProps.placeholder !== 'undefined'
                      ? restProps.placeholder
                      : locale.select.placeholder}
                  </Placeholder>
                ) : null}
              </ValueContainer>
              <IconsContainer {...sharedProps} {...iconsContainerProps}>
                {renderLoading()}
                {renderClear()}
                {type === TYPE.select ? renderArrow() : null}
              </IconsContainer>
            </ControlContainer>
          </Root>
        </PopoverOverride>
      )}
    </LocaleContext.Consumer>
  );
}

export default Select;
