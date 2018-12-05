/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {styled, asPrimaryExport} from '../styles';
import {ALIGN} from './index';

export const Root = styled('nav', props => {
  const {$theme} = props;
  const {
    sizing: {scale500},
    typography: {font400},
    colors: {border},
  } = $theme;
  return {
    ...font400,
    cursor: 'pointer',
    display: 'flex',
    paddingBottom: scale500,
    paddingTop: scale500,
    borderBottom: `1px solid ${border}`,
  };
});
Root.displayName = 'StyledRoot';

export const NavigationItem = styled('div', props => {
  const {$theme} = props;
  const {
    sizing: {scale800},
  } = $theme;
  return {
    alignSelf: 'center',
    paddingLeft: scale800,
  };
});
NavigationItem.displayName = 'StyledNavigationItem';

export const NavigationList: React.ComponentType<{
  align: string,
  children: React$Node,
}> = (asPrimaryExport(
  styled('div', props => {
    const {$align, $theme} = props;
    const {
      sizing: {scale800},
    } = $theme;
    return {
      display: 'flex',
      ':first-child': {
        padding: 0,
      },
      ':last-child': {
        padding: 0,
      },
      flex: $align === ALIGN.right || $align === ALIGN.left ? 'none' : '1',
      paddingLeft: scale800,
      paddingRight: scale800,
      justifySelf: $align,
      justifyContent: $align,
    };
  }),
  ['align'],
): React.ComponentType<*>);
NavigationList.displayName = 'StyledNavigationList';
