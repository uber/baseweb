/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
export { default as Modal } from './modal';
export { default as ModalButton } from './modal-button';
export { default as FocusOnce } from './focus-once';
export { SIZE, ROLE, CLOSE_SOURCE } from './constants';
export {
  Root as StyledRoot,
  Dialog as StyledDialog,
  DialogContainer as StyledDialogContainer,
  Close as StyledClose,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from './styled-components';
export * from './types';
export type { ModalLocale } from './locale';
