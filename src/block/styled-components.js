/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

// @flow

import {getMediaQueries} from '../helpers/responsive-helpers.js';
import {styled} from '../styles/index.js';
import type {BreakpointsT} from '../styles/types.js';
import type {StyledBlockPropsT} from './types.js';

// styletron will throw when value is undefined. if so, replace with null
function constrainToNull(value) {
  if (value === undefined) {
    return null;
  }
  return value;
}

type ApplyParams = {
  property: string,
  value?: * | Array<*>,
  // eslint-disable-next-line flowtype/no-weak-types
  transform?: Function,
};

function build(breakpoints: BreakpointsT) {
  const styles = {};
  const mediaQueries = getMediaQueries(breakpoints);

  return {
    apply: ({property, transform = x => x, value}: ApplyParams) => {
      if (value === null || value === undefined) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((v, index) => {
          // Do not create a media query for the smallest breakpoint.
          if (index === 0) {
            styles[property] = constrainToNull(transform(v));
            return;
          }

          const mediaQuery = mediaQueries[index - 1];
          if (!styles[mediaQuery]) {
            styles[mediaQuery] = {};
          }

          styles[mediaQuery][property] = constrainToNull(transform(v));
        });
      } else {
        styles[property] = constrainToNull(transform(value));
      }
    },
    value: () => styles,
  };
}

function getFontValue(obj, key) {
  if (!obj) return;
  return obj[key];
}

