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
  StyledCountrySelectContainer as Container,
  StyledCountrySelectListItem as ListItem,
  StyledCountrySelectFlagContainer as FlagContainer,
  StyledCountrySelectNameContainer as NameContainer,
  StyledCountrySelectIsoContainer as IsoContainer,
} from './styled-components.js';

import type {CountrySelectPropsT} from './types.js';

export default function CountrySelect(props: CountrySelectPropsT) {
  const {children, dropdownHeight = '400px', mapIsoToLabel = null} = props;
  return (
    <Container $height={dropdownHeight}>
      <AutoSizer>
        {({height, width}) => {
          return (
            <List
              role="listbox"
              height={height}
              width={width}
              rowCount={children.length}
              rowHeight={32}
              rowRenderer={({index, key, style}) => {
                // resetMenu and getItemLabel should not end up on native html elements
                const {resetMenu, getItemLabel, ...rest} = children[
                  index
                ].props;
                return (
                  <ListItem key={key} style={style} {...rest}>
                    <FlagContainer>
                      <Flag
                        iso2={children[index].props.item.id}
                        size={SIZE.compact}
                      />
                    </FlagContainer>
                    <NameContainer>
                      {mapIsoToLabel
                        ? mapIsoToLabel(props.children[index].props.item.id)
                        : children[index].props.item.label}
                    </NameContainer>
                    <IsoContainer>
                      +{children[index].props.item.dialCode}
                    </IsoContainer>
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
