/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import * as React from 'react';
import {mount} from 'enzyme';
import Block from '../block.js';

describe('Block', () => {
  it('applies expected style rules', () => {
    const wrapper = mount(
      <Block
        alignContent="start"
        alignItems="start"
        backgroundAttachment="scroll"
        backgroundClip="border-box"
        backgroundColor="red"
        backgroundImage="linear-gradient(pink, cornflowerblue)"
        backgroundOrigin="border-box"
        backgroundPosition="25% 75%"
        backgroundRepeat="repeat-x"
        backgroundSize="contain"
        color="red"
        display="inline-block"
        flexDirection="row"
        flex="grow"
        grid="100px / 200px"
        gridArea="auto"
        gridAutoColumns="min-content"
        gridAutoFlow="row dense"
        gridAutoRows="20cm"
        gridColumn="1 / 3"
        gridColumnEnd="span 3"
        gridColumnGap="scale800"
        gridColumnStart="span 2"
        gridGap="50px"
        gridRow="1"
        gridRowStart="-1"
        gridRowEnd="2"
        gridTemplate="1fr / 1fr"
        gridTemplateAreas="inherit"
        gridTemplateColumns="1fr 60px"
        gridTemplateRows="auto"
        justifyContent="start"
        justifyItems="center"
        justifySelf="start"
        position="static"
        width="100px"
        minWidth="100px"
        maxWidth="100px"
        height="100px"
        minHeight="100px"
        maxHeight="100px"
        margin="scale200"
        marginTop="scale200"
        marginRight="scale200"
        marginBottom="scale200"
        marginLeft="scale200"
        padding="scale200"
        paddingTop="scale200"
        paddingRight="scale200"
        paddingBottom="scale200"
        paddingLeft="scale200"
        placeContent="end center"
        placeItems="end center"
        placeSelf="center start"
        top="1px"
        right="1px"
        bottom="1px"
        left="1px"
      >
        test
      </Block>,
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders themed backgroundColor if provided', () => {
    const wrapper = mount(<Block backgroundColor="primary200">test</Block>);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders themed color if provided', () => {
    const wrapper = mount(<Block color="primary200">test</Block>);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Overflow', () => {
    it('renders overflowX styling if provided with scrollX value', () => {
      const wrapper = mount(<Block overflow="scrollX">test</Block>);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders overflowY styling if provided with scrollY value', () => {
      const wrapper = mount(<Block overflow="scrollY">test</Block>);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders overflow styling if provided any other value', () => {
      const wrapper = mount(<Block overflow="auto">test</Block>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('FlexWrap', () => {
    it('renders flexWrap styling as expected', () => {
      const wrapper = mount(<Block flexWrap>test</Block>);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('applies event handlers', () => {
    const onClickMock = jest.fn();
    const example = mount(<Block onClick={onClickMock}>test</Block>);
    example.simulate('click');

    expect(onClickMock).toHaveBeenCalled();
  });

  describe('Responsive', () => {
    it('applies expected styles if responsive array is provided', () => {
      const wrapper = mount(
        <Block marginLeft={['scale100', 'scale200', 'scale300', 'scale400']}>
          test
        </Block>,
      );
      expect(wrapper).toMatchSnapshot();
    });

    it('applies expected styles if responsive array has less than number of breakpoints', () => {
      const wrapper = mount(
        <Block marginLeft={['scale100', 'scale200']}>test</Block>,
      );
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('renders themed font if provided', () => {
    const wrapper = mount(<Block font="font200">test</Block>);
    expect(wrapper).toMatchSnapshot();
  });

  it('does not throw if provided unknown font prop', () => {
    const wrapper = mount(<Block font="not-a-real-font">test</Block>);
    expect(wrapper).toMatchSnapshot();
  });
});
