/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

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
import {TYPE, STATE_CHANGE_TYPE} from './constants.js';
import SelectDropdown from './dropdown-functional.js';
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
import type {PropsT, ValueT, OptionT} from './types-next.js';
import {expandValue, normalizeOptions} from './utils/index.js';

const isClick = event => event.type === 'click';
const isLeftClick = event => {
  return (
    event.button !== null && event.button !== undefined && event.button === 0
  );
};
const containsNode = (parent, child) => {
  if (__BROWSER__) {
    // eslint-disable-next-line flowtype/no-weak-types
    return child && parent && parent.contains((child: any));
  }
};
function isInteractive(rootTarget: EventTarget, rootElement: Element) {
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

export default function SelectFunctional<P>(props: PropsT<P>) {
  const {
    autoFocus,
    backspaceClearsInputValue,
    backspaceRemoves,
    clearable,
    closeOnSelect,
    creatable,
    deleteRemoves,
    disabled,
    error,
    escapeClearsValue,
    getOptionLabel,
    getValueLabel,
    isLoading,
    labelKey,
    maxDropdownHeight,
    mountNode,
    multi,
    noResultsMsg,
    onBlur = _ => {},
    onChange = _ => {},
    onBlurResetsInput,
    onCloseResetsInput,
    onSelectResetsInput,
    openOnClick,
    options: denormalizedOptions,
    overrides = {},
    placeholder,
    positive,
    required,
    searchable,
    size,
    startOpen,
    type,
    value,
    valueKey,
  } = props;

  // anchor is a ref that refers to the outermost element rendered when the dropdown menu is not
  // open. This is required so that we can check if clicks are on/off the anchor element.
  const anchorRef = React.useRef();
  // dropdown is a ref that refers to the popover element. This is required so that we can check if
  // clicks are on/off the dropdown element.
  const dropdownRef = React.useRef();
  // used to focus the input element
  const inputRef = React.useRef();
  // focusAfterClear is a flag to indicate that the dropdowm menu should open after a selected
  // option has been cleared.
  const focusAfterClear = React.useRef();
  // openAfterFocus is a flag to indicate that the dropdown menu should open when the component is
  // focused. Developers have the option to disable initial clicks opening the dropdown menu. If not
  // disabled, clicks will set this flag to true. Upon focusing, look to this to see if the menu should
  // be opened, or only focus.
  const openAfterFocus = React.useRef();
  // id generated for the listbox. used by screenreaders to associate the input with the menu it controls
  const listboxId = React.useMemo(() => getBuiId(), []);
  // dragging is a flag to track whether a mobile device is currently scrolling versus clicking.
  const dragging = React.useRef();
  const isMounted = React.useRef(false);

  const locale = React.useContext(LocaleContext);
  const [activeDescendant, setActiveDescendant] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState(startOpen);
  const [inputValue, setInputValue] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);
  const [isPseudoFocused, setIsPseudoFocused] = React.useState(false);

  React.useEffect(() => {
    if (autoFocus) {
      focusInputElement();
    }
    isMounted.current = true;
  }, []);

  const options = React.useMemo(() => {
    return normalizeOptions(denormalizedOptions);
  }, [denormalizedOptions]);

  const valueArray = React.useMemo(() => {
    if (value === null || value === undefined) {
      return [];
    }

    if (!Array.isArray(value)) {
      return [expandValue(value, denormalizedOptions, valueKey)];
    }

    return value.map(v => expandValue(v, denormalizedOptions, valueKey));
  }, [value, denormalizedOptions, valueKey]);

  const focusInputElement = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef]);

  const renderLabel = React.useCallback(
    ({option}) => {
      if (getValueLabel) {
        return getValueLabel({option});
      }
      return option[labelKey];
    },
    [getValueLabel, labelKey],
  );

  const popValue = React.useCallback(() => {
    const valueArray = [...value];
    const valueLength = valueArray.length;
    if (!valueLength || valueArray[valueLength - 1].clearableValue === false) {
      return;
    }

    const option = valueArray.pop();
    // onChange({value: valueArray, option, type: STATE_CHANGE_TYPE.remove});
    return option;
  }, [value]);

  const backspaceValue = React.useCallback(() => {
    const item = popValue();
    if (!item) {
      return;
    }
    const valueLength = value.length;
    const labelForInput = renderLabel({option: item, index: valueLength - 1});
    // label might not be a string, it might be a Node of another kind.
    if (!backspaceClearsInputValue && typeof labelForInput === 'string') {
      const remainingInput = labelForInput.slice(0, -1);
      setInputValue(remainingInput);
      setIsOpen(true);
    }
  }, [popValue, renderLabel, value]);

  const clearValue = React.useCallback(
    event => {
      if (isClick(event) && !isLeftClick(event)) return;

      if (value) {
        const resetValue = value.filter(item => item.clearableValue === false);
        // onChange({
        //   value: resetValue,
        //   option: null,
        //   type: STATE_CHANGE_TYPE.clear,
        // });
      }

      setInputValue('');
      setIsOpen(false);

      focusInputElement();
      focusAfterClear.current = true;
    },
    [value, onChange, focusInputElement, focusAfterClear],
  );

  const closeMenu = React.useCallback(() => {
    if (onCloseResetsInput) {
      setInputValue('');
    }
    setIsOpen(false);
    setIsPseudoFocused(isFocused && !multi);
  }, [onCloseResetsInput, isFocused, multi]);

  const getDropdownOptionLabel = React.useCallback(
    ({option, optionState}) => {
      if (getOptionLabel) {
        // TODO: dropdown component needs generic parameter
        return getOptionLabel({option, optionState});
      }
      if (option.isCreatable) {
        return `${locale.select.create} “${option[labelKey]}”`;
      }
      return option[labelKey];
    },
    [locale, labelKey],
  );

  // Popover does not provide ability to forward refs through, and if we were to simply
  // apply the ref to the Root component below it would be overwritten before the popover
  // renders it. Using this strategy, we will get a ref to the popover, then reuse its
  // anchorRef so we can check if clicks are on the select component or not.
  const receivePopoverAnchorRef = React.useCallback(ref => {
    if (ref) {
      // $FlowFixMe - ref arg is mixed type
      anchorRef.current = ref.anchorRef;
    }
  }, []);

  const handleActiveDescendantChange = React.useCallback(id => {
    if (id) {
      setActiveDescendant(id);
    } else {
      setActiveDescendant(null);
    }
  }, []);

  const handleBlur = React.useCallback(
    event => {
      if (event.relatedTarget) {
        if (
          containsNode(anchorRef.current, event.relatedTarget) ||
          containsNode(dropdownRef.current, event.relatedTarget)
        ) {
          return;
        }
      } else if (containsNode(anchorRef.current, event.target)) {
        return;
      }

      onBlur(event);

      if (isMounted.current) {
        if (onBlurResetsInput) {
          setInputValue('');
        }

        setIsFocused(false);
        setIsOpen(false);
        setIsPseudoFocused(false);
      }
    },
    [anchorRef, dropdownRef, isMounted, onBlurResetsInput],
  );

  const handleItemSelect = React.useCallback(
    ({item}) => {
      // if (item.disabled) {
      //   return;
      // }
      // const nextInputValue = onSelectResetsInput ? '' : inputValue;
      // if (multi) {
      //   // TODO: handle multi selection
      // } else {
      //   focusInputElement();
      //   setInputValue(nextInputValue);
      //   setIsOpen(!closeOnSelect);
      //   setIsFocused(true);
      //   setIsPseudoFocused(false);
      //   onChange({
      //     value: [item],
      //     option: item,
      //     type: STATE_CHANGE_TYPE.select,
      //   });
      // }
    },
    [onSelectResetsInput, closeOnSelect, inputValue],
  );

  const handleKeyDown = React.useCallback(
    event => {
      if (this.props.disabled) {
        return;
      }

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
          if (!onCloseResetsInput || !onBlurResetsInput) {
            setInputValue('');
          }
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
          setIsOpen(true);
          break;
        case 38: // up
          event.preventDefault();
          setIsOpen(true);
          break;
        case 40: // down
          event.preventDefault();
          setIsOpen(true);
          break;
        case 33: // page up
          event.preventDefault();
          setIsOpen(true);
          break;
        case 34: // page down
          event.preventDefault();
          setIsOpen(true);
          break;
        case 35: // end key
          if (event.shiftKey) {
            break;
          }
          event.preventDefault();
          setIsOpen(true);
          break;
        case 36: // home key
          if (event.shiftKey) {
            break;
          }
          event.preventDefault();
          setIsOpen(true);
          break;
        case 46: // delete
          if (!inputValue && deleteRemoves) {
            event.preventDefault();
            popValue();
          }
          break;
      }
    },
    [backspaceRemoves, inputValue, popValue],
  );

  const handleClick = React.useCallback(
    event => {
      if (disabled || (!isClick(event) && !isLeftClick(event))) {
        return;
      }

      // Case comes up when text has been typed into the input field. If no text provided,
      // the 'input' element will have essentially 0 width therefore will not be clickable.
      // When click outside does not reset input, text provided will stay rendered after clicks away
      // from the select component. Upon subsequent clicks on the provided text, open the dropdown
      // menu, in addition to text edit operations.
      if (event.target === inputRef.current) {
        if (!isFocused) {
          openAfterFocus.current = Boolean(openOnClick);
          focusInputElement();
          return;
        }

        if (!isOpen) {
          setIsOpen(true);
          setIsPseudoFocused(true);
          return;
        }
      }

      // Ensures that interactive elements within the Select component do not trigger the outer click
      // handler. For example, after an option is selected clicks on the 'clear' icon call here. We
      // should ignore those events. This comes after case where click is on input element, so that
      // those are handled on their own.
      if (inputRef.current && isInteractive(event.target, inputRef.current)) {
        return;
      }

      // For the simple case where clicking on the Select does not allow for providing
      // text input to filter the dropdown options.
      if (!searchable) {
        focusInputElement();
        setIsOpen(prev => !prev);
        return;
      }

      // Cases below only apply to searchable Select component.
      if (isFocused) {
        // iOS ignores programmatic calls to input.focus() that were not triggered by a click event.
        // This component can get into a state where isFocused is true, but the DOM node is not
        // focused. Call focus here again to ensure.
        focusInputElement();

        // Case comes up when click outside does not reset input - once text has been provided to
        // the input, and the user closes the dropdown menu the provided text is maintained. After
        // this, if the user focuses back into the select component then clicks on the component,
        // the provided text highlights rather than position's the cursor at the end of the input.
        if (inputRef.current) {
          inputRef.current.value = '';
        }

        setIsOpen(prev => focusAfterClear.current && !prev);
        setIsPseudoFocused(false);

        focusAfterClear.current = false;
      } else {
        // When clear button is clicked, need to click twice to open control container - https://github.com/uber/baseweb/issues/4285
        // Setting focusAfterClear to false, resolves the issue
        focusAfterClear.current = false;
        openAfterFocus.current = Boolean(openOnClick);
        focusInputElement();
      }
    },
    [
      disabled,
      isFocused,
      openOnClick,
      focusInputElement,
      setIsOpen,
      setIsPseudoFocused,
      inputRef,
      focusAfterClear,
      openAfterFocus,
    ],
  );

  const handleTouchEnd = React.useCallback(
    event => {
      if (!dragging.current) {
        handleClick(event);
      }
    },
    [dragging, handleClick],
  );

  const handleTouchMove = React.useCallback(() => {
    dragging.current = true;
  }, [dragging]);

  const handleTouchStart = React.useCallback(() => {
    dragging.current = false;
  }, [dragging]);

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

  const sharedProps = {
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
    $isEmpty: !valueArray.length,
  };

  return (
    <PopoverOverride
      ref={receivePopoverAnchorRef}
      focusLock={false}
      mountNode={mountNode}
      onEsc={closeMenu}
      isOpen={isOpen}
      popoverMargin={0}
      content={() => {
        const dropdownProps = {
          error,
          positive,
          getOptionLabel: getDropdownOptionLabel,
          id: listboxId,
          isLoading,
          labelKey,
          maxDropdownHeight,
          multi,
          noResultsMsg,
          onActiveDescendantChange: handleActiveDescendantChange,
          onItemSelect: handleItemSelect,
          options,
          overrides,
          required,
          searchable,
          size,
          type,
          value: valueArray,
          valueKey,
          width: anchorRef.current ? anchorRef.current.clientWidth : null,
          keyboardControlNode: anchorRef,
        };

        return <SelectDropdown innerRef={dropdownRef} {...dropdownProps} />;
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
          {/* {type === TYPE.search ? this.renderSearch() : null} */}
          <ValueContainer {...sharedProps} {...valueContainerProps}>
            {/* {this.renderValue(valueArray, isOpen, locale)}
            {this.renderInput()}
            {this.shouldShowPlaceholder() ? (
              <Placeholder {...sharedProps} {...placeholderProps}>
                {typeof placeholder !== 'undefined'
                  ? placeholder
                  : locale.select.placeholder}
              </Placeholder>
            ) : null} */}
          </ValueContainer>
          <IconsContainer {...sharedProps} {...iconsContainerProps}>
            {/* {this.renderLoading()}
            {this.renderClear()}
            {type === TYPE.select ? this.renderArrow() : null} */}
          </IconsContainer>
        </ControlContainer>
      </Root>
    </PopoverOverride>
  );
}
