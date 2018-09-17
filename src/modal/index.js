/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
export {default as Modal} from './modal';
export {default as ModalButton} from './modal-button';
export {SIZE, ROLE, CLOSE_SOURCE} from './constants';
export {
  Root as StyledRoot,
  Backdrop as StyledBackdrop,
  Dialog as StyledDialog,
  DialogContainer as StyledDialogContainer,
  Close as StyledClose,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './styled-components';
export * from './types';
