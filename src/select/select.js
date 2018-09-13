/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global document */
import * as React from 'react';
import {findDOMNode} from 'react-dom';
import {
  Root as StyledRoot,
  Input as StyledInput,
  InputContainer as StyledInputContainer,
  Tag as StyledTag,
  SearchIcon as StyledSearchIcon,
} from './styled-components';

import {Input as InputComponent} from '../input';
import {ICON, TYPE, STATE_CHANGE_TYPE} from './constants';
import SelectDropDown from './dropdown';
import type {
  LabelT,
  OptionT,
  PropsT,
  StatelessStateT,
  ChangeActionT,
} from './types';
import {getOverride} from '../helpers/overrides';

class Select extends React.Component<PropsT, StatelessStateT> {
  static defaultProps = {
    overrides: {},
    selectedOptions: [],
    options: [],
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    onMouseDown: () => {},
    onMouseUp: () => {},
    error: false,
    autoFocus: false,
    filterable: false,
    multiple: false,
    textValue: '',
    filterOption: (option: OptionT, query: string) => {
      return (
        typeof option.label === 'string' &&
        option.label.toLowerCase().indexOf(query.toLowerCase()) >= 0
      );
    },
  };

  state = {
    filteredOptions: null,
    textValue: this.props.textValue,
    selectedOptions: this.props.selectedOptions,
    isDropDownOpen: this.props.type === TYPE.search,
  };

  constructor(props: PropsT) {
    super(props);
    if (props.type === TYPE.select) {
      const {selectedOptions} = this.state;
      const options = this.getOptions();
      selectedOptions.forEach(selectedOption => {
        // selected option is not in all options and needs to be added on top
        if (!options.find(selected => selected.id === selectedOption.id)) {
          options.unshift({
            id: selectedOption.id,
            label: this.getOptionLabel(selectedOption),
          });
        }
      });
    }
  }

  componentDidMount() {
    if (__BROWSER__) {
      document.addEventListener('click', this.handleClickEvent, {
        capture: true,
      });
    }
  }

  componentWillUnmount() {
    if (__BROWSER__) {
      document.removeEventListener('click', this.handleClickEvent, {
        capture: true,
      });
    }
  }

  handleClickEvent = (event: MouseEvent) => {
    // eslint-disable-next-line react/no-find-dom-node
    const el = findDOMNode(this);
    /* eslint-disable-next-line flowtype/no-weak-types */
    if (el && !el.contains((event.target: any))) {
      this.setState({isDropDownOpen: false});
    }
  };

  onFocus = (e: SyntheticEvent<HTMLInputElement>) => {};

  onBlur = (e: SyntheticEvent<HTMLInputElement>) => {};

  onMouseEnter = (e: SyntheticEvent<HTMLInputElement>) => {};

  onMouseLeave = (e: SyntheticEvent<HTMLInputElement>) => {};

  onChange = (
    e: SyntheticEvent<HTMLInputElement>,
    type: ChangeActionT,
    id?: string = '',
    label?: LabelT,
  ) => {
    const multiple = this.isMultiple();
    const selected = this.state.selectedOptions.find(tag => tag.id === id);
    let selectedOptions;
    switch (type) {
      case STATE_CHANGE_TYPE.select:
        if (!selected) {
          selectedOptions = multiple ? this.state.selectedOptions.slice() : [];
          selectedOptions.push({id, label});
          this.setState({selectedOptions: selectedOptions});
          if (this.props.type === TYPE.select && !multiple) {
            this.setState({isDropDownOpen: false});
          }
          this.props.onChange(e, {type: type, id, label, selectedOptions});
        } else if (multiple) {
          selectedOptions = this.state.selectedOptions.filter(
            selectedOption => selectedOption.id !== selected.id,
          );
          this.setState({
            selectedOptions: selectedOptions,
          });
          this.props.onChange(e, {
            type: STATE_CHANGE_TYPE.unselect,
            id,
            label,
            selectedOptions,
          });
        }
        break;
      case STATE_CHANGE_TYPE.clearAll: {
        const selectedOptions = [];
        this.setState({selectedOptions: selectedOptions});
        this.props.onChange(e, {type: type, selectedOptions});
        break;
      }
      case STATE_CHANGE_TYPE.keyUp: {
        // $FlowFixMe
        const newTextValue = e.target.value;
        this.setState({textValue: newTextValue});
        if (this.props.filterable) {
          let filteredOptions = this.props.options.filter(option =>
            this.props.filterOption(option, newTextValue),
          );
          filteredOptions = filteredOptions.length
            ? filteredOptions
            : newTextValue
              ? []
              : null;
          this.setState({filteredOptions});
        }
        this.props.onChange(e, {type: type, textValue: newTextValue});
      }
    }
  };

