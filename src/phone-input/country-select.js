/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

import React from 'react';
import {List, AutoSizer} from 'react-virtualized';

import Flag from './flag.js';
import {SIZE} from './constants.js';
import {
  StyledCountrySelectContainer,
  StyledCountrySelectListItem,
  StyledCountrySelectFlagContainer,
  StyledCountrySelectNameContainer,
  StyledCountrySelectIsoContainer,
} from './styled-components.js';

export default function CountrySelect(props) {
  return (
    <StyledCountrySelectContainer
      $ref={props.$ref}
      $height={props.maxDropdownHeight}
    >
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
                  <StyledCountrySelectListItem
                    key={key}
                    style={style}
                    {...rest}
                  >
                    <StyledCountrySelectFlagContainer
                      paddingLeft="16px"
                      display="flex"
                      alignItems="center"
                    >
                      <Flag
                        iso2={props.children[index].props.item.iso2}
                        size={SIZE.compact}
                      />
                    </StyledCountrySelectFlagContainer>
                    <StyledCountrySelectNameContainer paddingLeft="16px">
                      {props.children[index].props.item.name}
                    </StyledCountrySelectNameContainer>
                    <StyledCountrySelectIsoContainer
                      marginLeft="auto"
                      paddingRight="16px"
                    >
                      +{props.children[index].props.item.dialCode}
                    </StyledCountrySelectIsoContainer>
                  </StyledCountrySelectListItem>
                );
              }}
            />
          );
        }}
      </AutoSizer>
    </StyledCountrySelectContainer>
  );
}
