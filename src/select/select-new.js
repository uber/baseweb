/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import * as React from 'react';
import {
  Root as StyledRoot,
  Input as StyledInput,
  InputContainer as StyledInputContainer,
  SingleSelection as StyledSingleSelection,
  SelectComponentIcon as StyledSelectComponentIcon,
  SelectionContainer as StyledSelectionContainer,
  SelectSpinner as StyledSelectSpinner,
  SelectRoot,
  SelectWrapper,
  SelectValueWrapper,
  SelectPlaceholder,
  SelectValue,
  SelectInputWrapper,
  SelectInput,
  SelectArrowIcon,
  SelectClearIcon,
  SelectNoResults,
} from './styled-components';
import defaultFilterOptions from './utils/default-filter-options';
import {
  stringifyValue,
  shouldShowValue,
  shouldShowPlaceholder,
  expandValue,
} from './utils';
// import {Tag as StyledTag} from '../tag';
import Value from './value-new';
import SelectDropDown from './dropdown';
import {ICON, TYPE, STATE_CHANGE_TYPE} from './constants';
import {getOverrides} from '../helpers/overrides';
import {KEY_STRINGS} from '../menu/constants';
import {Spinner} from '../spinner';
import {Tag} from '../tag';
import {Delete as DeleteIcon, TriangleDown as TriangleDownIcon} from '../icon';
import type {OptionT, PropsT, StatelessStateT} from './types';

let instanceId = 1;

class Select extends React.Component<PropsT, StatelessStateT> {
  static defaultProps = {
    autoFocus: false,
    id: '',
    error: false,
    maxDropdownHeight: 900,
    multi: false,
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    onInputChange: () => {},
    options: [],
    overrides: {},
    searchable: true,
    query: '',
    type: TYPE.select,
    value: [],
    getOptionLabel: null,

    // autosize: true,
    backspaceRemoves: true,
    clearable: true,
    closeOnSelect: true,
    deleteRemoves: true,
    delimiter: ',',
    disabled: false,
    escapeClearsValue: true,
    filterOptions: defaultFilterOptions,
    isLoading: false,
    labelKey: 'id',
    noResultsMsg: 'No results found',
    onBlurResetsInput: true,
    onCloseResetsInput: true,
    onSelectResetsInput: true,
    onOpen: null,
    onClose: null,
    openOnClick: true,
    placeholder: 'Select...',
    filterOutSelected: true,
    required: false,
    // scrollMenuIntoView: true,
    valueKey: 'color',
  };

  state = {
    inputValue: '',
    isFocused: false,
    isOpen: false,
    isPseudoFocused: false,
    required: false,
  };

  componentDidMount() {
    if (this.props.autoFocus) {
      this.focus();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.disabled !== this.props.disabled) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({isFocused: false});
      this.closeMenu();
    }
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

  toggleTouchOutsideEvent(enabled) {
    if (enabled) {
      document.addEventListener('touchstart', this.handleTouchOutside);
    } else {
      document.removeEventListener('touchstart', this.handleTouchOutside);
    }
  }

  handleTouchOutside = event => {
    // handle touch outside on ios to dismiss menu
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

  handleTouchEnd = event => {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this.dragging) return;
    // Fire the mouse events
    this.handleMouseDown(event);
  };

  handleTouchEndClearValue = event => {
    // Check if the view is being dragged, In this case
    // we don't want to fire the click event (because the user only wants to scroll)
    if (this.dragging) return;
    // Clear the value
    this.clearValue(event);
  };