  getOptions() {
    return this.state.filteredOptions || this.props.options || [];
  }

  render() {
    const {overrides: {Root: RootOverride} = {}} = this.props;
    const Root = getOverride(RootOverride) || StyledRoot;
    return (
      <Root>
        {this.props.type === TYPE.search ? this.getSearch() : this.getSelect()}
        {this.getDropDown()}
      </Root>
    );
  }

  getSelect() {
    const {
      overrides: {
        Root: RootOverride,
        Input: InputOverride,
        SearchIcon: SearchIconOverride,
      } = {},
    } = this.props;
    const Root = getOverride(RootOverride) || StyledRoot;
    const Input = getOverride(InputOverride) || StyledInput;
    const SearchIcon = getOverride(SearchIconOverride) || StyledSearchIcon;
    const {placeholder} = this.props;
    const {selectedOptions} = this.state;
    return (
      <div
        onClick={() => {
          this.setState({isDropDownOpen: !this.state.isDropDownOpen});
        }}
      >
        <InputComponent
          disabled={true}
          placeholder={!selectedOptions.length ? placeholder : ''}
          overrides={{
            Root: Root,
            Input: Input,
            After: () => (
              <SearchIcon
                $type={ICON.select}
                src={
                  'data:image/svg+xml;utf8,<svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.29289 5.29289L0.853553 0.853553C0.538571 0.538571 0.761654 0 1.20711 0H10.7929C11.2383 0 11.4614 0.538571 11.1464 0.853554L6.70711 5.29289C6.31658 5.68342 5.68342 5.68342 5.29289 5.29289Z" transform="translate(12) scale(-1 1)" fill="#666666"/></svg>'
                }
              />
            ),
            Before: () => this.getMultipleSelections(),
          }}
        />
      </div>
    );
  }

  getSearch() {
    const {
      overrides: {
        Input: InputOverride,
        InputContainer: InputContainerOverride,
        SearchIcon: SearchIconOverride,
      } = {},
    } = this.props;
    const Input = getOverride(InputOverride) || StyledInput;
    const InputContainer =
      getOverride(InputContainerOverride) || StyledInputContainer;
    const SearchIcon = getOverride(SearchIconOverride) || StyledSearchIcon;
    const {placeholder, error} = this.props;
    const {textValue} = this.state;
    return (
      <InputComponent
        error={!!error}
        placeholder={placeholder}
        value={textValue}
        //$FlowFixMe
        onChange={(e: SyntheticInputEvent<HTMLElement>) =>
          this.setState({textValue: e.target.value})
        }
        overrides={{
          Input: {
            props: {
              onKeyUp: e => this.onChange(e, STATE_CHANGE_TYPE.keyUp),
            },
            component: Input,
          },
          InputContainer: InputContainer,
          After: () => (
            <SearchIcon
              onClick={e => this.onChange(e, STATE_CHANGE_TYPE.clearAll)}
              $type={ICON.clearAll}
              src={
                'data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58173 12.4183 0 8 0C3.58173 0 0 3.58173 0 8C0 12.4183 3.58173 16 8 16ZM6.03033 4.96967C5.73743 4.67679 5.26257 4.67679 4.96967 4.96967C4.67676 5.26257 4.67676 5.73743 4.96967 6.03033L6.93933 8L4.96967 9.96967C4.67676 10.2626 4.67676 10.7374 4.96967 11.0303C5.26257 11.3232 5.73743 11.3232 6.03033 11.0303L8 9.06067L9.96967 11.0303C10.2626 11.3232 10.7374 11.3232 11.0303 11.0303C11.3232 10.7374 11.3232 10.2626 11.0303 9.96967L9.06067 8L11.0303 6.03033C11.3232 5.73743 11.3232 5.26257 11.0303 4.96967C10.7374 4.67679 10.2626 4.67679 9.96967 4.96967L8 6.93933L6.03033 4.96967Z" fill="#999999"/></svg>'
              }
            />
          ),
          Before: () => this.getMultipleSelections(),
        }}
      />
    );
  }

