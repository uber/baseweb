/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React, {useRef} from 'react';
import {List, AutoSizer} from 'react-virtualized';

import {Block} from '../block/index.js';
import {countries} from './constants.js';
import {Input, SIZE} from '../input/index.js';
import {Select, StyledDropdownListItem} from '../select/index.js';
import {styled} from '../styles/index.js';
import {StyledList} from '../menu/index.js';
import Flag from './flag.js';

const Container = styled(StyledList, ({$height = '400px'}) => {
  return {height: $height};
});

const ListItem = styled(StyledDropdownListItem, {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  display: 'flex',
  alignItems: 'center',
});

function VirtualList(props) {
  return (
    <Container $ref={props.$ref} $height={props.maxDropdownHeight}>
      <AutoSizer>
        {({height, width}) => {
          return (
            <List
              role={props.role}
              height={height}
              width={width}
              rowCount={props.children.length}
              rowHeight={32}
              rowRenderer={({index, key, style}) => {
                // resetMenu and getItemLabel should not end up on native html elements
                const {resetMenu, getItemLabel, ...rest} = props.children[
                  index
                ].props;
                return (
                  <ListItem key={key} style={style} {...rest}>
                    <Block
                      paddingLeft="16px"
                      display="flex"
                      alignItems="center"
                    >
                      <Flag
                        iso2={props.children[index].props.item.iso2}
                        size="compact"
                      />
                    </Block>
                    <Block paddingLeft="16px">
                      {props.children[index].props.item.name}
                    </Block>
                    <Block marginLeft="auto" paddingRight="16px">
                      +{props.children[index].props.item.dialCode}
                    </Block>
                  </ListItem>
                );
              }}
            />
          );
        }}
      </AutoSizer>
    </Container>
  );
}

export default function PhoneInput(props) {
  const {
    inputValue,
    onInputChange,
    countryValue,
    onCountryChange,
    size = SIZE.default,
    maxDropdownHeight = '400px',
    maxDropdownWidth = '400px',
  } = props;
  const inputRef = useRef(null);
  return (
    <Input
      size={size}
      inputRef={inputRef}
      value={inputValue}
      onChange={onInputChange}
      overrides={{
        Input: {
          style: {
            paddingLeft: '4px',
          },
        },
        Before: {
          component: function Before() {
            return (
              <Select
                size={size}
                value={[countryValue]}
                onChange={(...args) => {
                  inputRef.current.focus();
                  onCountryChange(...args);
                }}
                options={Object.values(countries)}
                labelKey="name"
                valueKey="iso2"
                clearable={false}
                searchable={false}
                maxDropdownHeight={maxDropdownHeight}
                getValueLabel={({option}) => {
                  return <Flag iso2={option.iso2} size={size} />;
                }}
                overrides={{
                  ValueContainer: {
                    style: {
                      width: {
                        [SIZE.compact]: '34px',
                        [SIZE.default]: '42px',
                        [SIZE.large]: '50px',
                      }[size],
                    },
                  },
                  IconsContainer: {
                    style: {
                      paddingRight: '0',
                    },
                  },
                  SingleValue: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                    },
                  },
                  DropdownContainer: {
                    style: {
                      width: maxDropdownWidth,
                      maxWidth: 'calc(100vw - 10px)',
                    },
                  },
                  Dropdown: {
                    component: VirtualList,
                    props: {
                      maxDropdownHeight: maxDropdownHeight,
                    },
                  },
                }}
              />
            );
          },
        },
      }}
    />
  );
}
