/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import type {InputPropsT, BaseInputPropsT, InternalStateT} from './types.js';

export function getSharedProps<T>(
  props: BaseInputPropsT<T> | InputPropsT,
  state: InternalStateT,
) {
  const {disabled, error, positive, adjoined, size, required} = props;
  const {isFocused} = state;
  return {
    $isFocused: isFocused,
    $disabled: disabled,
    $error: error,
    $positive: positive,
    $adjoined: adjoined,
    $size: size,
    $required: required,
  };
}

const tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
// Thanks to:
// http://fightingforalostcause.net/misc/2006/compare-email-regex.php
// http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
// http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
export function validateEmail(email: string): boolean {
  if (!email) {
    return false;
  }

  if (email.length > 254) {
    return false;
  }

  const valid = tester.test(email);
  if (!valid) {
    return false;
  }

  // Further checking of some things regex can't handle
  const parts = email.split('@');
  if (parts[0].length > 64) {
    return false;
  }

  const domainParts = parts[1].split('.');
  if (
    domainParts.some(function(part) {
      return part.length > 63;
    })
  ) {
    return false;
  }

  return true;
}
