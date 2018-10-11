// @flow

const MAX_DEPTH_OF_CHECK = 10;
let depthOfCheck;
export default function deepMerge(target?: ?{}, ...sources: Array<null | ?{}>) {
  depthOfCheck = 0;
  return _deepMerge.apply(this, arguments);
}

function _deepMerge(target?: ?{}, ...sources: Array<null | ?{}>): {} {
  target = target || {};
  const len = sources.length;
  let obj;
  if (++depthOfCheck >= MAX_DEPTH_OF_CHECK) {
    obj = sources[len - 1] || {};
    // eslint-disable-next-line no-console
    console.error(`Object force-merged to target to avoid stack overflow`);
    return obj;
  }
  let value;
  for (let i = 0; i < len; i++) {
    obj = sources[i] || {};
    if (obj === target) {
      continue;
    }
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        value = obj[key];
        if (isCloneable(value)) {
          target[key] = _deepMerge.apply(this, [target[key] || {}, value]);
        } else {
          target[key] = value;
        }
      }
    }
  }
  return target;
}

/* eslint-disable-next-line flowtype/no-weak-types */
function isCloneable(obj: mixed) {
  return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]';
}