  handleMouseDown = event => {
    // if the event was triggered by a mousedown and not the primary
    // button, or if the component is disabled, ignore it.
    if (
      this.props.disabled ||
      (event.type === 'mousedown' && event.button !== 0)
    ) {
      return;
    }
    if (event.target.tagName === 'INPUT') {
      if (!this.state.isFocused) {
        this._openAfterFocus = this.props.openOnClick;
        this.focus();
      } else if (!this.state.isOpen) {
        this.setState({
          isOpen: true,
          isPseudoFocused: false,
        });
      }
      return;
    }

    // prevent default event handlers
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
      let input = this.input;
      let toOpen = true;
      // TODO: remove the code below
      // if (typeof input.getInput === 'function') {
      //   // Get the actual DOM input if the ref is an <AutosizeInput /> component
      //   input = input.getInput();
      // }

      // clears the value so that the cursor will be at the end of input when the component re-renders
      input.value = '';

      if (this._focusAfterClear) {
        toOpen = false;
        this._focusAfterClear = false;
      }

      // if the input is focused, ensure the menu is open
      this.setState({
        isOpen: toOpen,
        isPseudoFocused: false,
      });
    } else {
      // otherwise, focus the input and open the menu
      this._openAfterFocus = this.props.openOnClick;
      this.focus();
    }
  };

  handleMouseDownOnArrow = event => {
    // if the event was triggered by a mousedown and not the primary
    // button, or if the component is disabled, ignore it.
    if (
      this.props.disabled ||
      (event.type === 'mousedown' && event.button !== 0)
    ) {
      return;
    }

    if (this.state.isOpen) {
      // prevent default event handlers
      event.stopPropagation();
      event.preventDefault();
      // close the menu
      this.closeMenu();
    } else {
      // If the menu isn't open, let the event bubble to the main handleMouseDown
      this.setState({
        isOpen: true,
      });
    }
  };

  handleMouseDownOnMenu = event => {
    // if the event was triggered by a mousedown and not the primary
    // button, or if the component is disabled, ignore it.
    if (
      this.props.disabled ||
      (event.type === 'mousedown' && event.button !== 0)
    ) {
      return;
    }

    event.stopPropagation();
    event.preventDefault();

    this._openAfterFocus = true;
    this.focus();
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

  handleInputFocus = event => {
    if (this.props.disabled) return;

    let toOpen =
      this.state.isOpen || this._openAfterFocus || this.props.openOnFocus;
    //if focus happens after clear values, don't open dropdown yet.
    toOpen = this._focusAfterClear ? false : toOpen;

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    this.setState({
      isFocused: true,
      isOpen: !!toOpen,
    });

    this._focusAfterClear = false;
    this._openAfterFocus = false;
  };

  handleInputBlur = event => {
    // The check for menu.contains(activeElement) is necessary to prevent IE11's scrollbar from closing the menu in certain contexts.
    if (
      this.menu &&
      (this.menu === document.activeElement ||
        this.menu.contains(document.activeElement))
    ) {
      this.focus();
      return;
    }

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    let onBlurredState = {
      isFocused: false,
      isOpen: false,
      isPseudoFocused: false,
    };
    if (this.props.onBlurResetsInput) {
      onBlurredState.inputValue = '';
    }
    this.setState(onBlurredState);
  };

  handleInputChange = event => {
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

  handleKeyDown = event => {
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

  getOptionLabel = op => {
    return op[this.props.labelKey];
  };

  /**
   * Turns a value into an array from the given options
   * @param {String|Number|Array} value		- the value of the select input
   * @returns	{Array}	the value of the select represented in an array
   */
  getValueArray(value) {
    if (this.props.multi) {
      if (typeof value === 'string') {
        value = value.split(this.props.delimiter);
      }
      if (!Array.isArray(value)) {
        if (value === null || value === undefined) return [];
        value = [value];
      }
      return value.map(value => expandValue(value, this.props)).filter(i => i);
    }
    if (Array.isArray(value)) {
      return value.map(value => expandValue(value, this.props)).filter(i => i);
    } else {
      const expandedValue = expandValue(value, this.props);
      return expandedValue ? [expandedValue] : [];
    }
  }

  setValue(value) {
    // if (value) {
    //   value = this.props.multi
    //     ? value.map(i => i[this.props.valueKey]).join(this.props.delimiter)
    //     : value[this.props.valueKey];
    // }
    if (this.props.onChange) {
      this.props.onChange({value: Array.isArray(value) ? value : [value]});
    }
  }

  selectValue = ({item: value}) => {
    if (value.disabled) {
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
              i => i[this.props.valueKey] === value[this.props.valueKey],
            )
          ) {
            this.removeValue(value);
          } else {
            this.addValue(value);
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
          this.setValue(value);
        },
      );
    }
  };

  addValue = value => {
    let valueArray = this.getValueArray(this.props.value);
    this.setValue(valueArray.concat(value));
  };

  popValue = () => {
    let valueArray = this.getValueArray(this.props.value);
    if (!valueArray.length) return;
    if (valueArray[valueArray.length - 1].clearableValue === false) return;
    this.setValue(
      this.props.multi ? valueArray.slice(0, valueArray.length - 1) : null,
    );
  };

  removeValue = value => {
    console.log('removeValue is called', value);
    let valueArray = this.getValueArray(this.props.value);
    this.setValue(
      valueArray.filter(
        i => i[this.props.valueKey] !== value[this.props.valueKey],
      ),
    );
    this.focus();
  };

  clearValue = event => {
    // if the event was triggered by a mousedown and not the primary
    // button, ignore it.
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
    this._focusAfterClear = true;
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
    return (
      <StyledSelectSpinner {...selectSpinnerProps}>
        <Spinner size={22} />
      </StyledSelectSpinner>
      // <span aria-hidden="true">
      //   <span />
      // </span>
    );
  }

  renderValue(valueArray, isOpen) {
    const sharedProps = this.getSharedProps();
    let renderLabel = this.props.getOptionLabel || this.getOptionLabel;
    let ValueComponent = Value;
    if (!valueArray.length) {
      const showPlaceholder = shouldShowPlaceholder(
        this.state,
        this.props,
        isOpen,
      );
      return showPlaceholder ? (
        <SelectPlaceholder>{this.props.placeholder}</SelectPlaceholder>
      ) : null;
    }
    if (this.props.multi) {
      return valueArray.map((value, i) => {
        const disabled =
          sharedProps.$disabled || value.clearableValue === false;
        return (
          <Tag
            key={`value-${i}-${value[this.props.valueKey]}`}
            onActionClick={() => {
              this.removeValue(value);
            }}
            overrides={{
              Root: {
                style: {margin: '0 5px 0 0'},
              },
            }}
            disabled={disabled}
            {...sharedProps}
            $disabled={disabled}
            // instancePrefix={this._instancePrefix}
            // placeholder={this.props.placeholder}
          >
            {renderLabel(value, i)}
          </Tag>
        );
      });
    } else if (shouldShowValue(this.state, this.props)) {
      return (
        <ValueComponent
          disabled={this.props.disabled}
          // instancePrefix={this._instancePrefix}
          // placeholder={this.props.placeholder}
          value={valueArray[0]}
        >
          {renderLabel(valueArray[0])}
        </ValueComponent>
      );
    }
  }

  renderInput(valueArray) {
    const sharedProps = this.getSharedProps();
    const isOpen = this.state.isOpen;
    let value = this.state.inputValue;
    if (value && !this.props.onSelectResetsInput && !this.state.isFocused) {
      // it hides input value when it is not focused and was not reset on select
      value = '';
    }

    const inputProps = {
      'aria-describedby': this.props['aria-describedby'],
      'aria-expanded': isOpen,
      'aria-haspopup': isOpen,
      'aria-label': this.props['aria-label'],
      'aria-labelledby': this.props['aria-labelledby'],
      onBlur: this.handleInputBlur,
      onChange: this.handleInputChange,
      onFocus: this.handleInputFocus,
      $ref: ref => (this.input = ref),
      role: 'combobox',
      required: this.props.required,
      value,
    };
    // if (this.props.disabled || !this.props.searchable) {
    //   return (
    //     <SelectInputWrapper
    //       aria-expanded={isOpen}
    //       aria-disabled={this.props.disabled}
    //       aria-label={this.props['aria-label']}
    //       aria-labelledby={this.props['aria-labelledby']}
    //       onBlur={this.handleInputBlur}
    //       onFocus={this.handleInputFocus}
    //       $ref={ref => (this.input = ref)}
    //       role="combobox"
    //       style={{border: 0, width: 1, display: 'inline-block'}}
    //       tabIndex={0}
    //       {...sharedProps}
    //       // {...inputWrapperProps}
    //     />
    //   );
    // }

    // if (this.props.autosize) {
    //   return <AutosizeInput id={this.props.id} {...inputProps} minWidth="5" />;
    // }
    return (
      <SelectInputWrapper {...sharedProps}>
        <SelectInput {...sharedProps} {...inputProps} />
      </SelectInputWrapper>
    );
  }

  renderClear() {
    const sharedProps = this.getSharedProps();
    const valueArray = this.getValueArray(this.props.value);
    if (
      !this.props.clearable ||
      !valueArray.length ||
      this.props.disabled ||
      this.props.isLoading
    )
      return;
    const ariaLabel = this.props.multi ? 'Clear all' : 'Clear value';

    return (
      <DeleteIcon
        size={16}
        title={ariaLabel}
        aria-label={ariaLabel}
        onMouseDown={this.clearValue}
        onTouchEnd={this.handleTouchEndClearValue}
        onTouchMove={this.handleTouchMove}
        onTouchStart={this.handleTouchStart}
        overrides={{Svg: SelectClearIcon}}
        {...sharedProps}
      />
    );
  }

  renderArrow() {
    const sharedProps = this.getSharedProps();
    // if (this.props.type !== 'select') {
    //   return null;
    // }
    return (
      <TriangleDownIcon
        size={16}
        title={'open'}
        onMouseDown={this.handleMouseDownOnArrow}
        overrides={{Svg: SelectArrowIcon}}
        {...sharedProps}
      />
    );
  }

  filterOptions(excludeOptions) {
    const filterValue = this.state.inputValue;
    const options = this.props.options || [];
    if (this.props.filterOptions) {
      // TODO pass options based on props below
      return this.props.filterOptions(options, filterValue, excludeOptions, {
        valueKey: this.props.valueKey,
        labelKey: this.props.labelKey,
      });
    } else {
      return options;
    }
  }

  renderMenu(options, valueArray) {
    const sharedProps = this.getSharedProps();
    if (options && options.length) {
      const {
        valueKey,
        labelKey,
        isLoading,
        overrides,
        multi,
        type,
        value = [],
      } = this.props;
      let maxDropdownHeight = this.props.maxDropdownHeight;
      const {isOpen} = this.state;
      const dropDownProps = {
        value,
        type,
        maxDropdownHeight,
        options,
        overrides,
        multi,
        isLoading,
        selectedOptions: value,
        getOptionLabel: this.getOptionLabel,
        onItemSelect: this.selectValue,
        valueKey,
        labelKey,
      };
      return <SelectDropDown {...dropDownProps} />;
    } else if (this.props.noResultsMsg) {
      return <SelectNoResults>{this.props.noResultsMsg}</SelectNoResults>;
    } else {
      return null;
    }
  }

  renderOuter(options, valueArray, focusedOption) {
    let menu = this.renderMenu(options, valueArray, focusedOption);
    if (!menu) {
      return null;
    }

    return menu;
    // (
    //   <div ref={ref => (this.menuContainer = ref)}>
    //     <div
    //       onMouseDown={this.handleMouseDownOnMenu}
    //       onScroll={this.handleMenuScroll}
    //       ref={ref => (this.menu = ref)}
    //       role="listbox"
    //       tabIndex={-1}
    //     >
    //       {menu}
    //     </div>
    //   </div>
    // );
  }

  getSharedProps() {
    const {type, searchable, required, error, disabled} = this.props;
    const {isOpen, isFocused, isPseudoFocused} = this.state;
    return {
      $disabled: disabled,
      $error: error,
      $isFocused: isFocused,
      $isOpen: isOpen,
      $isPseudoFocused: isPseudoFocused,
      $required: required,
      $type: type,
      $searchable: searchable,
    };
  }

  getSubComponents() {
    const {overrides = {}} = this.props;
    return {
      Input: getOverrides(overrides.Input, StyledInput),
      Tag: getOverrides(overrides.Tag, StyledTag),
      Root: getOverrides(overrides.Root, StyledRoot),
      SelectionContainer: getOverrides(
        overrides.SelectionContainer,
        StyledSelectionContainer,
      ),
      SelectComponentIcon: getOverrides(
        overrides.SelectComponentIcon,
        StyledSelectComponentIcon,
      ),
      SingleSelection: getOverrides(
        overrides.SingleSelection,
        StyledSingleSelection,
      ),
      InputContainer: getOverrides(
        overrides.InputContainer,
        StyledInputContainer,
      ),
    };
  }

  render() {
    const sharedProps = this.getSharedProps();
    let valueArray = this.getValueArray(this.props.value);

    console.log('render', valueArray);

    let options = this.filterOptions(
      this.props.multi && this.props.filterOutSelected ? valueArray : null,
    );
    let isOpen = this.state.isOpen;
    // if (
    //   this.props.multi &&
    //   !options.length &&
    //   valueArray.length &&
    //   !this.state.inputValue
    // )
    //   isOpen = false;
    let focusedOption = null;
    return (
      <SelectRoot $ref={ref => (this.wrapper = ref)}>
        <SelectWrapper
          {...sharedProps}
          $ref={ref => (this.control = ref)}
          onKeyDown={this.handleKeyDown}
          onMouseDown={this.handleMouseDown}
          onTouchEnd={this.handleTouchEnd}
          onTouchMove={this.handleTouchMove}
          onTouchStart={this.handleTouchStart}
        >
          <SelectValueWrapper>
            {this.renderValue(valueArray, isOpen)}
            {this.renderInput(valueArray)}
          </SelectValueWrapper>
          {this.renderLoading()}
          {this.renderClear()}
          {this.props.type === TYPE.select ? this.renderArrow() : null}
        </SelectWrapper>
        {isOpen ? this.renderOuter(options, valueArray, focusedOption) : null}
      </SelectRoot>
    );
  }
}

export default Select;
