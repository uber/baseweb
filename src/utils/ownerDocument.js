/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
/* global document */

/**
 * Given a node, returns the ownerDocument if it exists, otherwise the
 * global document. (Maybe this should go in a root utils file?)
 */
export default function ownerDocument(node: ?HTMLElement): Document {
  if (node && node.ownerDocument) {
    return node.ownerDocument;
  }
  return document;
}
