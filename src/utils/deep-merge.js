// @flow

export default function deepMerge(
  target?: ?{},
  ...sources: Array<null | ?{}>
): {} {
  target = target || {};
  const len = sources.length;
  let obj;
  let value;
  for (let i = 0; i < len; i++) {
    obj = sources[i] || {};
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        value = obj[key];
        if (isCloneable(value)) {
          target[key] = deepMerge(target[key] || {}, value);
        } else {
          target[key] = value;
        }
      }
    }
  }
  return target;
}

function isCloneable(obj: mixed) {
  return Array.isArray(obj) || {}.toString.call(obj) == '[object Object]';
}
