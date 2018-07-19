// @flow
import document from 'global/document';

export default typeof document !== 'undefined' &&
  Boolean(document.createElement);
