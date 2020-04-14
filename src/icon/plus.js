/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
// BASEUI-GENERATED-REACT-ICON
// DO NOT EDIT THIS FILE DIRECTLY, SEE README.md
import * as React from 'react';
import {useStyletron} from '../styles/index.js';
import {mergeOverride, toObjectOverride} from '../helpers/overrides.js';

import Icon from './icon.js';
import omitDollarPrefixedKeys from './omit-dollar-prefixed-keys.js';
import type {IconPropsT} from './types.js';

function Plus(props: IconPropsT, ref) {
  const [, theme] = useStyletron();
  const {overrides = {}, ...restProps} = props;
  const SvgOverride = mergeOverride(
    // Icons from theme really targets the SVG override in the underlying Icon component, but
    // have props typed with IconPropsT. Provided the missing props inline below here.
    {
      component: theme.icons && theme.icons.Plus ? theme.icons.Plus : null,
      props: {
        title: 'Plus',
        viewBox: '0 0 24 24',
        ...omitDollarPrefixedKeys(restProps),
      },
    },
    overrides && overrides.Svg ? toObjectOverride(overrides.Svg) : {},
  );
  return (
    <Icon
      title="Plus"
      viewBox="0 0 24 24"
      ref={ref}
      overrides={{Svg: SvgOverride}}
      {...restProps}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5C12.5523 5 13 5.44772 13 6V11L18 11C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13L13 13V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18V13L6 13C5.44772 13 5 12.5523 5 12C5 11.4477 5.44771 11 6 11L11 11V6C11 5.44772 11.4477 5 12 5Z"
      />
    </Icon>
  );
}

export default React.forwardRef<IconPropsT, mixed>(Plus);