export const StyledBlock = styled<StyledBlockPropsT>('div', props => {
  const {breakpoints, colors, typography, sizing} = props.$theme;

  const get = (obj, key) => obj[key];
  const getScale = size => sizing[size] || size;

  const styles = build(breakpoints);
  styles.apply({
    property: 'color',
    value: get(props, '$color'),
    transform: color => colors[color] || color,
  });
  styles.apply({
    property: 'backgroundAttachment',
    value: get(props, '$backgroundAttachment'),
  });
  styles.apply({
    property: 'backgroundClip',
    value: get(props, '$backgroundClip'),
  });
  styles.apply({
    property: 'backgroundColor',
    value: get(props, '$backgroundColor'),
    transform: backgroundColor => colors[backgroundColor] || backgroundColor,
  });
  styles.apply({
    property: 'backgroundImage',
    value: get(props, '$backgroundImage'),
  });
  styles.apply({
    property: 'backgroundOrigin',
    value: get(props, '$backgroundOrigin'),
  });
  styles.apply({
    property: 'backgroundPosition',
    value: get(props, '$backgroundPosition'),
  });
  styles.apply({
    property: 'backgroundRepeat',
    value: get(props, '$backgroundRepeat'),
  });
  styles.apply({
    property: 'backgroundSize',
    value: get(props, '$backgroundSize'),
  });
  styles.apply({
    property: 'fontFamily',
    value: get(props, '$font'),
    transform: font => getFontValue(typography[font], 'fontFamily'),
  });
  styles.apply({
    property: 'fontWeight',
    value: get(props, '$font'),
    transform: font => getFontValue(typography[font], 'fontWeight'),
  });
  styles.apply({
    property: 'fontSize',
    value: get(props, '$font'),
    transform: font => getFontValue(typography[font], 'fontSize'),
  });
  styles.apply({
    property: 'lineHeight',
    value: get(props, '$font'),
    transform: font => getFontValue(typography[font], 'lineHeight'),
  });

  styles.apply({
    property: 'alignContent',
    value: get(props, '$alignContent'),
  });
  styles.apply({property: 'alignItems', value: get(props, '$alignItems')});
  styles.apply({property: 'alignSelf', value: get(props, '$alignSelf')});
  styles.apply({property: 'display', value: get(props, '$display')});
  styles.apply({property: 'flex', value: get(props, '$flex')});
  styles.apply({
    property: 'flexDirection',
    value: get(props, '$flexDirection'),
  });
  styles.apply({property: 'grid', value: get(props, '$grid')});
  styles.apply({property: 'gridArea', value: get(props, '$gridArea')});
  styles.apply({
    property: 'gridAutoColumns',
    value: get(props, '$gridAutoColumns'),
  });
  styles.apply({
    property: 'gridAutoFlow',
    value: get(props, '$gridAutoFlow'),
  });
  styles.apply({
    property: 'gridAutoRows',
    value: get(props, '$gridAutoRows'),
  });
  styles.apply({property: 'gridColumn', value: get(props, '$gridColumn')});
  styles.apply({
    property: 'gridColumnEnd',
    value: get(props, '$gridColumnEnd'),
  });
  styles.apply({
    property: 'gridColumnGap',
    value: get(props, '$gridColumnGap'),
    transform: getScale,
  });
  styles.apply({
    property: 'gridColumnStart',
    value: get(props, '$gridColumnStart'),
  });
  styles.apply({
    property: 'gridGap',
    value: get(props, '$gridGap'),
    transform: getScale,
  });
  styles.apply({property: 'gridRow', value: get(props, '$gridRow')});
  styles.apply({property: 'gridRowEnd', value: get(props, '$gridRowEnd')});
  styles.apply({
    property: 'gridRowGap',
    value: get(props, '$gridRowGap'),
    transform: getScale,
  });
  styles.apply({property: 'gridRowStart', value: get(props, '$gridRowStart')});
  styles.apply({property: 'gridTemplate', value: get(props, '$gridTemplate')});
  styles.apply({
    property: 'gridTemplateAreas',
    value: get(props, '$gridTemplateAreas'),
  });
  styles.apply({
    property: 'gridTemplateColumns',
    value: get(props, '$gridTemplateColumns'),
  });
  styles.apply({
    property: 'gridTemplateRows',
    value: get(props, '$gridTemplateRows'),
  });
  styles.apply({
    property: 'justifyContent',
    value: get(props, '$justifyContent'),
  });
  styles.apply({
    property: 'justifyItems',
    value: get(props, '$justifyItems'),
  });
  styles.apply({property: 'justifySelf', value: get(props, '$justifySelf')});
  styles.apply({property: 'position', value: get(props, '$position')});
  styles.apply({
    property: 'width',
    value: get(props, '$width'),
    transform: getScale,
  });
  styles.apply({
    property: 'minWidth',
    value: get(props, '$minWidth'),
    transform: getScale,
  });
  styles.apply({
    property: 'maxWidth',
    value: get(props, '$maxWidth'),
    transform: getScale,
  });
  styles.apply({
    property: 'height',
    value: get(props, '$height'),
    transform: getScale,
  });
  styles.apply({
    property: 'minHeight',
    value: get(props, '$minHeight'),
    transform: getScale,
  });
  styles.apply({
    property: 'maxHeight',
    value: get(props, '$maxHeight'),
    transform: getScale,
  });
  styles.apply({
    property: 'overflowX',
    value: get(props, '$overflow'),
    transform: overflow => {
      if (overflow === 'scrollX') {
        return 'scroll';
      }
      return null;
    },
  });
  styles.apply({
    property: 'overflowY',
    value: get(props, '$overflow'),
    transform: overflow => {
      if (overflow === 'scrollY') {
        return 'scroll';
      }
      return null;
    },
  });
  styles.apply({
    property: 'overflow',
    value: get(props, '$overflow'),
    transform: overflow => {
      if (overflow !== 'scrollX' && overflow !== 'scrollY') {
        return overflow;
      }
      return null;
    },
  });

  styles.apply({
    property: 'margin',
    value: get(props, '$margin'),
    transform: getScale,
  });
  styles.apply({
    property: 'marginTop',
    value: get(props, '$marginTop'),
    transform: getScale,
  });
  styles.apply({
    property: 'marginRight',
    value: get(props, '$marginRight'),
    transform: getScale,
  });
  styles.apply({
    property: 'marginBottom',
    value: get(props, '$marginBottom'),
    transform: getScale,
  });
  styles.apply({
    property: 'marginLeft',
    value: get(props, '$marginLeft'),
    transform: getScale,
  });

  styles.apply({
    property: 'padding',
    value: get(props, '$padding'),
    transform: getScale,
  });
  styles.apply({
    property: 'paddingTop',
    value: get(props, '$paddingTop'),
    transform: getScale,
  });
  styles.apply({
    property: 'paddingRight',
    value: get(props, '$paddingRight'),
    transform: getScale,
  });
  styles.apply({
    property: 'paddingBottom',
    value: get(props, '$paddingBottom'),
    transform: getScale,
  });
  styles.apply({
    property: 'paddingLeft',
    value: get(props, '$paddingLeft'),
    transform: getScale,
  });

  styles.apply({
    property: 'placeContent',
    value: get(props, '$placeContent'),
  });
  styles.apply({property: 'placeItems', value: get(props, '$placeItems')});
  styles.apply({property: 'placeSelf', value: get(props, '$placeSelf')});
  styles.apply({
    property: 'flexWrap',
    value: get(props, '$flexWrap'),
    transform: () => 'wrap',
  });

  styles.apply({property: 'top', value: get(props, '$top')});
  styles.apply({property: 'right', value: get(props, '$right')});
  styles.apply({property: 'left', value: get(props, '$left')});
  styles.apply({property: 'bottom', value: get(props, '$bottom')});

  styles.apply({property: 'textOverflow', value: get(props, '$textOverflow')});
  styles.apply({property: 'whiteSpace', value: get(props, '$whiteSpace')});

  return styles.value();
});
