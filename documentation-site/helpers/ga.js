/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */

export const GA_ID = 'UA-133544678-2';

export const trackPageView = url => {
  try {
    // eslint-disable-next-line
    window.gtag('config', GA_ID, {
      page_location: url,
    });
  } catch (error) {
    // silence possible errors
  }
};

export const trackEvent = (eventName, label) => {
  try {
    // eslint-disable-next-line
    window.gtag('event', eventName, {
      send_to: GA_ID,
      event_category: 'general',
      event_label: label,
    });
  } catch (error) {
    // silence possible errors
  }
};
