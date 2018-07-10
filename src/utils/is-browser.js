// @flow
import {document} from 'global';

export default typeof document !== 'undefined' &&
  Boolean(document.createElement);
