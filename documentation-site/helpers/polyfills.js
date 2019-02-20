/* eslint no-extend-native: 0 */
// core-js comes with Next.js. So, you can import it like below
import includes from 'core-js/library/fn/string/virtual/includes';
import repeat from 'core-js/library/fn/string/virtual/repeat';
import assign from 'core-js/library/fn/object/assign';

String.prototype.includes = includes;
String.prototype.repeat = repeat;
Object.assign = assign;
