/*
Copyright (c) 2018 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow
import {thumbWidth} from './constants';
export function startThumbIcon(backgroundColor: string, thumbColor: string) {
  return `<svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(%23filter0_d)"><path d="M4 7C4 4.79086 5.79086 3 8 3H15C15.5523 3 16 3.44772 16 4V26C16 26.5523 15.5523 27 15 27H8C5.79086 27 4 25.2091 4 23V7Z" fill="${encodeURIComponent(
    backgroundColor,
  )}"/></g><rect x="9" y="11" width="2" height="8" rx="1" fill="${encodeURIComponent(
    thumbColor,
  )}"/><defs><filter id="filter0_d" x="0" y="0" width="20" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1"/><feGaussianBlur stdDeviation="2"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
}

export function endThumbIcon(backgroundColor: string, thumbColor: string) {
  return `<svg width="20" height="32" viewBox="0 0 20 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(%23filter0_d)"><path d="M4 4C4 3.44772 4.44772 3 5 3H12C14.2091 3 16 4.79086 16 7V23C16 25.2091 14.2091 27 12 27H5C4.44772 27 4 26.5523 4 26V4Z" fill="${encodeURIComponent(
    backgroundColor,
  )}"/></g><rect x="9" y="11" width="2" height="8" rx="1" fill="${encodeURIComponent(
    thumbColor,
  )}"/><defs><filter id="filter0_d" x="0" y="0" width="20" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1"/><feGaussianBlur stdDeviation="2"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
}

export function singleThumbIcon(backgroundColor: string, thumbColor: string) {
  return `<svg width="32" height="32" viewBox="0 0 ${thumbWidth} 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g filter="url(%23filter0_d)"><rect x="4" y="3" width="24" height="24" rx="4" fill="${encodeURIComponent(
    backgroundColor,
  )}"/><rect width="2" height="8"  x="15" y="11" rx="1" fill="${encodeURIComponent(
    thumbColor,
  )}"/></g><defs><filter id="filter0_d" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="1"/><feGaussianBlur stdDeviation="2"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.32 0"/><feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
}
