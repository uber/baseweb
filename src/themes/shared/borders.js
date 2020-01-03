/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {BordersT} from '../types.js';

const borders: BordersT = {
  border100: {
    borderColor: 'hsla(0, 0%, 0%, 0.04)',
    borderStyle: 'solid',
    borderWidth: '1px',
  },
  border200: {
    borderColor: 'hsla(0, 0%, 0%, 0.08)',
    borderStyle: 'solid',
    borderWidth: '1px',
  },
  border300: {
    borderColor: 'hsla(0, 0%, 0%, 0.12)',
    borderStyle: 'solid',
    borderWidth: '1px',
  },
  border400: {
    borderColor: 'hsla(0, 0%, 0%, 0.16)',
    borderStyle: 'solid',
    borderWidth: '1px',
  },
  border500: {
    borderColor: 'hsla(0, 0%, 0%, 0.2)',
    borderStyle: 'solid',
    borderWidth: '1px',
  },
  border600: {
    borderColor: 'hsla(0, 0%, 0%, 0.24)',
    borderStyle: 'solid',
    borderWidth: '1px',
  },
  radius100: '2px',
  radius200: '4px',
  radius300: '8px',
  radius400: '12px',
  /** Datepicker (Range), Progress Bar, Slider, Tag */
  useRoundedCorners: true,
  /** Button, ButtonGroup */
  buttonBorderRadius: '0px',
  /** Input, Select, Textarea, Checkbox */
  inputBorderRadius: '0px',
  /** Popover, Menu, Tooltip */
  popoverBorderRadius: '0px',
  /** Card, Datepicker, Modal, Toast, Notification */
  surfaceBorderRadius: '0px',
};

export default borders;
