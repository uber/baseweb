/*
Copyright (c) Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
import type { Theme } from '../styles';
import { ARIA_LIVE_TIMEOUT_MS, type ARIA_LIVE_ELEMENT_ID } from './constants';

export const destructureStyleOverride = (styleOverride: any, theme: Theme) => {
  if (typeof styleOverride === 'function') {
    return styleOverride({ $theme: theme });
  } else {
    return styleOverride;
  }
};

export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 bytes';
  const k = 1000;
  const sizes = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const handleAriaLiveUpdates = (
  elementId: ARIA_LIVE_ELEMENT_ID,
  updateMessage: string
): void => {
  const liveRegion = document.getElementById(elementId);
  if (liveRegion) {
    liveRegion.textContent = updateMessage;
  }
  setTimeout(() => {
    const liveRegion = document.getElementById(elementId);
    if (liveRegion) {
      liveRegion.textContent = null;
    }
  }, ARIA_LIVE_TIMEOUT_MS);
};
