// @flow
/*
MIT License

Copyright (c) 2018 Uber Technologies, Inc.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/* eslint-disable react/display-name*/

import * as React from 'react';
// Styled elements
import {StatefulSelect, TYPE} from './index';
import type {LabelT, OptionT} from './types';
import {STATE_CHANGE_TYPE} from './constants';

type ExamplePropsT = {
  multiple?: boolean,
  options?: Array<OptionT>,
  simpleFilter?: boolean,
  getOptionLabel?: LabelT => React$Node,
  getSelectedOptionLabel?: LabelT => React$Node,
};

type ExampleStateT = {
  options: Array<OptionT>,
  selectedOptions?: Array<OptionT>,
};

const generateOptions = text => {
  const options = [];
  const optionsLength = Math.round(Math.random() * 10);
  for (let i = 0; i < optionsLength; i++) {
    const id = '' + Math.round(Math.random() * 10000);
    const label = text + id;
    options.push({id, label});
  }
  return options;
};

class ParentSearch extends React.Component<ExamplePropsT, ExampleStateT> {
  static defaultProps: {} = {};
  constructor(props: ExamplePropsT) {
    super(props);
    this.state = {
      options: props.simpleFilter ? generateOptions('text to search') : [],
      selectedOptions: [
        {
          id: '123',
          label: 'label for 123',
        },
      ],
    };
  }
  render() {
    return (
      <React.Fragment>
        <StatefulSelect
          rows={8}
          options={this.state.options}
          multiple={true}
          simpleFilter={this.props.simpleFilter}
          type={TYPE.search}
          initialState={{
            selectedOptions: this.state.selectedOptions,
          }}
          label="Search for tags"
          placeholder="Start searching"
          onChange={(e, {type, id = '', label, selectedOptions}) => {
            switch (type) {
              case STATE_CHANGE_TYPE.select:
                // eslint-disable-next-line no-console
                console.log('Selected id:' + id);
                break;
              case STATE_CHANGE_TYPE.unselect:
                // eslint-disable-next-line no-console
                console.log('Unselected id:' + id);
                break;
              case STATE_CHANGE_TYPE.clearAll:
                // eslint-disable-next-line no-console
                console.log('Cleared all tags');
                break;
              case STATE_CHANGE_TYPE.keyUp: {
                // $FlowFixMe
                let text = e.target.value;
                let options = [];
                if (!this.props.simpleFilter && text.length > 5) {
                  options = generateOptions(text);
                  this.setState({options: options});
                }
                break;
              }
            }
          }}
        />
      </React.Fragment>
    );
  }
}

class ParentSelect extends React.Component<ExamplePropsT, ExampleStateT> {
  static defaultProps: {} = {};
  constructor(props: ExamplePropsT) {
    super(props);
    const {options = []} = props;
    this.state = {
      options: options.length
        ? options
        : [
            {
              id: '1',
              label: 'label for 1',
            },
            {
              id: '2',
              label: 'label for 2',
            },
            {
              id: '3',
              label: 'label for 3',
            },
            {
              id: '4',
              label: 'label for 4',
            },
          ],
      selectedOptions: options.length
        ? [options[0]]
        : [
            {
              id: '123',
              label: 'preselected label for 123',
            },
          ],
    };
  }
  render() {
    return (
      <React.Fragment>
        <StatefulSelect
          options={this.state.options}
          getSelectedOptionLabel={this.props.getSelectedOptionLabel}
          getOptionLabel={this.props.getOptionLabel}
          multiple={this.props.multiple}
          type={TYPE.select}
          initialState={{
            selectedOptions: this.state.selectedOptions,
          }}
          label="Select"
          placeholder={this.props.multiple ? null : 'Choose one'}
          onChange={(e, {type, id = '', label}) => {
            if (type === STATE_CHANGE_TYPE.select) {
              // eslint-disable-next-line no-console
              console.log('Selected id:' + id);
            }
          }}
        />
      </React.Fragment>
    );
  }
}

export const suite = 'Select Test Suite';
export const tests = {
  AS_SEARCH_WITH_TAGS_ADDED: 'In search\\autocomplete mode with tags added',
  AS_SEARCH_WITH_SIMPLE_SEARCH:
    'In search\\autocomplete mode with simple search filter of options',
  AS_SELECT_WITH_MULTIPLE_CHOICE: 'In Select multiple mode',
  AS_SELECT_WITH_SINGLE_CHOICE: 'In Select single mode',
  AS_SELECT_WITH_CUSTOM_LABELS: 'In Select multiple mode with Custom Labels',
  AS_SELECT_WITH_CUSTOM_SELECTED_LABELS:
    'In Select multiple mode with Custom Labels and Custom Selected labels',
  AS_SELECT_WITH_DISABLED_CHOICES: 'In Select single mode with some disabled',
};

export default {
  [tests.AS_SEARCH_WITH_TAGS_ADDED]: () => {
    return <ParentSearch />;
  },
  [tests.AS_SEARCH_WITH_SIMPLE_SEARCH]: () => {
    return <ParentSearch simpleFilter />;
  },
  [tests.AS_SELECT_WITH_MULTIPLE_CHOICE]: () => {
    return <ParentSelect multiple={true} />;
  },
  [tests.AS_SELECT_WITH_SINGLE_CHOICE]: () => {
    return <ParentSelect />;
  },
  [tests.AS_SELECT_WITH_CUSTOM_LABELS]: () => {
    return (
      <ParentSelect
        multiple={true}
        getOptionLabel={option => (
          <span>
            <img
              style={{
                borderRadius: '50%',
                height: '75px',
              }}
              src={option.label.imgSrc}
            />
            {option.label.text}
          </span>
        )}
        options={[
          {
            id: '1',
            label: {
              imgSrc: 'https://fusionjs.com/static/nadiia.37070301.jpg',
              text: 'Nadiia',
            },
          },
          {
            id: '2',
            label: {
              imgSrc: 'https://fusionjs.com/static/mlmorg.c28c19d7.jpeg',
              text: 'Matt',
            },
          },
        ]}
      />
    );
  },
  [tests.AS_SELECT_WITH_CUSTOM_SELECTED_LABELS]: () => {
    return (
      <ParentSelect
        multiple={true}
        getOptionLabel={option => (
          <span>
            <img
              style={{
                borderRadius: '50%',
                height: '75px',
              }}
              src={option.label.imgSrc}
            />
            {option.label.text}
          </span>
        )}
        options={[
          {
            id: '1',
            label: {
              imgSrc: 'https://fusionjs.com/static/nadiia.37070301.jpg',
              text: 'Nadiia',
            },
          },
          {
            id: '2',
            label: {
              imgSrc: 'https://fusionjs.com/static/mlmorg.c28c19d7.jpeg',
              text: 'Matt',
            },
          },
        ]}
        getSelectedOptionLabel={option => (
          <span>
            <img
              style={{
                borderRadius: '50%',
                height: '50px',
              }}
              src={option.label.imgSrc}
            />
            {option.label.text + ' SELECTED'}
          </span>
        )}
      />
    );
  },
  [tests.AS_SELECT_WITH_DISABLED_CHOICES]: () => {
    return (
      <ParentSelect
        multiple={true}
        options={[
          {
            id: '1',
            label: 'label for 1',
          },
          {
            id: '2',
            label: 'label for 2',
            disabled: true,
          },
          {
            id: '3',
            label: 'label for 3',
          },
          {
            id: '4',
            label: 'label for 4',
            disabled: true,
          },
        ]}
      />
    );
  },
};
