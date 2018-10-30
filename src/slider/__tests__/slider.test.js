/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import React from 'react';
import {mount} from 'enzyme';
import {Slider, StyledThumb} from '../index';

/* global document */
/* global window */

const originalDocumentAddListener = document.addEventListener;
const originalDocumentRemoveListener = document.removeEventListener;

describe('Stateless slider', function() {
  let wrapper;
  let allProps: {
      range: Array<number>,
      value: Array<number>,
      step: ?number,
      onChange: () => void,
    },
    mockFn;

  beforeAll(function() {
    //$FlowFixMe
    document.addEventListener = jest.fn();
    //$FlowFixMe
    document.removeEventListener = jest.fn();
  });

  beforeEach(function() {
    mockFn = jest.fn();
    allProps = {
      onChange: mockFn,
      range: [0, 100],
      value: [60],
      step: 0,
    };
  });

  afterEach(function() {
    jest.restoreAllMocks();
    document.addEventListener.mockClear();
    document.removeEventListener.mockClear();
    wrapper && wrapper.unmount();
  });

  afterAll(function() {
    //$FlowFixMe
    document.addEventListener = originalDocumentAddListener;
    //$FlowFixMe
    document.removeEventListener = originalDocumentRemoveListener;
  });

  it('should render slider component', function() {
    wrapper = mount(<Slider {...allProps} />);
    expect(wrapper).toMatchSnapshot('Component has correctly rendered');
  });

  describe('events', function() {
    let event, thumb, step, axisSizeInPixels;
    function emulateThumbDown(thumbIndex = 0) {
      wrapper = mount(<Slider {...allProps} />);
      event = {movementX: 0};
      thumb = wrapper.find(StyledThumb).at(thumbIndex);
      thumb.simulate('mousedown', event);
    }
    beforeEach(function() {
      step = 10;
      axisSizeInPixels = 300;
      jest
        .spyOn(window, 'getComputedStyle')
        .mockImplementation(() => ({width: axisSizeInPixels}));
      allProps.step = step;
    });

    it('should start tracking thumb move when user clicks on it', function() {
      emulateThumbDown();
      expect(wrapper.instance().state).toMatchObject({
        isThumbMoving: true,
        currentThumb: 0,
      });
    });

    it('should start handling mousemove event to track thumb progress', function() {
      emulateThumbDown();
      expect(document.addEventListener).toHaveBeenCalledWith(
        'mousemove',
        wrapper.instance().onMouseMove,
      );
    });

    it('should start handling mouseup event to track thumb finish progress', function() {
      emulateThumbDown();
      expect(document.addEventListener).toHaveBeenCalledWith(
        'mouseup',
        wrapper.instance().onThumbUp,
      );
    });

    describe('Thumb Move', function() {
      const fireMouseMove = event => {
        const mouseDownCall = document.addEventListener.mock.calls.find(
          args => args[0] === 'mousemove',
        )[1];
        mouseDownCall(event);
      };
      it('should move thumb to X pixels forward if mouse is moved', function() {
        emulateThumbDown();
        event.movementX = 50;
        fireMouseMove(event);
        expect(wrapper.instance().props.onChange).toHaveBeenCalledWith({
          event,
          value: [70],
        });
      });
      it('should reset current move progress when thumb moved to X pixels', function() {
        emulateThumbDown();
        event.movementX = 50;
        fireMouseMove(event);
        expect(wrapper.instance().state).toMatchObject({
          currentMove: 0,
        });
      });
      it('should not move thumb to X pixels but still record move progress if mouse moved less then step', function() {
        allProps.step = 50;
        emulateThumbDown();
        event.movementX = 20;
        fireMouseMove(event);
        expect(wrapper.instance().state).toMatchObject({
          currentMove: 20,
        });
      });
      //$FlowFixMe
      describe.each([[[40, 80], 'range'], [[50], 'not range']])(
        ' %% for %s component',
        (value, type) => {
          beforeEach(function() {
            allProps.value = value;
            delete allProps.step;
          });
          const isRange = value.length === 2;
          //$FlowFixMe
          describe.each([
            [isRange ? [80, 80] : [100], 0],
            [isRange ? [40, 100] : [100], isRange ? 1 : 0],
          ])('for clamp by maximum', (expectedValue, thumbIndex) => {
            it('should clamp if mouse move is more than maximum axis value', function() {
              emulateThumbDown(thumbIndex);
              event.movementX = 200;
              fireMouseMove(event);
              expect(wrapper.instance().props.onChange).toHaveBeenCalledWith({
                event,
                value: expectedValue,
              });
            });
          });
          //$FlowFixMe
          describe.each([
            [isRange ? [0, 80] : [0], 0],
            [isRange ? [40, 40] : [0], isRange ? 1 : 0],
          ])('for clamp by minimum', (expectedValue, thumbIndex) => {
            it('should clamp if mouse move is less than minimum axis value', function() {
              emulateThumbDown(thumbIndex);
              event.movementX = -200;
              fireMouseMove(event);
              expect(wrapper.instance().props.onChange).toHaveBeenCalledWith({
                event,
                value: expectedValue,
              });
            });
          });
          //$FlowFixMe
          describe.each([
            [isRange ? [80, 80] : [100], 0],
            [isRange ? [40, 100] : [100], isRange ? 1 : 0],
          ])('for clamp by next thumb value', (expectedValue, thumbIndex) => {
            it('should clamp if mouse move is more than next thumb value', function() {
              emulateThumbDown(thumbIndex);
              event.movementX = 200;
              fireMouseMove(event);
              expect(wrapper.instance().props.onChange).toHaveBeenCalledWith({
                event,
                value: expectedValue,
              });
            });
          });
          //$FlowFixMe
          describe.each([
            [isRange ? [0, 80] : [0], 0],
            [isRange ? [40, 40] : [0], isRange ? 1 : 0],
          ])(
            'for clamp by previous thumb value',
            (expectedValue, thumbIndex) => {
              it('should clamp if mouse move is less than previous axis value', function() {
                emulateThumbDown(thumbIndex);
                event.movementX = -200;
                fireMouseMove(event);
                expect(wrapper.instance().props.onChange).toHaveBeenCalledWith({
                  event,
                  value: expectedValue,
                });
              });
            },
          );
        },
      );
      describe('On Thumb up', function() {
        const fireThumbUp = event => {
          const thumbUpCall = document.addEventListener.mock.calls.find(
            args => args[0] === 'mouseup',
          )[1];
          thumbUpCall(event);
        };
        it('should stop handling mousemove event to track thumb progress', function() {
          emulateThumbDown();
          fireThumbUp();
          expect(document.removeEventListener).toHaveBeenCalledWith(
            'mousemove',
            wrapper.instance().onMouseMove,
          );
        });

        it('should stop handling mouseup event to track thumb finish progress', function() {
          emulateThumbDown();
          fireThumbUp();
          expect(document.removeEventListener).toHaveBeenCalledWith(
            'mouseup',
            wrapper.instance().onThumbUp,
          );
        });
      });
    });
  });
});
