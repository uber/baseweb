/*
Copyright (c) 2018-2020 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/
// @flow

export function starSVG(fillColor: string, strokeColor: string) {
  return encodeURIComponent(`
    <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 1.54816L13.1268 7.78053L13.2423 8.11905H13.6H20.4143L14.9132 11.9714L14.6055 12.1869L14.7268 12.5424L16.8321 18.7118L11.2868 14.8285L11 14.6277L10.7132 14.8285L5.16792 18.7118L7.27321 12.5424L7.39454 12.1869L7.08681 11.9714L1.58566 8.11905H8.4H8.75769L8.87321 7.78053L11 1.54816Z"
        fill="${fillColor}"
        stroke="${strokeColor}"
      />
    </svg>
  `);
}

export function angryRatingSVG(fillColor: string) {
  return encodeURIComponent(`
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="20" fill="${fillColor}"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8377 29C24.8073 29 26.6585 30.7697 27.1609 31.5442C27.4615 32.0075 28.0807 32.1395 28.5441 31.839C29.0074 31.5384 29.1394 30.9192 28.8388 30.4558C28.0439 29.2303 25.614 27 21.8377 27C18.0453 27 15.8091 29.25 15.1202 30.5245C14.8576 31.0103 15.0385 31.6171 15.5244 31.8797C16.0102 32.1423 16.617 31.9614 16.8796 31.4755C17.2718 30.75 18.8842 29 21.8377 29Z" fill="black"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.684 16.949C11.1601 16.7743 10.8769 16.208 11.0516 15.684C11.2262 15.1601 11.7926 14.8769 12.3165 15.0516L18.3165 17.0516C18.8404 17.2262 19.1236 17.7926 18.949 18.3165C18.8093 18.7355 18.4192 19.0005 18.0005 19.0005C18.0004 20.105 17.105 21.0002 16.0005 21.0002C14.896 21.0002 14.0005 20.1048 14.0005 19.0002C14.0005 18.5694 14.1368 18.1703 14.3686 17.8438L11.684 16.949ZM32.949 15.684C33.1237 16.208 32.8405 16.7743 32.3166 16.949L29.6324 17.8437C29.8642 18.1702 30.0005 18.5693 30.0005 19.0002C30.0005 20.1048 29.1051 21.0002 28.0005 21.0002C26.8961 21.0002 26.0007 20.105 26.0005 19.0005C25.5817 19.0007 25.1914 18.7356 25.0516 18.3165C24.877 17.7926 25.1602 17.2262 25.6841 17.0516L31.6841 15.0516C32.208 14.8769 32.7744 15.1601 32.949 15.684Z" fill="black"/>
    </svg>
  `);
}

export function sadRatingSVG(fillColor: string) {
  return encodeURIComponent(`
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="20" fill="${fillColor}"/>
      <ellipse cx="16" cy="18" rx="2" ry="2" fill="black"/>
      <ellipse cx="28" cy="18" rx="2" ry="2" fill="black"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8377 28C24.8073 28 26.6585 29.7697 27.1609 30.5442C27.4615 31.0075 28.0807 31.1395 28.5441 30.839C29.0074 30.5384 29.1394 29.9192 28.8388 29.4558C28.0439 28.2303 25.614 26 21.8377 26C18.0453 26 15.8091 28.25 15.1202 29.5245C14.8576 30.0103 15.0385 30.6171 15.5244 30.8797C16.0102 31.1423 16.617 30.9614 16.8796 30.4755C17.2718 29.75 18.8842 28 21.8377 28Z" fill="black"/>
    </svg>
  `);
}

export function neutralRatingSVG(fillColor: string) {
  return encodeURIComponent(`
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="20" fill="${fillColor}"/>
      <ellipse cx="16" cy="19" rx="2" ry="2" fill="black"/>
      <ellipse cx="28" cy="19" rx="2" ry="2" fill="black"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15 28C15 27.4477 15.4477 27 16 27L16 28L16 29C15.4477 29 15 28.5523 15 28ZM28 28L28 29H16L16 28L16 27H27.9995L28 28ZM28 28L28 29C28.5523 29 29 28.5523 29 28C29 27.4477 28.5518 27 27.9995 27L28 28Z" fill="black"/>
    </svg>
  `);
}

export function happyRatingSVG(fillColor: string) {
  return encodeURIComponent(`
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="20" fill="${fillColor}"/>
      <ellipse cx="16" cy="18" rx="2" ry="2" fill="black"/>
      <ellipse cx="28" cy="18" rx="2" ry="2" fill="black"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.8377 29C24.8073 29 26.6585 27.2303 27.1609 26.4558C27.4615 25.9925 28.0807 25.8605 28.5441 26.161C29.0074 26.4616 29.1394 27.0808 28.8388 27.5442C28.0439 28.7697 25.614 31 21.8377 31C18.0453 31 15.8091 28.75 15.1202 27.4755C14.8576 26.9897 15.0385 26.3829 15.5244 26.1203C16.0102 25.8577 16.617 26.0386 16.8796 26.5245C17.2718 27.25 18.8842 29 21.8377 29Z" fill="black"/>
    </svg>
  `);
}

export function veryHappyRatingSVG(fillColor: string) {
  return encodeURIComponent(`
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="20" fill="${fillColor}"/>
      <ellipse cx="16" cy="18" rx="2" ry="2" fill="black"/>
      <ellipse cx="28" cy="18" rx="2" ry="2" fill="black"/>
      <path d="M21.8378 31C26.7027 31 28 27.8 28 27H16C16 27.8 16.973 31 21.8378 31Z" fill="black"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M26.5528 28H17.3513C17.4656 28.1996 17.6126 28.3984 17.8211 28.6128C18.4608 29.2891 19.6453 30 21.8378 30C24.0315 30 25.3168 29.2869 26.0488 28.5805C26.2631 28.3781 26.4239 28.1881 26.5528 28ZM27.4377 30.0195C26.3048 31.1131 24.5091 32 21.8378 32C19.1655 32 17.4311 31.1109 16.3681 29.9872C15.3474 28.9082 15 27.6646 15 27C15 26.4477 15.4477 26 16 26H28C28.5523 26 29 26.4477 29 27C29 27.404 28.8568 27.9069 28.6231 28.3946C28.3936 28.868 27.9783 29.4894 27.4377 30.0195Z" fill="black"/>
    </svg>
  `);
}