  getMultipleSelections() {
    const {
      overrides: {Tag: TagOverride, SearchIcon: SearchIconOverride} = {},
      type,
    } = this.props;
    const Tag = getOverride(TagOverride) || StyledTag;
    const SearchIcon = getOverride(SearchIconOverride) || StyledSearchIcon;
    const {selectedOptions} = this.state;
    const multiple = this.isMultiple();
    return (
      <React.Fragment>
        {type === TYPE.search && (
          <SearchIcon
            $type={ICON.loop}
            src={
              'data:image/svg+xml;utf8,<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 9L13 13M10 5C10 7.76142 7.76142 10 5 10C2.23858 10 0 7.76142 0 5C0 2.23858 2.23858 0 5 0C7.76142 0 10 2.23858 10 5Z" transform="translate(1 1)" stroke="#1B6DE0" stroke-width="2" stroke-linecap="round"/></svg>'
            }
          />
        )}
        {selectedOptions.map(option => (
          <Tag key={option.id} $multiple={multiple}>
            {this.getSelectedOptionLabel(option)}
            {multiple && (
              <SearchIcon
                onClick={e => {
                  this.setState({
                    selectedOptions: this.state.selectedOptions.filter(
                      selectedOption => selectedOption.id !== option.id,
                    ),
                  });
                  e.stopPropagation();
                }}
                $type={ICON.clearTag}
                src={
                  'data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.195262 0.195262C0.455612 -0.0650874 0.877722 -0.0650874 1.13807 0.195262L3.33333 2.39052L5.5286 0.195262C5.78895 -0.0650874 6.21106 -0.0650874 6.4714 0.195262C6.73175 0.455612 6.73175 0.877722 6.4714 1.13807L4.27614 3.33333L6.4714 5.5286C6.73175 5.78895 6.73175 6.21106 6.4714 6.4714C6.21106 6.73175 5.78895 6.73175 5.5286 6.4714L3.33333 4.27614L1.13807 6.4714C0.877722 6.73175 0.455612 6.73175 0.195262 6.4714C-0.0650874 6.21106 -0.0650874 5.78895 0.195262 5.5286L2.39052 3.33333L0.195262 1.13807C-0.0650874 0.877722 -0.0650874 0.455612 0.195262 0.195262Z" transform="translate(4.66675 4.6665)" fill="#276EF1"/></svg>'
                }
              />
            )}
          </Tag>
        ))}
      </React.Fragment>
    );
  }

  getDropDown() {
    const {overrides, type, rows} = this.props;
    const options = this.getOptions();
    const {isDropDownOpen, selectedOptions} = this.state;
    const dropDownProps = {
      rows,
      type,
      options,
      overrides,
      isDropDownOpen,
      selectedOptions,
      getOptionLabel: this.getOptionLabel.bind(this),
      onChange: this.onChange.bind(this),
    };
    return <SelectDropDown {...dropDownProps} />;
  }

  getOptionLabel(option: OptionT) {
    const {getOptionLabel} = this.props;
    return getOptionLabel ? getOptionLabel(option) : option.label;
  }

  getSelectedOptionLabel(option: OptionT) {
    const {getSelectedOptionLabel} = this.props;
    return getSelectedOptionLabel
      ? getSelectedOptionLabel(option)
      : this.getOptionLabel(option);
  }

  isMultiple() {
    const {type, multiple} = this.props;
    return type === TYPE.search ? true : multiple;
  }
}

export default Select;
